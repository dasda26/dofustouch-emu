import GameManager from "./GameManager";

document.addEventListener("DOMContentLoaded", () => {
    let manager = window.gameManager = new GameManager();
    manager.initializeDomListeners();
    manager.initializeDofusListeners();
});
