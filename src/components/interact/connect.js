export function sendDataToTabs(data) {
    chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (tab) {
            chrome.tabs.sendMessage(tab.id, data, () => {
                if (!window.chrome.runtime.lastError) {
                    // message processing code goes here
                } else {
                    // error handling code goes here
                }
            });
        });
    });
}