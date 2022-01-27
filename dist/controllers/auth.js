"use strict";
// import { Request, Response } from "express";
// import { WAConnection } from "@adiwajshing/baileys";
// import  QRCode  from "qrcode";
// import fs from 'fs';
// const conn = new WAConnection();
// export const QR = async(req:Request, res:Response) =>{
//     conn.on("connecting", ()=>{
//         conn.on("qr", (qr) => {
//             return res.status(200).json({
//                 success: true,
//                 message: qr,
//             })
//         })
//     })
// }
// export const Auth = async() =>{
//     if (fs.existsSync(__dirname + "/../data/cache.json")){
//         conn.loadAuthInfo(__dirname + "/../data/cache.json")
//     }
//     conn.connect().then(() =>{
//         fs.writeFileSync(__dirname + "/../data/cache.json", JSON.stringify(conn.base64EncodedAuthInfo()))
//         console.log ("[OK] Authenticated")
//     })
//     .catch(e => {
//         console.log(e);
//         if(fs.existsSync(__dirname + "/../data/cache.json")){
//             fs.unlinkSync(__dirname + "/../data/cache.json")
//         }
//         console.log("[ERROR] Failed to Authenticated")
//         conn.clearAuthInfo()
//         Auth()
//     })
// }
