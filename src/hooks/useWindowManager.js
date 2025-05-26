import { useState, useCallback } from 'react';

const useWindowManager = () => {
  const [windowCounts, setWindowCounts] = useState({});
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitedAppName, setLimitedAppName] = useState('');
  const [pendingAutoClose, setPendingAutoClose] = useState(null);
  const MAX_INSTANCES = 5; // Universal limit for all apps

  const checkWindowLimit = useCallback(
    appName => {
      const currentCount = windowCounts[appName] || 0;

      if (currentCount >= MAX_INSTANCES) {
        // Show custom modal instead of alert
        setLimitedAppName(appName);
        setShowLimitModal(true);
        setPendingAutoClose(appName); // Set which app needs auto-closing
        return false; // Deny opening new window
      }

      return true; // Allow opening new window
    },
    [windowCounts],
  );

  const closeLimitModal = useCallback(() => {
    setShowLimitModal(false);
    setLimitedAppName('');
    // Return the pending auto-close info so the parent can handle it
    const autoCloseInfo = pendingAutoClose;
    setPendingAutoClose(null);
    return autoCloseInfo;
  }, [pendingAutoClose]);

  const incrementWindowCount = useCallback(appName => {
    setWindowCounts(prev => ({
      ...prev,
      [appName]: (prev[appName] || 0) + 1,
    }));
  }, []);

  const decrementWindowCount = useCallback(appName => {
    setWindowCounts(prev => ({
      ...prev,
      [appName]: Math.max(0, (prev[appName] || 1) - 1),
    }));
  }, []);

  const getWindowCount = useCallback(
    appName => {
      return windowCounts[appName] || 0;
    },
    [windowCounts],
  );

  const resetWindowCounts = useCallback(() => {
    setWindowCounts({});
  }, []);

  return {
    checkWindowLimit,
    incrementWindowCount,
    decrementWindowCount,
    getWindowCount,
    resetWindowCounts,
    windowCounts,
    showLimitModal,
    limitedAppName,
    closeLimitModal,
  };
};

export default useWindowManager;
