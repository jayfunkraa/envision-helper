chrome.runtime.sendMessage({ message: "runContentScript" });
document.getElementById('info-table').innerHTML = '<tr colspan=2><td>No data available</td></tr>';

var emailBody = '';
var url = null;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    url = tabs[0].url;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == 'popupInfo') {
        if (request.details.workflowType) {
            let table = document.getElementById('info-table');
            table.innerHTML = '';

            let header = document.createElement('thead');
            header.innerHTML = '<tr><th colspan="2">Configuration Information</th></tr>';
            header.className = 'thead-light';
            table.appendChild(header);

            let body = document.createElement('tbody')
                , row1 = document.createElement('tr')
                , row2 = document.createElement('tr')
                , row3 = document.createElement('tr')
                , row4 = document.createElement('tr')
                , row5 = document.createElement('tr')
                , row6 = document.createElement('tr')
                , row7 = document.createElement('tr');

            row1.innerHTML = '<th scope="row">Record ID</th><td>' + request.details.recordId + '</td>';
            row2.innerHTML = '<th scope="row">Workflow Type</th><td>' + request.details.workflowType + '</td>';
            row3.innerHTML = '<th scope="row">Workflow Code</th><td>' + request.details.workflowCode + '</td>';
            row4.innerHTML = '<th scope="row">Workflow Title</th><td>' + request.details.workflowTitle + '</td>';
            row5.innerHTML = '<th scope="row">Component Code</th><td>' + request.details.componentCode + '</td>';
            row6.innerHTML = '<th scope="row">Component Title</th><td>' + request.details.componentTitle + '</td>';
            row7.innerHTML = '<th scope="row">Edit Level Locking</th><td>' + (request.details.editLevelLocking && '<i class="fas fa-check"></i>') + '</td>';

            body.appendChild(row1);
            body.appendChild(row2);
            body.appendChild(row3);
            body.appendChild(row4);
            body.appendChild(row5);
            body.appendChild(row6);
            body.appendChild(row7);

            table.appendChild(body);
        }

        if (request.details.includeInEmail) {
            if (request.details.workflowType) {
                emailBody = '%0A%0D%0A%0D%0A%0D------------------------------' +
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
                emailBody = '%0A%0D%0A%0D%0A%0D------------------------------' +
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
    window.open('mailto:support@rusada.com?body=' + emailBody);
});