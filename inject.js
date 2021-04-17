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

    self.workflow = Envision.Utilities.GetCurrentWorkFlow();
    self.component = Envision.Utilities.GetCurrentWorkFlowComponent();

    self.values = {
        includeInEmail: includeInEmail,
        recordId: workflow.ObjectId(),
        workflowType: workflow.WorkFlowType,
        workflowCode: workflow.WorkflowCode,
        workflowTitle: component.WorkFlowDescription(),
        componentCode: component.ComponentCode(),
        componentTitle: component.ComponentTitle(),
        editLevelLocking: workflow.EditLevelLocking,
        employeeId: Envision.UserDetails.EmployeeID(),
        employeeNo: Envision.UserDetails.EmployeeNo(),
        version: Envision.Utilities.Version,
        menuId: Envision.UserDetails.uMenu_ID(),
        roleId: Envision.UserDetails.uRole_ID(),
        roleName: roleName,
        database: database,
        dataSource: dataSource
    };
} else {
    self.values = {
        includeInEmail: includeInEmail,
        employeeId: Envision.UserDetails.EmployeeID(),
        employeeNo: Envision.UserDetails.EmployeeNo(),
        version: Envision.Utilities.Version,
        menuId: Envision.UserDetails.uMenu_ID(),
        roleId: Envision.UserDetails.uRole_ID(),
        roleName: roleName,
        database: database,
        dataSource: dataSource
    };
};

document.dispatchEvent(new CustomEvent('configValuesSent', { detail: self.values }));