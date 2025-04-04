import jsonWebToken from "jsonwebtoken" // Token
import bcrypt from "bcryptjs" // Encriptar
import nodemailer from "nodemailer" // Enviar Correo
import crypto from "crypto" // Generar codigo

import clientsModel from "../models/Clients.js"
import { config } from "../config.js"

const registerClientsController = {};

registerClientsController.registerClient = async (req, res) =>{

    //1- Pedimos las cosas que vamos a guardar
    const {name, 
        lastName, 
        birthday, 
        email, 
        password, 
        telephone, 
        dui, 
        isVerified 
    } = req.body;

    try {
        //verificar si el cliente ya existe
        const existClient = await clientsModel.findOne({email})
        if(existClient){
            return res.json({message: "Client already exists"})
        }

        //Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10)

        //Guardamos en la base de datos
        const newClient = new clientsModel({
            name, 
            lastName, 
            birthday, 
            email, 
            password: passwordHash, 
            telephone, 
            dui: dui || null, 
            isVerified: isVerified || false,
        })

        await newClient.save()

        //Generar codigo de verificacion
        const verificationCode = crypto.randomBytes(3).toString("hex")
        const expiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 horas

        //TOKEN
        const tokenCode = jsonWebToken.sign({
            //1. que vamos a guardar?
            email, verificationCode, expiresAt},
            //2. secret
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            //4. arrow function
            (error, token) => {
                if(error) console.log("error "+error);
                res.cookie("verificationToken", token, { maxAge: 2 * 60 * 60 * 1000 })
            }
        )

        //Enviar Correo
        //1- transporter: Desde donde lo estoy enviando
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.USER.email,
                pass: config.USER.password
            }
        })

        //2- Options: a quien se lo voy enviar?
        const mailOptions = {
            from: config.USER.email,
            to: email,
            subject: "Verificación de correo electronico",
            text: `Para verificar que eres dueño de la cuenta, utiliza este codigo: ${verificationCode}\n Este codigo expira en dos horas\n`
        }

        //3- Envio del correo
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error) console.log("error en el envio "+error)
            console.log("Email sent")
        })

        res.json({message: "Customer registered. Please verify your email"})


    } catch (error) {
        res.json({message: "error "+error})
    }

}

registerClientsController.verifyCodeEmail = async (req, res) =>{
    const { verificationCode } = req.body;
    //Accedemos al token "verification token"
    //ya que este contiene, el email, el codigo de verificacion y cuando se expira
    const token = req.cookie.verificationToken;
    if(!token){
        return res.json({message: "Please register before trying"})
    }

    try {
        //Verificar y decodificar el token
        //para obtener el email y codigo de verificacion que acabamos de registrar
        const decoded = jsonWebToken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;

        //comparar el codigo recibido con el almacenado en el token
        if(verificationCode !== storedCode){
            return res.json({message: "Invalidad verification code"})
        }

        //buscar al cliente
        const client = await clientsModel.findOne({email})
        if(!client){
            return res.json({message: "Client not found"})
        }

        //A ese cliente le cambio el campo "isVerified" a true
       client.isVerified = true,
       await client.save();
       
       //quitar el token on el email, codigo de verificacion y cuando expira
       res.clearCookie("verificationToken")

       res.json({message: "Email verified succesfully"})

    } catch (error) {
        res.json({message: "error "+error})
    }
}

export default registerClientsController;