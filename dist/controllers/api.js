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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Send = void 0;
const whatsapp_1 = require("../libs/whatsapp");
const config_1 = require("../config");
const Send = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = config_1.config.API_KEY;
    const params = {
        apiKey: req.query.apiKey,
        phoneNumber: req.query.phoneNumber,
        message: req.query.message,
        encoded: req.query.encoded,
        passphrase: req.query.passphrase
    };
    let missingArgs = [];
    for (const [key, value] of Object.entries(params)) {
        var skip = ["encoded", "passphrase"];
        if (!skip.includes(key))
            if (value === undefined)
                missingArgs.push(key);
    }
    if (params.encoded === 'true') {
        if (params.passphrase === '')
            missingArgs.push("passphrase");
    }
    if (missingArgs.length != 0)
        return res.status(403).json({
            success: false,
            message: missingArgs + " not passed",
        });
    if (params.encoded === 'true') {
        params.message = CryptoJS.AES.decrypt(params.message, params.passphrase).toString(CryptoJS.enc.Utf8);
        params.phoneNumber = CryptoJS.AES.decrypt(params.phoneNumber, params.passphrase).toString(CryptoJS.enc.Utf8);
    }
    if (params.apiKey == apiKey) {
        if (yield (0, whatsapp_1.sendMessage)(params.phoneNumber, decodeURIComponent(`${params.message}`))) {
            return res.status(200).json({
                success: true,
                message: "message sended successfully",
            });
        }
        else {
            return res.status(500).json({
                success: true,
                message: "cannot send message",
            });
        }
    }
    else {
        return res.status(403).json({
            success: false,
            message: "invalid api key",
        });
    }
});
exports.Send = Send;
