// console.log('This is the background page.');
// console.log('Put the background scripts here.');
import { GOOGLE_CALENDAR_URI, REVOKE_TOKEN_URI } from "../../constants/application";
import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import { getMeetingParams } from "../../utils/meetings";

// Listening to key events
chrome.commands.onCommand.addListener(function (command) {
    if (command === 'copy-link') {
        chrome.runtime.sendMessage({
            msg: 'copy_meeting_id',
        });
    } else if (command === 'create-meeting') {
        chrome.runtime.sendMessage({
            msg: 'btn_clicked',
        });
        launchMeeting();
    }
});

//create meeting
function launchMeeting() {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(getMeetingParams()),
        };

        fetch(GOOGLE_CALENDAR_URI, options)
            .then((response) => response.json()) // Transform the data into json
            .then(function (data) {
                const user = { id: data.hangoutLink, email: data.creator.email };
                const stringifiedUser = JSON.stringify(user);
                chrome.storage.sync.set({ user: stringifiedUser }, function () {
                    console.log('User data  updated to storage ' + stringifiedUser);
                });
                chrome.runtime.sendMessage({
                    msg: 'completed',
                    user
                });
            });
    });
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.message === 'trigger_event') {
        launchMeeting();
    } else if (request.message === 'switch_user') {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            if (!chrome.runtime.lastError) {
                const url = REVOKE_TOKEN_URI + token;
                fetch(url).then(() => {
                    chrome.identity.removeCachedAuthToken({ token: token }, function () {
                        chrome.identity.getAuthToken({ interactive: true }, function () {
                            chrome.runtime.sendMessage({
                                msg: 'change_user',
                            });
                        });
                    });
                });
            }
        });
    }
});
