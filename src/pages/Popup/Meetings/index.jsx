import React from 'react';
import './index.css';

const Meetings = ({ isLoading, createMeeting, user, copyInputValueToClipBoard }) => {
    return (
        <div className="main">
            <div className="container">
                <div className="meetings">
                    <button
                        className="meeting-button"
                        onClick={createMeeting}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="loader"></div>
                        ) : (
                            <span>&#x2b; &nbsp;New meeting</span>
                        )}
                    </button>
                </div>
                <div className="shortcut">
                    <p className="clipboard-para">
                        Click above or press Alt+N to create a new meeting
                    </p>
                </div>
            </div>
            {user.id && (
                <div className="clipboard">
                    <div>
                        <input
                            className="clipboard-input"
                            id="meeting-id"
                            onClick={() => copyInputValueToClipBoard("meeting-id")}
                            value={user.id}
                            readOnly="readOnly"
                        />
                        <p className="clipboard-para">
                            Click above to copy the Link or press Alt+C
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Meetings;