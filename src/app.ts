import express, { application, Application, Request, Response, Router } from 'express'
import router from './routes/routes'
import { authWA } from './libs/whatsapp'

const app: Application = express()
authWA();

app.use(router)
app.listen(process.env.PORT, function () {
    console.log(`App is listening on port ${process.env.PORT} !`)
})