const readline = require("readline");
const inquirer = require("inquirer");
require("colors");

let Amino = require("./aminoAPI/Amino");
let showNickName = require("./helpers/showNickname");

let leaveAllJoinedChats = require("./src/leaveAllJoinedchats");
let pause = require('./helpers/pause');

async function menu() {
  console.clear();
  const options = [
    {
      type: "list",
      name: "option",
      message: "Simple Amino account reset tool".bgMagenta,
      choices: [
        {
          value: "1",
          name: "1) Leave all joined chats",
        },
        {
          value: "2",
          name: "2) Exit",
        },
      ],
    },
  ];

  await showNickName();
  const opt = await inquirer.prompt(options);

  return opt;
}

async function login() {
  console.clear();
  const optionsEmail = [
    {
      type: "input",
      name: "email",
      message: `Please enter your amino credentials\n ${"Email:".cyan}:`,
    },
  ];

  await showNickName();
  console.log("Simple Amino account reset tool".bgMagenta);

  const email = await inquirer.prompt(optionsEmail);

  const optionsPass = [
    {
      type: "password",
      mask: "*",
      name: "pass",
      message: "\nPassword:".cyan,
    },
  ];

  //214 conrtraseña incorrecta, 213 correo correcto
  const pass = await inquirer.prompt(optionsPass);
  console.log(await Amino.login(email.email, pass.pass));


}


async function inputReader() {
  opts = await menu();
  switch (opts.option) {
    case "1":
      await leaveAllJoinedChats();

      break;

    case "2":
      console.clear();
      process.exit();
      break;
  }
}

async function main() {
  await login();
  await pause();
  inputReader();
}

main();
