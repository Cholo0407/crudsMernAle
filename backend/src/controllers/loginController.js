import employeesModel from "../models/Employees.js";
import customersModel from "../models/Clients.js";

import bcryptjs from "bcryptjs";
import jsonWebToken from "jsonwebtoken";

import { config } from "../config.js"

const loginController = {};

loginController.login = async(req, res) => {
    //peidmos los datos
    const {email, password} = req.body;

    try {
        //validar los 3 posibles niveles
        //1. admin, 2. empleado, 3. cliente
        
        let userFound; //Guardar el usuario encontrado
        let userType; //Guardar el tipo de usario encontrado
        
        //1. Admin
        if(email === config.ADMIN.emailAdmin && password === config.ADMIN.password){
            userType = "admin";
            userFound = {_id: "admin"}
        }else {
            //2. empleado
            userFound = await employeesModel.findOne({email})
            userType = "employee"
            if(!userFound){
                //3. cliente
                userFound = await customersModel.findOne({email})
                userType = "customer"
            }
        }

        //si no se encuentra nada
        if(!userFound){
            return res.json({message: "User not found"})
        }

        //Validar contraseña
        if(userType !== "admin"){
            const isMatch = await bcryptjs.compare(password, userFound.password)
            if (!isMatch){
                return res.json({message: "Invalid password "})
            }
        }

        //Token para validad el inicio de sesion
        jsonWebToken.sign(
            {id: userFound._id, userType},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            
            (error, token)=>{
                if(error) console.log("error "+error)
                    res.cookie("authCookie", token);
                    res.json({message: "Login successful: "+ userType})
            }
        )
        
    } catch (error) {
        console.log("error "+error)
        res.json({message: "Error Loging in"})
    }
}

export default loginController;
