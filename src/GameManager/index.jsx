class GameManager {
    constructor(window, tab, forceUpdate) {
        this.window = window;
        this.tab = tab;
        this.forceUpdate = forceUpdate;
        this.online = false;
        this.focused = true;
        this.playerName = null;
    }

    initializeDomListeners() {
        this.window.addEventListener("resize", () => {
            this.window.gui._resizeUi();
        });

        this.window.addEventListener("focus", () => {
            this.focused = true;
        });

        this.window.addEventListener("blur", () => {
            this.focused = false;
        });

        this.window.addEventListener("keydown", (event) => {
            if (this.online && event.srcElement == document.body && !event.metaKey) {
                this.handleKeyboardEvents(event.key);
            }
        });
    }

    initializeDofusListeners() {
        this.window.gui.on("disconnect", () => {
            this.online = false;
        });

        this.window.dofus.connectionManager.on("data", (data) => {
            switch (data._messageType) {
                case "CharacterSelectedSuccessMessage":
                    this.online = true;
                    this.playerName = this.tab.name = data.infos.name;
                    this.forceUpdate();
                    this.window.document.querySelector(".shopBtn.Button").parentNode.style.display = "none"; // wow such plain js
                    break;
                case "ChatServerMessage":
                    if (data.channel == 9) {
                        this.sendNotification("Message de " + data.senderName + " : " + data.content);
                    }
                    break;
                case "PartyInvitationMessage":
                    this.sendNotification(data.fromName + " vous invite à rejoindre son groupe.");
                    break;
                case "GameRolePlayArenaFightPropositionMessage":
                    this.sendNotification("Un kolizéum vient d'être trouvé !");
                    break;
                case "FriendUpdateMessage":
                    this.sendNotification(data.friendUpdated.playerName + " (" + data.friendUpdated.accountName + ") vient de se connecter.");
                    break;
                case "ExchangeRequestedTradeMessage":
                    this.sendNotification(this.window.actorManager.actors[data.source].data.name + " vient de vous proposer un échange.");
                    break;
                case "GameRolePlayPlayerFightFriendlyRequestedMessage":
                    this.sendNotification(this.window.actorManager.actors[data.sourceId].data.name + " vient de vous proposer un défi.");
                    break;
                case "GameFightTurnStartMessage":
                    if (this.window.gui.playerData.id == data.id) {
                        this.sendNotification("Votre tour commence.");
                    }
                    break;
            }
        });
    }

    handleKeyboardEvents(key) {
        switch (key.toUpperCase()) {
            /* Characteristic gui */
            case "C":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Carac").tap();
                event.preventDefault();
                break;
            /* Spell gui */
            case "S":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Spell").tap();
                event.preventDefault();
                break;
            /* Bag gui */
            case "I":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Bag").tap();
                event.preventDefault();
                break;
            /* BidHouse gui */
            case "H":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "BidHouse").tap();
                event.preventDefault();
                break;
            /* Friend gui */
            case "F":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Friend").tap();
                event.preventDefault();
                break;
            /* Book gui */
            case "Q":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Book").tap();
                event.preventDefault();
                break;
            /* Guild gui */
            case "G":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Guild").tap();
                event.preventDefault();
                break;
            /* Job gui */
            case "J":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Job").tap();
                event.preventDefault();
                break;
            /* Mount gui */
            case "D":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Mount").tap();
                event.preventDefault();
                break;
            /* Bestiary gui */
            case "B":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Bestiary").tap();
                event.preventDefault();
                break;
            /* Title gui */
            case "N":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Title").tap();
                event.preventDefault();
                break;
            /* Achievement gui */
            case "U":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Achievement").tap();
                event.preventDefault();
                break;
            /* Almanax gui */
            case "X":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Almanax").tap();
                event.preventDefault();
                break;
            /* Map gui */
            case "M":
                this.window.gui.menuBar._icons._childrenList.find((icon) => icon.id == "Map").tap();
                event.preventDefault();
                break;
            /* Spell 0 */
            case "0":
            case "À":
                this.window.gui.shortcutBar._panels.spell.slotList[0].tap();
                event.preventDefault();
                break;
            /* Spell 1 */
            case "1":
            case "&":
                this.window.gui.shortcutBar._panels.spell.slotList[1].tap();
                event.preventDefault();
                break;
            /* Spell 2 */
            case "2":
            case "É":
                this.window.gui.shortcutBar._panels.spell.slotList[2].tap();
                event.preventDefault();
                break;
            /* Spell 3 */
            case "3":
            case "\"":
                this.window.gui.shortcutBar._panels.spell.slotList[3].tap();
                event.preventDefault();
                break;
            /* Spell 4 */
            case "4":
            case "'":
                this.window.gui.shortcutBar._panels.spell.slotList[4].tap();
                event.preventDefault();
                break;
            /* Spell 5 */
            case "5":
            case "(":
                this.window.gui.shortcutBar._panels.spell.slotList[5].tap();
                event.preventDefault();
                break;
            /* Spell 6 */
            case "6":
            case "-":
                this.window.gui.shortcutBar._panels.spell.slotList[6].tap();
                event.preventDefault();
                break;
            /* Spell 7 */
            case "7":
            case "È":
                this.window.gui.shortcutBar._panels.spell.slotList[7].tap();
                event.preventDefault();
                break;
            /* Spell 8 */
            case "8":
            case "_":
                this.window.gui.shortcutBar._panels.spell.slotList[8].tap();
                event.preventDefault();
                break;
            /* Spell 9 */
            case "9":
            case "Ç":
                this.window.gui.shortcutBar._panels.spell.slotList[9].tap();
                event.preventDefault();
                break;
            /* Fight ready/finish turn */
            case " ":
                switch (this.window.gui.fightManager.fightState) {
                    case this.window.gui.fightManager.FIGHT_STATES.PREPARATION:
                        this.window.gui.timeline.infoAndFighters._childrenList.last()._childrenList.last()._fightReadyBtn.tap();
                        break;
                    case this.window.gui.fightManager.FIGHT_STATES.BATTLE:
                        this.window.gui.fightManager.finishTurn();
                        break;
                }
                break;
            case "ENTER":
                this.window.gui.chat.activate();
                break;
        }
    }

    sendNotification(body) {
        if (document.hidden || !this.focused) {
            new Notification(window.gui.playerData.characterBaseInformations.name, {
                body: body
            });
        }
    }
}

export default GameManager;
