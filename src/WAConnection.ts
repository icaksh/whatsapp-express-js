import { WAConnection, MessageType } from '@adiwajshing/baileys'
import fs from 'fs'

const conn = new WAConnection();

export const authWA = async() =>{
    if (fs.existsSync("./data/cache.json")){
        conn.loadAuthInfo("./data/cache.json")
    }
    conn.connect().then(() =>{
        fs.writeFileSync("./data/cache.json", JSON.stringify(conn.base64EncodedAuthInfo()))
        console.log ("[OK] Authenticated")
    })
    .catch(e => {
        if(fs.existsSync("./data/cache.json")){
            fs.unlinkSync("./data/cache.json")
        }
        console.log("[ERROR] Failed to Authenticated")
        conn.clearAuthInfo()
        authWA()
    })
}

export default function sendMessage(phoneNumber: string, messageSend: string){
    conn.sendMessage(phoneNumber + "@s.whatsapp.net", `${messageSend}`, MessageType.text)
    console.log("Pesan berhasil dikirimkan")
}