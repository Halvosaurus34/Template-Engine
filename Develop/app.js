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

function promptUserInit() {
  return inquirer.prompt([
    {
      type: "input",
      message: "How many emplyees do you want to add?",
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
      choices: ["Engineer", "Intern", "Manager"],
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

function promptManager() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is their office number?",
      name: "officeNum",
    },
  ]);
}

async function initialize() {
  try {
    const initResponse = await promptUserInit();
    let EmpNum = initResponse.EmpNum;
    console.log(initResponse.EmpNum);
    for (var i = 0; i < EmpNum; i++) {
      const response = await promptUser();
      let empEng;
      let empInt;
      let empMan;

      if (response.role == "Engineer") {
        const resEng = await promptEngineer();
        empEng = new Engineer(
          response.name,
          response.id,
          response.email,
          response.role[0],
          resEng.github
        );
        employeeArray.push(empEng);
      } else if (response.role == "Intern") {
        const resInt = await promptIntern();
        empInt = new Intern(
          response.name,
          response.id,
          response.email,
          response.role[0],
          resInt.school
        );
        employeeArray.push(empInt);
      } else if (response.role == "Manager") {
        const resMan = await promptManager();
        empMan = new Manager(
          response.name,
          response.id,
          response.email,
          response.role[0],
          resMan.officeNum
        );
        employeeArray.push(empMan);
      }
      console.log("Employee Added!");
    }
    console.log(employeeArray);
    const renderHTML = render(employeeArray);
    console.log(renderHTML);
    fs.writeFileSync("team.html", render(employeeArray));
    // console.log(employ);
  } catch (error) {
    console.log(error);
  }
}
initialize();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
