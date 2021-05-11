var self = this;
self.database = '';
self.dataSource = '';
self.dataSource = '';
self.roleName = '';
self.includeInEmail = true;

if (document.getElementById('sessionDataBase')) {
    if (document.getElementById('sessionDataBase').getElementsByTagName('div').length > 0) {
        self.database = document.getElementById('sessionDataBase').getElementsByTagName('div')[0].innerText.replace('Database: ', '');
    }
    if (document.getElementById('sessionDataSource').getElementsByTagName('div').length > 0) {
        self.dataSource = document.getElementById('sessionDataSource').getElementsByTagName('div')[0].innerText.replace('Data Source: ', '');
    }
    if (document.getElementById('mainmenurole')) {
        self.roleName = document.getElementById('mainmenurole').title;
    }
} else {
    self.includeInEmail = false;
}
if (Envision.Utilities.GetCurrentWorkFlow() && Envision.Utilities.GetCurrentWorkFlowComponent()) {

    var workflow = Envision.Utilities.GetCurrentWorkFlow();
    var component = Envision.Utilities.GetCurrentWorkFlowComponent();

    Envision.Ajax.get(Envision.AjaxConst._GET_ROLE_COMPONENT_LIST, {
            uRole_ID: Envision.UserDetails.uRole_ID(),
            uMenu_ID: Envision.UserDetails.uMenu_ID(),
            wWorkFlow_ID: Envision.Utilities.GetCurrentWorkFlow().WorkFlow_ID
        },
        // success
        function(data) {
            var dtArray = [];
            var componentDescription = '';
            ko.utils.arrayForEach(data, function(item) {
                var componentExist = ko.utils.arrayFilter(dtArray, function(arrayItem) {
                    return item.wComponent_ID === arrayItem.wComponent_ID && item.wWorkFlow_ID === arrayItem.wWorkFlow_ID;
                });
                if (componentExist.length === 0) {
                    dtArray.push(item);
                }
            });
            if (dtArray.length > 0) {
                componentDescription = dtArray.find(item => item.ID === Envision.Utilities.GetCurrentWorkFlowComponentID()).Description;
                hideNotification();
            }

            document.dispatchEvent(new CustomEvent('configValuesSent', {
                detail: {
                    includeInEmail: includeInEmail,
                    recordId: workflow.ObjectId(),
                    workflowType: workflow.WorkFlowType,
                    workflowCode: workflow.WorkflowCode,
                    workflowTitle: component.WorkFlowDescription(),
                    componentCode: component.ComponentCode(),
                    componentTitle: component.ComponentTitle(),
                    componentDescription: componentDescription,
                    editLevelLocking: workflow.EditLevelLocking,
                    employeeId: Envision.UserDetails.EmployeeID(),
                    employeeNo: Envision.UserDetails.EmployeeNo(),
                    version: Envision.Utilities.Version,
                    menuId: Envision.UserDetails.uMenu_ID(),
                    roleId: Envision.UserDetails.uRole_ID(),
                    roleName: roleName,
                    database: database,
                    dataSource: dataSource
                }
            }));
        }
    );
} else {
    document.dispatchEvent(new CustomEvent('configValuesSent', {
        detail: {
            includeInEmail: includeInEmail,
            employeeId: Envision.UserDetails.EmployeeID(),
            employeeNo: Envision.UserDetails.EmployeeNo(),
            version: Envision.Utilities.Version,
            menuId: Envision.UserDetails.uMenu_ID(),
            roleId: Envision.UserDetails.uRole_ID(),
            roleName: roleName,
            database: database,
            dataSource: dataSource
        }
    }));
};