chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { urlMatches: '.+\/[Ee]nvision\.[Ww]eb.*' }
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    if (details.reason == 'update') {
        chrome.storage.sync.set({ 'envisionHelperShowUpdateInfo': true });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message == "runContentScript") {
        chrome.tabs.executeScript({
            file: 'content.js'
        });
    }
});