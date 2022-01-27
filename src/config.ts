import dotenv from "dotenv";

dotenv.config()

export const config = {
    "API_KEY": process.env.API_KEY,
    "PORT" : process.env.PORT
}