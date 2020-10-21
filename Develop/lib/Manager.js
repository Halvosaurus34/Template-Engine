// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Manager extends Employee {
  constructor(name, id, email, role = "Manager", officeNum) {
    super(name, id, email);
    this.role = role;
    this.officeNum = officeNum;
  }
  getRole() {
    return this.role;
  }

  getOfficeNum() {
    return this.officeNum;
  }
}

module.exports = Manager;
