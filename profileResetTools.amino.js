const readline = require("readline");
const figlet = require("figlet");
const inquirer = require("inquirer");
require("colors");

async function eraseAllcommentsOnWall() {
  console.log("working...".green);
  setTimeout(() => {
    console.log("all comments deleted successfully");
    setTimeout(async () => {
      console.clear();
      await inputReader();
    }, 3000);
  }, 6000);
}

async function showNickName() {
  return new Promise((resolve) => {
    figlet.text(
      "@Tonyx3ls",
      {
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 50,
        whitespaceBreak: true,
      },
      function (err, data) {
        if (err) {
          console.log("______________");
          return;
        }
        console.log(data);
        resolve();
      }
    );
  });
}

async function menu() {
 console.clear();
  const options = [
    {
      type: "list",
      name: "option",
      message: "Select a option",
      choices: [
        {
          value: "1",
          name: "1) Erase all comments on wall",
        },
        {
          value: "2",
          name: "2) Leave all joined chats",
        },
      ],
    },
  ];

  await showNickName();
  const opt = await inquirer.prompt(options);

  return opt;
}

async function pause(){
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'enter'.red} to continue`
        }
    ]

    await inquirer.prompt(question);
}


async function inputReader(){
    opts = await menu();
    switch (opts.option) {
        
        case "1": eraseAllcommentsOnWall();
            
            break;
    
        case "2": opt = process.exit();
            break;
    }
}



async function main() {

    inputReader();

}

main();
