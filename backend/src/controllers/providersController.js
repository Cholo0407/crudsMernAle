import providerModel from '../models/providers.js';

import { v2 as cloudinary} from 'cloudinary'
import { config } from '../config.js'

//1- configurar cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.API_key, 
    api_secret: config.cloudinary.API_secret,
})

//array de funcionas vacias
const providersController = {};

//SELECT
providersController.getProviders = async (req, res)=> {
    const providers = await providerModel.find();
    res.json(providers);
}

//INSERT
providersController.insertProviders = async (req, res)=> {
    const {name, telephone} = req.body;
    let imageURL = ""

    //subir imagen a Cloudinary
    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "jpeg"]
            }
        )
        //Guardar en la variable 
        imageURL = result.secure_url
    }

    //Guardar todo en la base de datos
    const newProvider = new providerModel({name, telephone, imageURL})
    newProvider.save()

    res.json({ message: "Provider saved"})
}

export default providersController;
