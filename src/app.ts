import express, { Application, Request, Response } from 'express'
import sendMessage, { authWA } from './WAConnection'
import config from './config.json'
import CryptoJS from 'crypto-js'

const app: Application = express()
const port: number = 3001
authWA();

app.get('/send', (req: Request, res: Response) => {
    const params = {
        apiKey : req.query.apiKey,
        phoneNumber : req.query.phoneNumber as string,
        message: req.query.message as string,
        encoded: req.query.encoded,
        passphrase: req.query.passphrase as string
    }
    let missingArgs: string[] = []
    for (const [key, value] of Object.entries(params)) {
        var skip = ["encoded", "passphrase"]
        if(!skip.includes(key))
            if(value === undefined)
                missingArgs.push(key)
    }

    if(params.encoded === 'true'){
        if(params.passphrase === '')
            missingArgs.push("passphrase")
    }
        
    if(missingArgs.length !=0)
        return res.status(403).json({
            success: false,
            message: missingArgs + " not passed",
        })
    
    if(params.encoded === 'true'){
        params.message = CryptoJS.AES.decrypt(params.message, params.passphrase).toString(CryptoJS.enc.Utf8)
        params.phoneNumber = CryptoJS.AES.decrypt(params.phoneNumber, params.passphrase).toString(CryptoJS.enc.Utf8)
    }
    
    if(params.apiKey == config.apiKey){
        sendMessage(params.phoneNumber, decodeURIComponent(params.message))
        return res.status(200).json({
            success: true,
            message: "message sended successfully",
        })
    }else{
        res.send('API Key not defined')
    }
    
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})