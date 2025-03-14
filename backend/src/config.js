//importo la librerira dotenv
import dotenv from "dotenv";

//ejecuto "Dotenv"
//me ayudara a acceder al .env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI || "mongodb://localhost:27017/ZonaDigitalDB20170508", 
    },
    server: {
        port: process.env.PORT || 4000,
    }
}