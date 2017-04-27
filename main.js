const {app, BrowserWindow} = require("electron");
const Menu = require("./menu");

app.on("ready", () => {
    Menu.buildMenu();

    let window = new BrowserWindow({width: 1128, height: 649,});
    window.loadURL("file://" + __dirname + "/build/index.html");
    // @todo userAgent for the webview "Mozilla/5.0 (Linux; Android 6.0; FEVER Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36"
});

app.on("window-all-closed", () => {
    app.quit();
});
