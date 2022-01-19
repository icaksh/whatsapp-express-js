# WhatsApp Express API
WhatsApp API to send your message easily based on Express

# Features
- Send text message

# To Do
- Fix string escape char
- Send image
- Send document
- Remove message after message sended (for privacy)
- QR Code via HTTP

# Getting Started

## System Requirements
1. Node.js v12
2. Minimum 512MB RAM and 1 vCPU
3. A number phone

# How to Install

## Deploying

Clone this Repository
```
git clone https://github.com/icaksh/whatsapp-express-api
```

Edit what you need to edit (API) in `src/config.json`

Install the dependencies
```
npm install
```

# Usage
1. Start NodeJS
```
npm run start
```

2. Scan QR code with your app

3. Info 

  Send GET Request

  `GET /send?apiKey=yourApiKey&phoneNumber=phone&message=message`

  If you want to encrypt, use CryptoJS and set param `encoded=true`
  ```
  var phoneNumber = "6281234567890"
  var message = "Message"
  var passphrase = "Enter Passphrase"

  var phone = CryptoJS.AES.encrypt(phoneNumber, passphrase).toString()
  var message = CryptoJS.AES.encrypt(phoneNumber, passphrase).toString()
  ```

  `GET /send?apiKey=yourApiKey&phoneNumber=phone&message=message&encoded=true&passphrase=passphrase`
# Additional Information
## Donate
This bot is 100% free, but if you want to give me a little coffee:
- [`Trakteer`](https://trakteer.id/Icaksh)


## Depedencies
- [`Baileys`](https://github.com/adiwajshing/Baileys)

## License
Copyright (c) 2022 Palguno Wicaksono

The copyright holders grant the freedom to copy, modify, convey, adapt, and/or redistribute this work under the terms of the Massachusetts Institute of Technology License.
A copy of that license is available at [`LICENSE`](https://github.com/icaksh/whatsapp-express-api/blob/master/LICENSE)