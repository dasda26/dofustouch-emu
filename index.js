const {app, BrowserWindow, Menu} = require("electron");

app.on("ready", () => {
    buildMenu();

    let window = new BrowserWindow({
        width: 1128,
        height: 649
    });
    window.loadURL("file://" + __dirname + "/views/index.html", {
        userAgent: "Mozilla/5.0 (Linux; Android 6.0; FEVER Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36"
    });
});

app.on("window-all-closed", () => {
    app.quit();
});

function buildMenu() {
    let template = [];

    if (process.platform === "darwin") {
        template.push({
            label: app.getName(),
            submenu: [
                {
                    role: "about"
                },
                {
                    type: "separator"
                },
                {
                    role: "hide"
                },
                {
                    role: "hideothers"
                },
                {
                    role: "unhide"
                },
                {
                    type: "separator"
                },
                {
                    role: "quit"
                }
            ]
        });
    }

    template.push({
        label: "Jeu",
        submenu: [
            {
                label: "Console de développeur",
                accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.webContents.toggleDevTools();
                    }
                }
            },
            {
                label: "Activer / Désactiver le son",
                click(item, focusedWindow) {
                    focusedWindow.webContents.setAudioMuted(!focusedWindow.webContents.isAudioMuted());
                }
            }
        ]
    });

    template.push({
        label: "Edition",
        submenu: [
            {
                label: "Annuler",
                role: "undo"
            },
            {
                type: "separator"
            },
            {
                label: "Couper",
                role: "cut"
            },
            {
                label: "Copier",
                role: "copy"
            },
            {
                label: "Coller",
                role: "paste"
            },
            {
                label: "Tout sélectionner",
                role: "selectall"
            }
        ]
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
