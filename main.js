const {app, BrowserWindow} = require("electron");
const Menu = require("./menu");

app.on("ready", () => {
    Menu.buildMenu();

    let window = new BrowserWindow({
        width: 1128,
        height: 649,
    });
    window.loadURL("file://" + __dirname + "/build/index.html");
});

app.on("window-all-closed", () => {
    app.quit();
});
