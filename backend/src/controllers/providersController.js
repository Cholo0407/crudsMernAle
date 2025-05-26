import providerModel from '../models/providers.js';
import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config.js';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.API_key,
  api_secret: config.cloudinary.API_secret,
});

const providersController = {};

// Obtener todos los proveedores
providersController.getProviders = async (req, res) => {
  try {
    const providers = await providerModel.find();
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proveedores" });
  }
};

// Insertar un nuevo proveedor
providersController.insertProviders = async (req, res) => {
  try {
    const { name, telephone } = req.body;
    let image = "";

    // Subir imagen a Cloudinary si existe
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["png", "jpg", "jpeg"],
      });
      image = result.secure_url;
    }

    const newProvider = new providerModel({ name, telephone, image });
    await newProvider.save();

    res.json({ message: "Proveedor guardado" });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar proveedor" });
  }
};

// Eliminar proveedor por ID
providersController.deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await providerModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json({ message: "Proveedor eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar proveedor" });
  }
};


export default providersController;
