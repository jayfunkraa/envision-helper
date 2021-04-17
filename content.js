if (document.getElementById('config-values-script')) {
    document.getElementById('config-values-script').parentNode.removeChild(document.getElementById('config-values-script'));
};

// inject script
if (!document.getElementById('config-values-script')) {
    let scr = document.createElement('script');
    scr.id = 'config-values-script';
    scr.src = chrome.runtime.getURL('inject.js');
    scr.type = 'text/javascript';
    scr.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(scr);
};

// listen for event from inject script
document.addEventListener('configValuesSent', function (e) {
    chrome.runtime.sendMessage({ message: 'popupInfo', details: e.detail });
});


