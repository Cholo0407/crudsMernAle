//importo la librerira dotenv
import dotenv from "dotenv";

//ejecuto "Dotenv"
//me ayudara a acceder al .env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI, 
    },
    server: {
        port: process.env.PORT,
    },
    JWT: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES,
    },
    ADMIN:{
        emailAdmin: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
    }
}