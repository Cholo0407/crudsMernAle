//Array de metodos (C R U D)
const clientsController = {};
import clientsModel from "../models/Clients.js";

// SELECT
clientsController.getClients = async (req, res) => {
  const clients = await clientsModel.find();
  res.json(clients);
};

// INSERT
clientsController.createclients = async (req, res) => {
  const { name, lastName, birthday, email, password,telephone,dui ,isVerified } = req.body;
  const newProduct = new clientsModel({ name, lastName, birthday, email, password,telephone,dui ,isVerified });
  await newProduct.save();
  res.json({ message: "Client Saved Succesfully :)" });
};

// DELETE
clientsController.deleteclients = async (req, res) => {
  const deletedProduct = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "Client Not Found :(" });
  }
  res.json({ message: "Client Deleted!" });
};

// UPDATE
clientsController.updateclients = async (req, res) => {
  // Solicito todos los valores
  const { name, lastName, birthday, email, password,telephone,dui ,isVerified } = req.body;
  // Actualizo
  await clientsModel.findByIdAndUpdate(
    req.params.id,
    {
      name, lastName, birthday, email, password,telephone,dui ,isVerified,
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Client Updated!" });
};

export default clientsController;
