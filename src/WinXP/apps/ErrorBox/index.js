import React, { useEffect } from 'react';
import styled from 'styled-components';

import errorSoundSrc from 'assets/sounds/error.wav';
import error from 'assets/windowsIcons/897(32x32).png';

function lineBreak(str) {
  return str.split('\n').map((s, i) => (
    <p key={i} className="error__message">
      {s}
    </p>
  ));
}

function Error({ onClose, message = "Something's wrong!" }) {
  useEffect(() => {
    try {
      new Audio(errorSoundSrc).play();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <Div>
      <div className="error__top">
        <img src={error} alt="error" className="error__img" />
        <div className="error__messages">{lineBreak(message)}</div>
      </div>
      <div className="error__bottom">
        <div onClick={onClose} className="error__button">
          <span className="error__confirm">OK</span>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  font-size: 16px; /* Increased from 11px */
  padding: 20px; /* Increased from 12px */
  display: flex;
  flex-direction: column;
  .error__top {
    display: flex;
    flex: 1;
  }
  .error__img {
    width: 48px; /* Increased from 30px */
    height: 48px; /* Increased from 30px */
  }
  .error__messages {
    padding: 4px 30px 20px; /* Increased padding */
  }
  .error__message {
    line-height: 22px; /* Increased from 16px */
  }
  .error__bottom {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .error__button {
    width: 100px; /* Increased from 80px */
    height: 32px; /* Increased from 22px */
    display: flex;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    box-shadow: inset -1px -1px 1px black;
    font-size: 14px; /* Added explicit font size for button */
    &:hover:active {
      box-shadow: inset 1px 1px 1px black;
      & > * {
        transform: translate(1px, 1px);
      }
    }
  }
  .error__confirm {
    line-height: 14px; /* Increased from 11px */
  }
`;

export default Error;
