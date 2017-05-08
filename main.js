const {app, BrowserWindow} = require("electron");
const Menu = require("./menu");

app.on("ready", () => {
    Menu.buildMenu();

    let window = new BrowserWindow({
        width: 1128,
        height: 649,
        plugins: true
    });
    window.loadURL("file://" + __dirname + "/public/index.html");
});

app.on("window-all-closed", () => {
    app.quit();
});
