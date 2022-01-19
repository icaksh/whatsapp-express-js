"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WAConnection_1 = __importStar(require("./WAConnection"));
const config_json_1 = __importDefault(require("./config.json"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const app = (0, express_1.default)();
const port = 3001;
(0, WAConnection_1.authWA)();
app.get('/send', (req, res) => {
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
        params.message = crypto_js_1.default.AES.decrypt(params.message, params.passphrase).toString(crypto_js_1.default.enc.Utf8);
        params.phoneNumber = crypto_js_1.default.AES.decrypt(params.phoneNumber, params.passphrase).toString(crypto_js_1.default.enc.Utf8);
    }
    if (params.apiKey == config_json_1.default.apiKey) {
        (0, WAConnection_1.default)(params.phoneNumber, decodeURIComponent(params.message));
        return res.status(200).json({
            success: true,
            message: "message sended successfully",
        });
    }
    else {
        res.send('API Key not defined');
    }
});
app.listen(port, function () {
    console.log(`App is listening on port ${port} !`);
});
