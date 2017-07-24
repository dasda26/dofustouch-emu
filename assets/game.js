/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 187);
/******/ })
/************************************************************************/
/******/ ({

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _GameManager = __webpack_require__(188);

var _GameManager2 = _interopRequireDefault(_GameManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
    var manager = window.gameManager = new _GameManager2.default();
    manager.initializeDomListeners();
    manager.initializeDofusListeners();
});

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameManager = function () {
    function GameManager() {
        _classCallCheck(this, GameManager);

        this.online = false;
        this.focused = true;
        this.playerName = null;
    }

    _createClass(GameManager, [{
        key: "initializeDomListeners",
        value: function initializeDomListeners() {
            var _this = this;

            window.addEventListener("resize", function () {
                window.gui._resizeUi();
            });

            window.addEventListener("focus", function () {
                _this.focused = true;
            });
            window.addEventListener("blur", function () {
                _this.focused = false;
            });

            window.addEventListener("keydown", function (event) {
                if (_this.online && event.srcElement == document.body && !event.metaKey) {
                    _this.handleKeyboardEvents(event.key);
                }
            });
        }
    }, {
        key: "initializeDofusListeners",
        value: function initializeDofusListeners() {
            var _this2 = this;

            window.gui.on("disconnect", function () {
                _this2.online = false;
            });

            window.dofus.connectionManager.on("data", function (data) {
                switch (data._messageType) {
                    case "CharacterSelectedSuccessMessage":
                        _this2.online = true;
                        _this2.playerName = data.infos.name;
                        //document.querySelector(".shopBtn.Button").parent().hide();
                        break;
                    case "ChatServerMessage":
                        if (data.channel == 9) {
                            _this2.sendNotification("Message de " + data.senderName + " : " + data.content);
                        }
                        break;
                    case "PartyInvitationMessage":
                        _this2.sendNotification(data.fromName + " vous invite à rejoindre son groupe.");
                        break;
                    case "GameRolePlayArenaFightPropositionMessage":
                        _this2.sendNotification("Un kolizéum vient d'être trouvé !");
                        break;
                    case "FriendUpdateMessage":
                        _this2.sendNotification(data.friendUpdated.playerName + " (" + data.friendUpdated.accountName + ") vient de se connecter.");
                        break;
                    case "ExchangeRequestedTradeMessage":
                        _this2.sendNotification(window.actorManager.actors[data.source].data.name + " vient de vous proposer un échange.");
                        break;
                    case "GameRolePlayPlayerFightFriendlyRequestedMessage":
                        _this2.sendNotification(window.actorManager.actors[data.sourceId].data.name + " vient de vous proposer un défi.");
                        break;
                    case "GameFightTurnStartMessage":
                        if (window.gui.playerData.id == data.id) {
                            _this2.sendNotification("Votre tour commence.");
                        }
                        break;
                }
            });
        }
    }, {
        key: "handleKeyboardEvents",
        value: function handleKeyboardEvents(key) {
            switch (key.toUpperCase()) {
                /* Characteristic gui */
                case "C":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Carac";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Spell gui */
                case "S":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Spell";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Bag gui */
                case "I":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Bag";
                    }).tap();
                    event.preventDefault();
                    break;
                /* BidHouse gui */
                case "H":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "BidHouse";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Friend gui */
                case "F":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Friend";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Book gui */
                case "Q":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Book";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Guild gui */
                case "G":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Guild";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Job gui */
                case "J":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Job";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Mount gui */
                case "D":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Mount";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Bestiary gui */
                case "B":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Bestiary";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Title gui */
                case "N":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Title";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Achievement gui */
                case "U":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Achievement";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Almanax gui */
                case "X":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Almanax";
                    }).tap();
                    event.preventDefault();
                    break;
                /* Map gui */
                case "M":
                    window.gui.menuBar._icons._childrenList.find(function (icon) {
                        return icon.id == "Map";
                    }).tap();
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
                case "ENTER":
                    window.gui.chat.activate();
                    break;
            }
        }
    }, {
        key: "sendNotification",
        value: function sendNotification(body) {
            if (document.hidden || !this.focused) {
                new Notification(window.gui.playerData.characterBaseInformations.name, {
                    body: body
                });
            }
        }
    }]);

    return GameManager;
}();

exports.default = GameManager;

/***/ })

/******/ });