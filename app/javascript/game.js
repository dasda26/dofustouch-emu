Array.prototype.last = function () {
    return this[this.length - 1];
};

function sendNotification(body) {
    if (document.hidden) {
        new Notification(window.gui.playerData.characterBaseInformations.name, {
            body: body
        });
    }
}

(() => {
    let isOnline = false;

    window.addEventListener("resize", () => window.gui._resizeUi());

    window.addEventListener("keydown", (event) => {
        if (isOnline && event.srcElement == document.body && !event.metaKey) {
            switch (event.key.toUpperCase()) {
                /* Characteristic gui */
                case "C":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Carac").tap();
                    event.preventDefault();
                    break;
                /* Spell gui */
                case "S":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Spell").tap();
                    event.preventDefault();
                    break;
                /* Bag gui */
                case "I":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Bag").tap();
                    event.preventDefault();
                    break;
                /* BidHouse gui */
                case "H":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "BidHouse").tap();
                    event.preventDefault();
                    break;
                /* Friend gui */
                case "F":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Friend").tap();
                    event.preventDefault();
                    break;
                /* Book gui */
                case "Q":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Book").tap();
                    event.preventDefault();
                    break;
                /* Guild gui */
                case "G":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Guild").tap();
                    event.preventDefault();
                    break;
                /* Job gui */
                case "J":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Job").tap();
                    event.preventDefault();
                    break;
                /* Mount gui */
                case "D":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Mount").tap();
                    event.preventDefault();
                    break;
                /* Bestiary gui */
                case "B":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Bestiary").tap();
                    event.preventDefault();
                    break;
                /* Title gui */
                case "N":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Title").tap();
                    event.preventDefault();
                    break;
                /* Achievement gui */
                case "U":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Achievement").tap();
                    event.preventDefault();
                    break;
                /* Almanax gui */
                case "X":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Almanax").tap();
                    event.preventDefault();
                    break;
                /* Map gui */
                case "M":
                    window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Map").tap();
                    event.preventDefault();
                    break;
                /* Spell 0 */
                case "0":
                case "À":
                    window.gui.shortcutBar._panels.spell.slotList[0].tap();
                    event.preventDefault();
                    break;
                /* Spell 1 */
                case "1":
                case "&":
                    window.gui.shortcutBar._panels.spell.slotList[1].tap();
                    event.preventDefault();
                    break;
                /* Spell 2 */
                case "2":
                case "É":
                    window.gui.shortcutBar._panels.spell.slotList[2].tap();
                    event.preventDefault();
                    break;
                /* Spell 3 */
                case "3":
                case "\"":
                    window.gui.shortcutBar._panels.spell.slotList[3].tap();
                    event.preventDefault();
                    break;
                /* Spell 4 */
                case "4":
                case "'":
                    window.gui.shortcutBar._panels.spell.slotList[4].tap();
                    event.preventDefault();
                    break;
                /* Spell 5 */
                case "5":
                case "(":
                    window.gui.shortcutBar._panels.spell.slotList[5].tap();
                    event.preventDefault();
                    break;
                /* Spell 6 */
                case "6":
                case "-":
                    window.gui.shortcutBar._panels.spell.slotList[6].tap();
                    event.preventDefault();
                    break;
                /* Spell 7 */
                case "7":
                case "È":
                    window.gui.shortcutBar._panels.spell.slotList[7].tap();
                    event.preventDefault();
                    break;
                /* Spell 8 */
                case "8":
                case "_":
                    window.gui.shortcutBar._panels.spell.slotList[8].tap();
                    event.preventDefault();
                    break;
                /* Spell 9 */
                case "9":
                case "Ç":
                    window.gui.shortcutBar._panels.spell.slotList[9].tap();
                    event.preventDefault();
                    break;
                /* Fight ready/finish turn */
                case " ":
                    switch (window.gui.fightManager.fightState) {
                        case window.gui.fightManager.FIGHT_STATES.PREPARATION:
                            window.gui.timeline.infoAndFighters._childrenList.last()._childrenList.last()._fightReadyBtn.tap();
                            break;
                        case window.gui.fightManager.FIGHT_STATES.BATTLE:
                            window.gui.fightManager.finishTurn();
                            break;
                    }
                    break;
            }
        }
    });

    window.gui.playerData.on("characterSelectedSuccess", () => {
        isOnline = true;
        $(document).find(".shopBtn.Button").parent().hide();
        document.title = window.gui.playerData.characterBaseInformations.name;
    });

    window.gui.on("disconnect", () => {
        isOnline = false;
        document.title = "DofusTouchEmu";
    });

    window.gui.on("FriendUpdateMessage", (data) => {
        sendNotification(data.friendUpdated.playerName + " (" + data.friendUpdated.accountName + ") vient de se connecter.");
    });

    window.gui.on("ExchangeRequestedTradeMessage", (data) => {
        if (window.gui.playerData.id != data.source) {
            sendNotification(window.actorManager.actors[data.source].data.name + " vient de vous proposez un échange.");
        }
    });

    window.gui.on("GameRolePlayPlayerFightFriendlyRequestedMessage", (data) => {
        if (window.gui.playerData.id != data.sourceId) {
            sendNotification(window.actorManager.actors[data.sourceId].data.name + " vient de vous proposez un défi.");
        }
    });

    window.gui.on("GameRolePlayArenaFightPropositionMessage", () => {
        sendNotification("Un kolizéum vient d'être trouvé.");
    });

    window.gui.on("PartyInvitationMessage", () => {
        sendNotification("Vous venez de recevoir une invitation de groupe.");
    });
})();
