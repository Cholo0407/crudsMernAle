//importar modelo
import employeeModel from "../models/Employees.js"
import bcryptjs from "bcryptjs"; //encriptar
import jsonwebtoken from "jsonwebtoken"; // generar token
import { config } from "../config.js";

//crear un array de funciones
const RegisterEmployeeController = {};

RegisterEmployeeController.register = async(req, res)=> {
    //pedir todos los datos
    const {name,
        lastName,
        birthday,
        email,
        address,
        hireDate, 
        password,
        telephone,
        dui,
        isssNumber,
        isVerified,
    } = req.body;

    try{
        // 1- verificamos si el empleado ya existe
        const existEmployee = await employeeModel.findOne({email})
        if(existEmployee){
            return res.json({message: "Employee already exists"})
        }

        // 2- Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        // 3- Guardar todo en la tabla empleados
        const newEmployee = new employeeModel({name,
            lastName,
            birthday,
            email,
            address,
            hireDate, 
            password: passwordHash,
            telephone,
            dui,
            isssNumber,
            isVerified,
        })

        await newEmployee.save()


        // TOKEN
        jsonwebtoken.sign(
            // 1- que voy a guardar
            {id: newEmployee._id},
            //2- secreto
            config.JWT.secret,
            //3- tiempo de expiracion
            {expiresIn: config.JWT.expiresIn},
            //4- funcion flecha
            (error, token) =>{
                if(error) console.log("error "+ error);

                res.cookie("authToken", token);
                res.json({message: "empleado guardado"})
            }
        )

    } catch(error){
        console.log("error "+error)
        res.json({message: "Error saving employee"})
    }
}

export default RegisterEmployeeController;
