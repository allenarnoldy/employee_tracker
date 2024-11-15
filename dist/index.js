import inquirer from "inquirer";
import logo from "asciiart-logo";
import Db from "./db/index.js";
const db = new Db();
init();
function init() {
    const logoText = logo({ name: "Employee Tracker" }).render();
    console.log(logoText);
    mainPromps();
}
function mainPromps() {
    inquirer.prompt([{
            type: "list",
            name: "choice",
            message: "What do you want to do?",
            choices: [{
                    name: "View All Departments",
                    value: "view_Departments"
                },
                {
                    name: "View All Roles",
                    value: "view_Roles"
                },
                {
                    name: "View All Employees",
                    value: "view_Employees"
                },
                {
                    name: "Add Department",
                    value: "add_Department"
                },
                {
                    name: "Add Role",
                    value: "add_Role"
                },
                {
                    name: "Add Employee",
                    value: "add_Employee"
                },
                {
                    name: "Update Employee Role",
                    value: "update_Employee_Role"
                },
                {
                    name: "View Department Budget",
                    value: "view_Department_Budget"
                },
                {
                    name: "Quit",
                    value: "quit"
                }]
        }])
        .then(res => {
        switch (res.choice) {
            case "view_Departments":
                getAllDepartments();
                break;
            case "view_Roles":
                getAllRoles();
                break;
            case "view_Employees":
                getAllEmployees();
                break;
            case "add_Department":
                addDepartment();
                break;
            case "add_Role":
                addRole();
                break;
            case "add_Employee":
                addEmployee();
                break;
            case "update_Employee_Role":
                updateEmployeeRole();
                break;
            case "view_Department_Budget":
                getDepartmentBudget();
                break;
            default:
                quit();
        }
    });
}
function getAllDepartments() {
    db.getAllDepartments()
        .then(({ rows }) => {
        const departments = rows;
        console.log("\n");
        console.table(departments);
    })
        .then(() => mainPromps());
}
function getAllRoles() {
    db.getAllRoles()
        .then(({ rows }) => {
        const roles = rows;
        console.log("\n");
        console.table(roles);
    })
        .then(() => mainPromps());
}
function getAllEmployees() {
    db.getAllEmployees()
        .then(({ rows }) => {
        const employees = rows;
        console.log("\n");
        console.table(employees);
    })
        .then(() => mainPromps());
}
function addDepartment() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the name of the department?"
        }])
        .then(res => {
        db.addDepartment(res.name)
            .then(() => console.log("Department added successfully"))
            .then(() => mainPromps());
    });
}
function addRole() {
    inquirer.prompt([{
            type: "input",
            name: "title",
            message: "What is the name of the role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department id of the role?"
        }])
        .then(res => {
        db.addRole(res.title, res.salary, res.department_id)
            .then(() => console.log("Role added"))
            .then(() => mainPromps());
    });
}
function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the employee's role id?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the employee's manager id?"
        }])
        .then(res => {
        db.addEmployee(res.first_name, res.last_name, res.role_id, res.manager_id)
            .then(() => console.log("Employee added"))
            .then(() => mainPromps());
    });
}
function updateEmployeeRole() {
    Promise.all([db.getAllEmployees(), db.getAllRoles()])
        .then(([employeesResults, rolesResults]) => {
        const employees = employeesResults.rows;
        const roles = rolesResults.rows;
        const employeeChoices = employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }));
        const roleChoices = roles.map(role => ({
            name: role.title,
            value: role.id
        }));
        return inquirer.prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Which employee's role do you want to update?",
                choices: employeeChoices
            },
            {
                type: "list",
                name: "role_id",
                message: "What role do you want to assign the selected employee?",
                choices: roleChoices
            }
        ]);
    })
        .then(res => {
        db.updateEmployeeRole(res.employee_id, res.role_id)
            .then(() => console.log("Employee role updated"))
            .then(() => mainPromps());
    });
}
function getDepartmentBudget() {
    inquirer.prompt([{
            type: "input",
            name: "department_id",
            message: "What is the department's id?"
        }])
        .then(res => {
        db.getDepartmentBudget(res.department_id)
            .then(({ rows }) => {
            const budget = rows;
            console.log("\n");
            console.table(budget);
        })
            .then(() => mainPromps());
    });
}
function quit() {
    console.log("Goodbye!");
    process.exit();
}
