const figlet = require("figlet");

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

module.exports = showNickName;
