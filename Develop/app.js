const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

let employeeArray = [];

function promptManager() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the team managers name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is their ID number?",
      name: "id",
    },
    {
      type: "input",
      message: "What is their email?",
      name: "email",
    },
    {
      type: "input",
      message: "What is their office number?",
      name: "officeNumber",
    },
  ]);
}

function promptUserInit() {
  return inquirer.prompt([
    {
      type: "input",
      message: "How many team members are there?",
      name: "EmpNum",
    },
  ]);
}

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is their name?",
      name: "name",
    },
    {
      type: "input",
      message: "What is their ID number?",
      name: "id",
    },
    {
      type: "input",
      message: "What is their email?",
      name: "email",
    },
    {
      type: "checkbox",
      message: "What is their role?",
      choices: ["Engineer", "Intern"],
      name: "role",
    },
  ]);
}

function promptEngineer() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is their GitHub?",
      name: "github",
    },
  ]);
}

function promptIntern() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Where are they going to school?",
      name: "school",
    },
  ]);
}

async function initialize() {
  try {
    let hasManager = false;
    const managerResponse = await promptManager();
    let empMan = new Manager(
      managerResponse.name,
      managerResponse.id,
      managerResponse.email,
      managerResponse.officeNumber
    );
    employeeArray.push(empMan);
    const initResponse = await promptUserInit();
    let EmpNum = initResponse.EmpNum;
    console.log(initResponse.EmpNum);
    for (var i = 0; i < EmpNum; i++) {
      const response = await promptUser();
      let empEng;
      let empInt;

      if (response.role == "Engineer") {
        const resEng = await promptEngineer();
        empEng = new Engineer(
          response.name,
          response.id,
          response.email,
          resEng.github
        );
        employeeArray.push(empEng);
      } else if (response.role == "Intern") {
        const resInt = await promptIntern();
        empInt = new Intern(
          response.name,
          response.id,
          response.email,
          resInt.school
        );
        employeeArray.push(empInt);
      }
      console.log("Employee Added!");
    }
    console.log(employeeArray);
    const renderHTML = render(employeeArray);
    console.log(renderHTML);
    fs.writeFileSync(outputPath, render(employeeArray));
    // console.log(employ);
  } catch (error) {
    console.log(error);
  }
}
initialize();
