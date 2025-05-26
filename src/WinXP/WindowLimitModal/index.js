import React from 'react';
import styled from 'styled-components';
import errorIcon from 'assets/windowsIcons/897(16x16).png';

const WindowLimitModal = ({ onClose, appName }) => {
  const errorMessage = `YOU DON'T NEED 5 TABS OF ${appName.toUpperCase()}. STOP TRYING TO CRASH MY WEBSITE`;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWindow onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <img src={errorIcon} alt="Error" className="error-icon" />
          <span className="title">Application Error</span>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </ModalHeader>
        <ModalContent>
          <div className="error-content">
            <img src={errorIcon} alt="Error" className="large-error-icon" />
            <div className="error-text">
              <div className="error-message">{errorMessage}</div>
              <div className="error-details">
                Maximum window limit reached for {appName}.
                <br />
                <strong>I'll automatically close 4 old tabs for you.</strong>
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <button className="ok-button" onClick={onClose}>
            OK - Close Old Tabs
          </button>
        </ModalFooter>
      </ModalWindow>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  font-family: 'Tahoma', Arial, sans-serif;
`;

const ModalWindow = styled.div`
  background: #f0f0f0;
  border: 2px outset #f0f0f0;
  width: 400px;
  max-width: 90vw;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  background: linear-gradient(
    to bottom,
    #0831d9 0%,
    #0831d9 3%,
    #2b71e0 6%,
    #3883e5 10%,
    #4490e6 12%,
    #3883e5 15%,
    #2b71e0 18%,
    #2663da 20%,
    #235bd6 23%,
    #2258d5 38%,
    #245ddb 54%,
    #2562df 86%
  );
  color: white;
  padding: 3px 5px;
  display: flex;
  align-items: center;
  font-size: 11px;
  font-weight: bold;

  .error-icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  .title {
    flex: 1;
  }

  .close-button {
    background: #c0c0c0;
    border: 1px outset #c0c0c0;
    width: 16px;
    height: 14px;
    font-size: 10px;
    line-height: 1;
    cursor: pointer;

    &:hover {
      background: #d0d0d0;
    }

    &:active {
      border: 1px inset #c0c0c0;
    }
  }
`;

const ModalContent = styled.div`
  padding: 15px;

  .error-content {
    display: flex;
    align-items: flex-start;
    gap: 15px;
  }

  .large-error-icon {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  .error-text {
    flex: 1;
  }

  .error-message {
    font-size: 12px;
    font-weight: bold;
    color: #c00000;
    margin-bottom: 10px;
    line-height: 1.3;
  }

  .error-details {
    font-size: 11px;
    color: #000;
    line-height: 1.4;
  }
`;

const ModalFooter = styled.div`
  padding: 10px 15px;
  text-align: center;
  border-top: 1px solid #c0c0c0;

  .ok-button {
    background: #e0e0e0;
    border: 2px outset #e0e0e0;
    padding: 4px 20px;
    font-size: 11px;
    font-family: 'Tahoma', Arial, sans-serif;
    cursor: pointer;
    min-width: 75px;

    &:hover {
      background: #d0d0d0;
    }

    &:active {
      border: 2px inset #e0e0e0;
    }

    &:focus {
      outline: 1px dotted #000;
      outline-offset: -3px;
    }
  }
`;

export default WindowLimitModal;
