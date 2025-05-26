import React, { useReducer, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import useMouse from 'react-use/lib/useMouse';

import {
  ADD_APP,
  DEL_APP,
  FOCUS_APP,
  MINIMIZE_APP,
  TOGGLE_MAXIMIZE_APP,
  FOCUS_ICON,
  SELECT_ICONS,
  FOCUS_DESKTOP,
  START_SELECT,
  END_SELECT,
  POWER_OFF,
  CANCEL_POWER_OFF,
  FORCE_DEL_APP,
} from './constants/actions';
import { FOCUSING, POWER_STATE } from './constants';
import { defaultIconState, defaultAppState, appSettings } from './apps';
import { useWindowManager } from 'hooks';
import Modal from './Modal';
import WindowLimitModal from './WindowLimitModal';
import Footer from './Footer';
import Windows from './Windows';
import Icons from './Icons';
import { DashedBox } from 'components';

const initState = {
  apps: defaultAppState,
  nextAppID: defaultAppState.length,
  nextZIndex: defaultAppState.length,
  focusing: FOCUSING.WINDOW,
  icons: defaultIconState,
  selecting: false,
  powerState: POWER_STATE.START,
};
const reducer = (state, action = { type: '' }) => {
  switch (action.type) {
    case ADD_APP:
      const app = state.apps.find(
        _app => _app.component === action.payload.component,
      );
      if (action.payload.multiInstance || !app) {
        return {
          ...state,
          apps: [
            ...state.apps,
            {
              ...action.payload,
              id: state.nextAppID,
              zIndex: state.nextZIndex,
            },
          ],
          nextAppID: state.nextAppID + 1,
          nextZIndex: state.nextZIndex + 1,
          focusing: FOCUSING.WINDOW,
        };
      }
      const apps = state.apps.map(app =>
        app.component === action.payload.component
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app,
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    case DEL_APP:
      if (state.focusing !== FOCUSING.WINDOW) return state;
      return {
        ...state,
        apps: state.apps.filter(app => app.id !== action.payload),
        focusing:
          state.apps.length > 1
            ? FOCUSING.WINDOW
            : state.icons.find(icon => icon.isFocus)
            ? FOCUSING.ICON
            : FOCUSING.DESKTOP,
      };
    case FORCE_DEL_APP:
      // Force delete without checking focus state - used for auto-closing
      return {
        ...state,
        apps: state.apps.filter(app => app.id !== action.payload),
        focusing:
          state.apps.length > 1
            ? FOCUSING.WINDOW
            : state.icons.find(icon => icon.isFocus)
            ? FOCUSING.ICON
            : FOCUSING.DESKTOP,
      };
    case FOCUS_APP: {
      const apps = state.apps.map(app =>
        app.id === action.payload
          ? { ...app, zIndex: state.nextZIndex, minimized: false }
          : app,
      );
      return {
        ...state,
        apps,
        nextZIndex: state.nextZIndex + 1,
        focusing: FOCUSING.WINDOW,
      };
    }
    case MINIMIZE_APP: {
      if (state.focusing !== FOCUSING.WINDOW) return state;
      const apps = state.apps.map(app =>
        app.id === action.payload ? { ...app, minimized: true } : app,
      );
      return {
        ...state,
        apps,
        focusing: FOCUSING.WINDOW,
      };
    }
    case TOGGLE_MAXIMIZE_APP: {
      if (state.focusing !== FOCUSING.WINDOW) return state;
      const apps = state.apps.map(app =>
        app.id === action.payload ? { ...app, maximized: !app.maximized } : app,
      );
      return {
        ...state,
        apps,
        focusing: FOCUSING.WINDOW,
      };
    }
    case FOCUS_ICON: {
      const icons = state.icons.map(icon => ({
        ...icon,
        isFocus: icon.id === action.payload,
      }));
      return {
        ...state,
        focusing: FOCUSING.ICON,
        icons,
      };
    }
    case SELECT_ICONS: {
      const icons = state.icons.map(icon => ({
        ...icon,
        isFocus: action.payload.includes(icon.id),
      }));
      return {
        ...state,
        icons,
        focusing: FOCUSING.ICON,
      };
    }
    case FOCUS_DESKTOP:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map(icon => ({
          ...icon,
          isFocus: false,
        })),
      };
    case START_SELECT:
      return {
        ...state,
        focusing: FOCUSING.DESKTOP,
        icons: state.icons.map(icon => ({
          ...icon,
          isFocus: false,
        })),
        selecting: action.payload,
      };
    case END_SELECT:
      return {
        ...state,
        selecting: null,
      };
    case POWER_OFF:
      return {
        ...state,
        powerState: action.payload,
      };
    case CANCEL_POWER_OFF:
      return {
        ...state,
        powerState: POWER_STATE.START,
      };
    default:
      return state;
  }
};
function WinXP() {
  const [state, dispatch] = useReducer(reducer, initState);
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const {
    checkWindowLimit,
    incrementWindowCount,
    decrementWindowCount,
    showLimitModal,
    limitedAppName,
    closeLimitModal,
  } = useWindowManager();

  const focusedAppId = getFocusedAppId();
  const onFocusApp = useCallback(id => {
    dispatch({ type: FOCUS_APP, payload: id });
  }, []);
  const onMaximizeWindow = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: TOGGLE_MAXIMIZE_APP, payload: id });
      }
    },
    [focusedAppId],
  );
  const onMinimizeWindow = useCallback(
    id => {
      if (focusedAppId === id) {
        dispatch({ type: MINIMIZE_APP, payload: id });
      }
    },
    [focusedAppId],
  );
  const onCloseApp = useCallback(
    id => {
      if (focusedAppId === id) {
        // Find the app being closed to decrement its count
        const closingApp = state.apps.find(app => app.id === id);
        if (closingApp && closingApp.header && closingApp.header.title) {
          decrementWindowCount(closingApp.header.title);
        }
        dispatch({ type: DEL_APP, payload: id });
      }
    },
    [focusedAppId, state.apps, decrementWindowCount],
  );

  // Enhanced app opening function with window limit checking
  const openAppWithLimit = useCallback(
    (appSetting, appName) => {
      const displayName = appName || appSetting.header?.title || 'Unknown App';

      // Check if we can open this app (limit check)
      if (!checkWindowLimit(displayName)) {
        return false; // Window limit reached, don't open
      }

      // Increment the count for this app
      incrementWindowCount(displayName);

      // Dispatch the app opening action
      dispatch({ type: ADD_APP, payload: appSetting });
      return true;
    },
    [checkWindowLimit, incrementWindowCount],
  );

  function onMouseDownFooterApp(id) {
    if (focusedAppId === id) {
      dispatch({ type: MINIMIZE_APP, payload: id });
    } else {
      dispatch({ type: FOCUS_APP, payload: id });
    }
  }

  function onOpenAppFromPortfolio(appName) {
    const appSetting = appSettings[appName];
    if (appSetting) {
      openAppWithLimit(appSetting, appName);
    } else {
      // Show error for unknown apps
      dispatch({
        type: ADD_APP,
        payload: {
          ...appSettings.Error,
          injectProps: { message: `Application "${appName}" not found` },
        },
      });
    }
  }

  function onMouseDownIcon(id) {
    dispatch({ type: FOCUS_ICON, payload: id });
  }

  function onDoubleClickIcon(component) {
    const appSetting = Object.values(appSettings).find(
      setting => setting.component === component,
    );
    if (appSetting) {
      openAppWithLimit(appSetting);
    }
  }

  function getFocusedAppId() {
    if (state.focusing !== FOCUSING.WINDOW) return -1;
    const focusedApp = [...state.apps]
      .sort((a, b) => b.zIndex - a.zIndex)
      .find(app => !app.minimized);
    return focusedApp ? focusedApp.id : -1;
  }

  function onMouseDownFooter() {
    dispatch({ type: FOCUS_DESKTOP });
  }

  function onClickMenuItem(o) {
    if (o === 'Internet Explorer' || o === 'Internet')
      openAppWithLimit(appSettings['Internet Explorer'], 'Internet Explorer');
    else if (o === 'Minesweeper')
      openAppWithLimit(appSettings.Minesweeper, 'Minesweeper');
    else if (o === 'My Computer')
      openAppWithLimit(appSettings['My Computer'], 'My Computer');
    else if (o === 'Notepad') openAppWithLimit(appSettings.Notepad, 'Notepad');
    else if (o === 'Winamp') openAppWithLimit(appSettings.Winamp, 'Winamp');
    else if (o === 'Paint') openAppWithLimit(appSettings.Paint, 'Paint');
    else if (o === 'Log Off')
      dispatch({ type: POWER_OFF, payload: POWER_STATE.LOG_OFF });
    else if (o === 'Turn Off Computer')
      dispatch({ type: POWER_OFF, payload: POWER_STATE.TURN_OFF });
    else
      dispatch({
        type: ADD_APP,
        payload: {
          ...appSettings.Error,
          injectProps: { message: 'C:\\\nApplication not found' },
        },
      });
  }
  function onMouseDownDesktop(e) {
    if (e.target === e.currentTarget)
      dispatch({
        type: START_SELECT,
        payload: { x: mouse.docX, y: mouse.docY },
      });
  }
  function onMouseUpDesktop(e) {
    dispatch({ type: END_SELECT });
  }
  const onIconsSelected = useCallback(
    iconIds => {
      dispatch({ type: SELECT_ICONS, payload: iconIds });
    },
    [dispatch],
  );
  function onClickModalButton(text) {
    dispatch({ type: CANCEL_POWER_OFF });
    dispatch({
      type: ADD_APP,
      payload: appSettings.Error,
    });
  }
  function onModalClose() {
    dispatch({ type: CANCEL_POWER_OFF });
  }

  // Enhanced modal close handler with auto-closing functionality
  const handleLimitModalClose = useCallback(() => {
    const appToAutoClose = closeLimitModal();

    if (appToAutoClose) {
      // Find all windows of this app type and close the 4 oldest ones
      const appsToClose = state.apps
        .filter(app => app.header?.title === appToAutoClose)
        .sort((a, b) => a.id - b.id) // Sort by ID (older IDs first)
        .slice(0, 4); // Take the first 4 (oldest)

      // Close each app and decrement counts using FORCE_DEL_APP to bypass focus checks
      appsToClose.forEach(app => {
        decrementWindowCount(app.header.title);
        dispatch({ type: FORCE_DEL_APP, payload: app.id });
      });
    }
  }, [closeLimitModal, state.apps, decrementWindowCount]);

  return (
    <Container
      ref={ref}
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
      state={state.powerState}
    >
      <Icons
        icons={state.icons}
        onMouseDown={onMouseDownIcon}
        onDoubleClick={onDoubleClickIcon}
        displayFocus={state.focusing === FOCUSING.ICON}
        appSettings={appSettings}
        mouse={mouse}
        selecting={state.selecting}
        setSelectedIcons={onIconsSelected}
      />
      <DashedBox startPos={state.selecting} mouse={mouse} />
      <Windows
        apps={state.apps}
        onMouseDown={onFocusApp}
        onClose={onCloseApp}
        onMinimize={onMinimizeWindow}
        onMaximize={onMaximizeWindow}
        focusedAppId={focusedAppId}
        onOpenApp={onOpenAppFromPortfolio} // ADD THIS PROP
      />
      <Footer
        apps={state.apps}
        onMouseDownApp={onMouseDownFooterApp}
        focusedAppId={focusedAppId}
        onMouseDown={onMouseDownFooter}
        onClickMenuItem={onClickMenuItem}
      />
      {state.powerState !== POWER_STATE.START && (
        <Modal
          onClose={onModalClose}
          onClickButton={onClickModalButton}
          mode={state.powerState}
        />
      )}
      {showLimitModal && (
        <WindowLimitModal
          onClose={handleLimitModalClose}
          appName={limitedAppName}
        />
      )}
    </Container>
  );
}

const powerOffAnimation = keyframes`
  0% {
    filter: brightness(1) grayscale(0);
  }
  30% {
    filter: brightness(1) grayscale(0);
  }
  100% {
    filter: brightness(0.6) grayscale(1);
  }
`;
const animation = {
  [POWER_STATE.START]: '',
  [POWER_STATE.TURN_OFF]: powerOffAnimation,
  [POWER_STATE.LOG_OFF]: powerOffAnimation,
};

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Tahoma:wght@400;700&display=swap');
  font-family: 'Tahoma', Arial, sans-serif;
  /* Force pixelated rendering for authentic XP look */
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: unset;
  font-smooth: never;
  text-rendering: optimizeSpeed;

  height: 100%;
  font-size: 14px;
  overflow: hidden;
  position: relative;
  background: url(https://i.imgur.com/Zk6TR5k.jpg) no-repeat center center fixed;
  background-size: cover;
  animation: ${({ state }) => animation[state]} 5s forwards;
  *:not(input):not(textarea) {
    user-select: none;
    /* Ensure all child elements use pixelated rendering */
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: unset;
    font-smooth: never;
    text-rendering: optimizeSpeed;
  }
`;

export default WinXP;
