import { pool } from "./connection.js";
export default class DB {
    constructor() { }
    async query(sql, args = []) {
        const client = await pool.connect();
        try {
            return client.query(sql, args);
        }
        finally {
            client.release();
        }
    }
    //view all roles
    getAllRoles() {
        return this.query(`SELECT r.title, r.id, d.name AS department, r.salary
        FROM role r
        JOIN department d ON r.department_id = d.id`);
    }
    //view all departments
    getAllDepartments() {
        return this.query(`SELECT d.id, d.name
            FROM department d`);
    }
    //view all employees
    getAllEmployees() {
        return this.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
             FROM employee e
             JOIN role r ON e.role_id = r.id
             JOIN department d ON r.department_id = d.id
             LEFT JOIN employee manager ON e.manager_id = manager.id`);
    }
    //add a role
    addRole(title, salary, department_id) {
        return this.query(`INSERT INTO role (title, salary, department_id) values ($1, $2, $3)`, [title, salary, department_id]);
    }
    //add a department
    addDepartment(name) {
        return this.query(`INSERT INTO department (name) values ($1)`, [name]);
    }
    //add an employee
    addEmployee(first_name, last_name, role_id, manager_id) {
        let newEmployee;
        console.log(manager_id);
        if (manager_id == null || String(manager_id) === '') {
            newEmployee = this.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)`, [first_name, last_name, role_id]);
        }
        else {
            newEmployee = this.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [first_name, last_name, role_id, manager_id]);
        }
        return newEmployee;
    }
    //update an employee role
    updateEmployeeRole(employee_id, role_id) {
        return this.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, [role_id, employee_id]);
    }
    // view total utilized budget of a department
    getDepartmentBudget(department_id) {
        return this.query(`SELECT d.name AS department, SUM(r.salary) AS budget
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            WHERE d.id = $1
            GROUP BY d.name`, [department_id]);
    }
}
