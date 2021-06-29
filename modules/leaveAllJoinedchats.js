const Amino = require("../aminoAPI/Amino");
require("colors");

//helpers
let inputReader = require("../helpers/inputReader");
let showNickName = require("../helpers/showNickname");

let exceptionList = [];
let community = '';

async function createExceptionList(totalChats) {
  console.clear();
  let choices = totalChats.map((chat) => {
    return {
      value: chat.id + "|" + chat.name + "|" + "unsafe",
      name: chat.name,
    };
  });
  choices.push({
    value: "save",
    name: "\n<=".red + "save and return\n",
  });
  let finished = false;

  do {
    console.clear();
    await showNickName();
    let selection = (
      await inputReader(
        "list",
        "exceptionList",
        `Select the chat you want to keep safe and press ${
          "enter".cyan
        } to add it to the exceptions list.`,
        choices
      )
    ).exceptionList;

    if (selection === "save") {
      return;
    }
    let chat = selection;
    let chatID = chat.split("|")[0];
    let chatName = chat.split("|")[1];
    let status = chat.split("|")[2];

    let selectedChat = choices.find((choice) => choice.value == chat);
    let indexOfElement = choices.indexOf(selectedChat);
    console.log(indexOfElement);

    if (status === "unsafe") {
      //to change the chat status from unsafe to safe and prevent to erase.
      choices.splice(indexOfElement, 1, {
        value: chatID + "|" + chatName + "|" + "safe",
        name: chatName.bgCyan + "safe".green,
      });

      exceptionList.push(chatID);
    } else {
      choices.splice(indexOfElement, 1, {
        value: chatID + "|" + chatName + "|" + "unsafe",
        name: chatName,
      });

      let specificChatID = exceptionList.find((id) => id === chatID);
      let indexToRemove = exceptionList.indexOf(specificChatID);
      exceptionList.splice(indexToRemove, 1);
    }
  } while (!finished);
}

async function leaveChats(totalChats) {
  console.log("\nleaving chats...\n".cyan);
  for (let index = 0; index < totalChats.length; index++) {
    if (!exceptionList.includes(totalChats[index].id)) {
      await Amino.leaveChat(community, totalChats[index].id, Amino.getMyUID());
      console.log(`leaving ${totalChats[index].name}`);
    }
  }
  exceptionList = [];
}

async function leaveAllJoinedChats() {
  console.clear();

  let coms = await Amino.getJoinedComs();
  let choices = coms.coms.map((com) => {
    return {
      value: com.id,
      name: com.name,
    };
  });

  choices.push({
    value: 0,
    name: `\nReturn to ${"main menu".bgMagenta}\n`,
  });
  await showNickName();
  const selection = (
    await inputReader(
      "list",
      "comSelect",
      "select a community".bgMagenta,
      choices
    )
  ).comSelect;

  // for return to main menu
  if (selection === 0) {
    return selection;
  }

  community = selection;
  let start = 0;
  let size = 100;
  let type = "type of chat";
  let finished = false;
  let totalChats = [];

  while (!finished) {
    chats = await Amino.getJoinedChats(community, start, size);

    //creating an array with all chats names and ids
    chats.forEach((chat) => {
      let chatName;
      if (chat.type === 0) {
        chat.membersSummary.forEach((element) => {
          if (element.uid !== Amino.getMyUID()) {
            chatName = element.nickname;
            type = "private";
          }
        });
      } else if (chat.type == 1) {
        !chat.title ? (chatName = "unamed") : (chatName = chat.title);
        type = "group";
      } else {
        chatName = chat.title;
        type = "public";
      }

      totalChats.push({
        name: chatName,
        id: chat.threadId,
        type: type,
      });
    });

    if (chats.length === 0) {
      finished = true;
    }

    start = start + 100;
    size = size + 100;
  }

  let cancel = false;
  if (totalChats.length === 0) {
    return;
  }
  console.clear();
  await showNickName();
  console.log(`\ntotal joined chats: ${totalChats.length.toString().green}\n`);
  do {
    let option = (
      await inputReader(
        "list",
        "optSelect",
        "Are you sure you want to continue?",
        [
          {
            value: "continue",
            name: `i want to ${"continue".green}`,
          },
          {
            value: "exception",
            name: `Add exceptions`,
          },
          {
            value: "cancel",
            name: `${"Cancel".magenta} and return to menu`,
          },
        ]
      )
    ).optSelect;

    switch (option) {
      case "continue":
        await leaveChats(totalChats);
        cancel = true;

        break;
      case "exception":
        await createExceptionList(totalChats);

        break;
      case "cancel":
        cancel = true;
    }
  } while (!cancel);

}

module.exports = leaveAllJoinedChats;
