"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const whatsapp_1 = require("./libs/whatsapp");
const app = (0, express_1.default)();
(0, whatsapp_1.authWA)();
app.use(routes_1.default);
app.listen(process.env.PORT, function () {
    console.log(`App is listening on port ${process.env.PORT} !`);
});
