const Amino = require("../aminoAPI/Amino");
const inquirer = require("inquirer");
require("colors");

let showNickName = require("../helpers/showNickname");
let pause = require("../helpers/pause");

async function leaveAllJoinedChats() {
  console.clear();

  let coms = await Amino.getJoinedComs();
  let choices = [];
  coms.coms.forEach((com) => {
    choices.push({
      value: com.id,
      name: com.name,
    });
  });

  const options = [
    {
      type: "list",
      name: "comSelect",
      message: "Select a community".bgMagenta,
      choices: choices,
    },
  ];

  await showNickName();

  const community = (await inquirer.prompt(options)).comSelect;
  console.log(community);

  let start = 0;
  let size = 100;
  let finished = false;
  let total = 0;
  let totalChats = [];

  while (!finished) {
    chats = await Amino.getJoinedChats(community, start, size);
    total = total + chats.length;

    //creating an array with all chats names and ids
    chats.forEach((chat) => {
      let chatName, chatId;
      if (chat.type === 0) {
        chat.membersSummary.forEach((element) => {
          if (element.uid !== Amino.getMyUID()) {
            chatName = element.nickname;
          }
        });
      } else if (!chat.title) {
        chatName = "unamed";
      } else {
        chatName = chat.title;
      }

      totalChats.push({
        name: chatName,
        id: chatId,
      });
    });

    if (chats.length === 0) {
      finished = true;
    }

    start = start + 100;
    size = size + 100;
  }

  console.log("total joined chats ", total);
  console.log("total two ", totalChats.length )

  totalChats.forEach( async (chat)=> {
      await Amino.leaveChat(community, chat.id, Amino.getMyUID());
      console.log(`leaving ${chat.chatName}`);
  });
  await pause();
}

module.exports = leaveAllJoinedChats;
