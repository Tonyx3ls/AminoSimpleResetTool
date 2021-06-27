const Amino = require("../aminoAPI/Amino");
require("colors");


//helpers
let inputReader = require("../helpers/inputReader");
let showNickName = require("../helpers/showNickname");
let pause = require("../helpers/pause");

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
    name: `\nReturn to ${"main menu".bgMagenta}\n`
  })
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
  if(selection=== 0){
    return selection;
  }

  let community = selection;
  let start = 0;
  let size = 100;
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
          }
        });
      } else if (!chat.title) {
        chatName = "unamed";
      } else {
        chatName = chat.title;
      }
      totalChats.push({
        name: chatName,
        id: chat.threadId,
      });
    });

    if (chats.length === 0) {
      finished = true;
    }

    start = start + 100;
    size = size + 100;
  }

  console.log(`total joined chats: ${totalChats.length.toString().green}\n`);
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
          value: "cancel",
          name: `${"Cancel".magenta} and return to menu`,
        },
      ]
    )
  ).optSelect;

  switch (option) {
    case "continue":
      console.log("leaving all chats...\n".cyan);

      for (let index = 0; index < totalChats.length; index++) {
        await Amino.leaveChat(
          community,
          totalChats[index].id,
          Amino.getMyUID()
        );
        console.log(`leaving ${totalChats[index].name}`);
      }

      break;

    case "cancel":
      await pause(`Process canceled, press ${"Enter".red} to continue`);
      return 0;
  }

  /*
  for (let index = 0; index < totalChats.length; index++) {
    await Amino.leaveChat(
      community,
      totalChats[index].chat.id,
      Amino.getMyUID()
    );
    console.log(`leaving ${totalChats[index].chat.name}`);
  }

  /*
  totalChats.forEach(async (chat) => {
    await Amino.leaveChat(community, chat.id, Amino.getMyUID());
    console.log(`leaving ${chat.name}`);
  });*/

  await pause(`Press ${"Enter".red} to continue`);
}

module.exports = leaveAllJoinedChats;
