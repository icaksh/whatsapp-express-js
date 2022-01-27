"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.authWA = void 0;
const baileys_1 = require("@adiwajshing/baileys");
const fs_1 = __importDefault(require("fs"));
const conn = new baileys_1.WAConnection();
const authWA = () => __awaiter(void 0, void 0, void 0, function* () {
    if (fs_1.default.existsSync(__dirname + "/../data/cache.json")) {
        conn.loadAuthInfo(__dirname + "/../data/cache.json");
    }
    conn.connect().then(() => {
        fs_1.default.writeFileSync(__dirname + "/../data/cache.json", JSON.stringify(conn.base64EncodedAuthInfo()));
        conn.removeAllListeners();
        console.log("[OK] Authenticated");
    })
        .catch(e => {
        console.log(e);
        if (fs_1.default.existsSync(__dirname + "/../data/cache.json")) {
            fs_1.default.unlinkSync(__dirname + "/../data/cache.json");
        }
        console.log("[ERROR] Failed to Authenticated");
        conn.clearAuthInfo();
        (0, exports.authWA)();
    });
});
exports.authWA = authWA;
const sendMessage = (phoneNumber, messageSend) => __awaiter(void 0, void 0, void 0, function* () {
    let success = false;
    yield conn.sendMessage(phoneNumber + "@s.whatsapp.net", `${messageSend}`, baileys_1.MessageType.text)
        .then((WebMmessageInfo) => {
        conn.modifyChat(phoneNumber + "@s.whatsapp.net", 'delete');
        success = true;
    }).catch(e => {
        console.log(e);
    });
    return success;
});
exports.sendMessage = sendMessage;
