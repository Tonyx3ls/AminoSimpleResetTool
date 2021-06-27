const inquirer = require("inquirer");

async function inputReader(type, name, message, choices) {
  let options = [
    {
      type: type,
      name: name,
      message: message,
      choices: choices,
    },
  ];

  return await inquirer.prompt(options);
}

module.exports = inputReader;