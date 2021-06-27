const inquirer = require("inquirer");
require("colors");

let Amino = require("./aminoAPI/Amino");

//helpers
let showNickName = require("./helpers/showNickname");
let leaveAllJoinedChats = require("./modules/leaveAllJoinedchats");
let pause = require("./helpers/pause");
let inputReader = require("./helpers/inputReader");

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

  //214 conrtraseña incorrecta, 213 correo incorrecto
  //'api:statuscode': 200, 'Account or password is incorrect! If you forget your password, please reset it.'
  const pass = await inquirer.prompt(optionsPass);
  let result = await Amino.login(email.email, pass.pass);
  result = JSON.stringify(result);
  if (
    result.includes('api:statuscode":200') ||
    result.includes("214") ||
    result.includes("213")
  ) {
    console.log(
      "Account or password is incorrect! If you forget your password, please reset it."
        .magenta
    );
    let selection = (
      await inputReader("list", "select", "\n", [
        { value: "exit", name: "exit".magenta },
        { value: "retry", name: "Try again".green },
      ])
    ).select;

    switch (selection) {
      case "retry":
        await login();

        break;

      case "exit":
        console.clear();
        process.exit();
    }
  }

  console.log("LOGIN ============== OK!!! ".green);
}

async function showMainMenu() {
  opts = await menu();
  switch (opts.option) {
    case "1":
      let status;
      do {
        status = await leaveAllJoinedChats();
      } while (status !== 0);
      showMainMenu();
      break;

    case "2":
      console.clear();
      process.exit();
      break;
  }
}

async function main() {
  await login();
  await pause(`Press ${"enter".red} to continue`);
  await showMainMenu();
}

main();
