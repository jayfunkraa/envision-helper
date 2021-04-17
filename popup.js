var self = this;
chrome.runtime.sendMessage({ message: "runContentScript" });
document.getElementById('info-table').innerHTML = '<tr colspan=2><td>No data available</td></tr>';

self.emailBody = '';
self.url = null;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    self.url = tabs[0].url;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == 'popupInfo') {
        if (request.details.workflowType) {
            self.table = document.getElementById('info-table');
            self.table.innerHTML = '';

            self.header = document.createElement('thead');
            self.header.innerHTML = '<tr><th colspan="2">Configuration Information</th></tr>';
            self.header.className = 'thead-light';
            self.table.appendChild(header);

            self.body = document.createElement('tbody')
                , self.row1 = document.createElement('tr')
                , self.row2 = document.createElement('tr')
                , self.row3 = document.createElement('tr')
                , self.row4 = document.createElement('tr')
                , self.row5 = document.createElement('tr')
                , self.row6 = document.createElement('tr')
                , self.row7 = document.createElement('tr');

            self.row1.innerHTML = '<th scope="row">Record ID</th><td>' + request.details.recordId + '</td>';
            self.row2.innerHTML = '<th scope="row">Workflow Type</th><td>' + request.details.workflowType + '</td>';
            self.row3.innerHTML = '<th scope="row">Workflow Code</th><td>' + request.details.workflowCode + '</td>';
            self.row4.innerHTML = '<th scope="row">Workflow Title</th><td>' + request.details.workflowTitle + '</td>';
            self.row5.innerHTML = '<th scope="row">Component Code</th><td>' + request.details.componentCode + '</td>';
            self.row6.innerHTML = '<th scope="row">Component Title</th><td>' + request.details.componentTitle + '</td>';
            self.row7.innerHTML = '<th scope="row">Edit Level Locking</th><td>' + (request.details.editLevelLocking && '<i class="fas fa-check"></i>') + '</td>';

            self.body.appendChild(row1);
            self.body.appendChild(row2);
            self.body.appendChild(row3);
            self.body.appendChild(row4);
            self.body.appendChild(row5);
            self.body.appendChild(row6);
            self.body.appendChild(row7);

            self.table.appendChild(body);
        }

        if (request.details.includeInEmail) {
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

document.getElementById('email-support').addEventListener('click', function () {
    window.open('mailto:support@rusada.com?body=' + self.emailBody);
});