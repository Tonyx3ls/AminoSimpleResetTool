let inquirer = require('inquirer');

async function pause() {
    const question = [
      {
        type: "input",
        name: "enter",
        message: `Press ${"enter".red} to continue`,
      },
    ];
  
    await inquirer.prompt(question);
  }
  

  module.exports = pause;