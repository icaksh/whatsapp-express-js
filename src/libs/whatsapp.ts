import { WAConnection, MessageType } from '@adiwajshing/baileys'
import fs from 'fs'

const conn = new WAConnection();

export const authWA = async() =>{
    if (fs.existsSync(__dirname + "/../data/cache.json")){
        conn.loadAuthInfo(__dirname + "/../data/cache.json")
    }
    conn.connect().then(() =>{
        fs.writeFileSync(__dirname + "/../data/cache.json", JSON.stringify(conn.base64EncodedAuthInfo()))
        conn.removeAllListeners()
        console.log ("[OK] Authenticated")
    })
    .catch(e => {
        console.log(e);
        if(fs.existsSync(__dirname + "/../data/cache.json")){
            fs.unlinkSync(__dirname + "/../data/cache.json")
        }
        console.log("[ERROR] Failed to Authenticated")
        conn.clearAuthInfo()
        authWA()
    })
}

export const sendMessage = async (phoneNumber: string, messageSend: string) => 
{
    let success = false
    await conn.sendMessage(phoneNumber + "@s.whatsapp.net", `${messageSend}`, MessageType.text)
        .then((WebMmessageInfo) => {
            conn.modifyChat(phoneNumber + "@s.whatsapp.net", 'delete')
            success = true
        }).catch(e => {
            console.log(e)
        })
    return success
}