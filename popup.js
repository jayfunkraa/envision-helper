var self = this;
chrome.runtime.sendMessage({ message: "runContentScript" });
document.getElementById('email-support').style.display = "none";
self.info = document.getElementById('info');
self.info.innerHTML = 'Getting configuration data...'
self.info.style.display = 'inline';
self.header = document.getElementById('header');
self.header.innerHTML = '';
self.header.style.display = 'none';
self.updateInfo = document.getElementById('update-info');
self.updateInfo.style.display = 'none';

chrome.storage.sync.get(['envisionHelperShowUpdateInfo'], function(result) {
    console.log('show update info:', result.envisionHelperShowUpdateInfo);

    if (result.envisionHelperShowUpdateInfo) {
        document.getElementById('update-title').innerHTML = '<strong>Updated to version ' + chrome.runtime.getManifest().version + '</strong>';
        document.getElementById('update-body').innerHTML = 'New features:<br/><ul><li>UI changes</li><li>Component Description added</li></ul>';
        document.getElementById('update-dismiss').addEventListener('click', function() {
            chrome.storage.sync.set({ 'envisionHelperShowUpdateInfo': false });
        });
        self.updateInfo.style.display = 'block';

    }
})

self.emailBody = '';
self.url = null;

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    self.url = tabs[0].url;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == 'popupInfo') {
        self.info.style.display = 'none';
        if (request.details.workflowType) {
            self.table = document.getElementById('info-table');
            self.table.innerHTML = '';

            self.header.innerHTML = '<div class="row"><div class="col-lg-8"><span>Configuration Information</span></div></div>'
            self.header.style.display = 'flex';

            self.body = document.createElement('tbody'), self.row1 = document.createElement('tr'), self.row2 = document.createElement('tr'), self.row3 = document.createElement('tr'), self.row4 = document.createElement('tr'), self.row5 = document.createElement('tr'), self.row6 = document.createElement('tr'), self.row7 = document.createElement('tr'), self.row8 = document.createElement('tr');

            self.row1.innerHTML = '<td><span class="RusadaLabel">Record ID</span></td><td><span class="RusadaDataLabel">' + request.details.recordId + '</span></td>';
            self.row2.innerHTML = '<td><span class="RusadaLabel">Workflow Type</span></td><td><span class="RusadaDataLabel">' + request.details.workflowType + '</span></td>';
            self.row3.innerHTML = '<td><span class="RusadaLabel">Workflow Code</span></td><td><span class="RusadaDataLabel">' + request.details.workflowCode + '</span></td>';
            self.row4.innerHTML = '<td><span class="RusadaLabel">Workflow Title</span></td><td><span class="RusadaDataLabel">' + request.details.workflowTitle + '</span></td>';
            self.row5.innerHTML = '<td><span class="RusadaLabel">Component Code</span></td><td><span class="RusadaDataLabel">' + request.details.componentCode + '</span></td>';
            self.row6.innerHTML = '<td><span class="RusadaLabel">Component Title</span></td><td><span class="RusadaDataLabel">' + request.details.componentTitle + '</span></td>';
            self.row7.innerHTML = '<td><span class="RusadaLabel">Component Description</span></td><td><span class="RusadaDataLabel">' + request.details.componentDescription + '</span></td>';
            self.row8.innerHTML = '<td><span class="RusadaLabel">Edit Level Locking</span></td><td><span class="RusadaDataLabel">' + (request.details.editLevelLocking ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>') + '</td>';

            self.body.appendChild(row1);
            self.body.appendChild(row2);
            self.body.appendChild(row3);
            self.body.appendChild(row4);
            self.body.appendChild(row5);
            self.body.appendChild(row6);
            self.body.appendChild(row7);
            self.body.appendChild(row8);

            self.table.appendChild(body);
        } else {
            self.info.innerHTML = 'No Data Available';
            self.info.style.display = 'inline';
        }

        if (request.details.includeInEmail) {
            document.getElementById('email-support').style.display = 'inline';
            if (request.details.workflowType) {
                self.emailBody = '%0A%0D%0A%0D%0A%0D------------------------------' +
                    '%0A%0DURL: ' + url +
                    '%0A%0DData Source: ' + request.details.dataSource +
                    '%0A%0DDatabase: ' + request.details.database +
                    '%0A%0DVersion: ' + request.details.version +
                    '%0A%0DEmployee No: ' + request.details.employeeNo +
                    '%0A%0DEmployee ID: ' + request.details.employeeId +
                    '%0A%0DMenu ID: ' + request.details.menuId +
                    '%0A%0DRole: ' + request.details.roleName +
                    '%0A%0DRole ID: ' + request.details.roleId +
                    '%0A%0DRecord ID: ' + request.details.recordId +
                    '%0A%0DWorkflow Type: ' + request.details.workflowType +
                    '%0A%0DWorkflow Code: ' + request.details.workflowCode +
                    '%0A%0DWorkflow Title: ' + request.details.workflowTitle +
                    '%0A%0DComponent Code: ' + request.details.componentCode +
                    '%0A%0DComponent Title: ' + request.details.componentTitle +
                    '%0A%0DComponent Description: ' + request.details.componentDescription +
                    '%0A%0D------------------------------'
            } else {
                self.emailBody = '%0A%0D%0A%0D%0A%0D------------------------------' +
                    '%0A%0DURL: ' + url +
                    '%0A%0DData Source: ' + request.details.dataSource +
                    '%0A%0DDatabase: ' + request.details.database +
                    '%0A%0DVersion: ' + request.details.version +
                    '%0A%0DEmployee No: ' + request.details.employeeNo +
                    '%0A%0DEmployee ID: ' + request.details.employeeId +
                    '%0A%0DMenu ID: ' + request.details.menuId +
                    '%0A%0DRole: ' + request.details.roleName +
                    '%0A%0DRole ID: ' + request.details.roleId +
                    '%0A%0D------------------------------'
            }
        }
    }
});

document.getElementById('email-support').addEventListener('click', function() {
    window.open('mailto:support@rusada.com?body=' + self.emailBody);
});