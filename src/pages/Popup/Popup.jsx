import React, { useEffect, useState } from 'react';
import Meetings from './Meetings';
import { copyInputValueToClipBoard } from "../../utils/helpers";
import './Popup.css';

const initialUser = { id: null, email: "" };

const Popup = () => {
  const [user, updateUser] = useState(initialUser);
  const [isLoading, updateLoadingState] = useState(false);

  const switchUser = () => {
    updateUser(initialUser);
    updateLoadingState(true);
    chrome.storage.sync.set({ user: JSON.stringify(initialUser) }, function () {
      console.log('Reset user details');
    });
    chrome.runtime.sendMessage({ message: 'switch_user' });
  };

  const createMeeting = () => {
    updateLoadingState(true);
    chrome.runtime.sendMessage({ message: 'trigger_event' });
  };

  useEffect(() => {
    chrome.storage.sync.get(['user'], (user) => {
      if (user) {
        updateUser(typeof user === "string" ? JSON.parse(user) : user)
      }
    });

    chrome.runtime.onMessage.addListener((val) => {
      switch (val.msg) {
        case "completed":
          updateUser(val.user)
          updateLoadingState(false)
          break;
        case "copy_meeting_id":
          copyInputValueToClipBoard("meeting-id");
          break;
        case "change_user":
          updateLoadingState(false);
          break;
        case "btn_clicked":
          updateLoadingState(true);
          break;
        default:
      }
    });
  }, [])

  return (
    <div className="popup-container">
      <header className="popup-header">
        <div className="row">
          <h1 role="button">Gmeet helper</h1>
          <div>
            <button onClick={switchUser} type="button" className="button button-primary-link">
              <strong>Switch User</strong>
            </button>
          </div>
        </div>
      </header>
      <main className="popup-body">
        <Meetings
          isLoading={isLoading}
          user={user}
          copyInputValueToClipBoard={copyInputValueToClipBoard}
          createMeeting={createMeeting}
        />
        {user.email && (
          <div>
            <p className="footer"><b>Organized by:</b> {user.email}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Popup;
