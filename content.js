var self = this;
if (document.getElementById('config-values-script')) {
    document.getElementById('config-values-script').parentNode.removeChild(document.getElementById('config-values-script'));
};

// inject script
if (!document.getElementById('config-values-script')) {
    self.scr = document.createElement('script');
    self.scr.id = 'config-values-script';
    self.scr.src = chrome.runtime.getURL('inject.js');
    self.scr.type = 'text/javascript';
    self.scr.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(self.scr);
};

// listen for event from inject script
document.addEventListener('configValuesSent', function (e) {
    chrome.runtime.sendMessage({ message: 'popupInfo', details: e.detail });
});


