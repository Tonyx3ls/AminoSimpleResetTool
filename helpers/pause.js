let inquirer = require('inquirer');

async function pause(message) {
    const question = [
      {
        type: "input",
        name: "enter",
        message: message,
      },
    ];
  
    await inquirer.prompt(question);
  }
  

  module.exports = pause;