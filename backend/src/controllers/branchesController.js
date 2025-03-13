//Array de metodos (C R U D)
const branchesController = {};
import branchesModel from "../models/Branches.js";

// SELECT
branchesController.getBranches = async (req, res) => {
  const clients = await branchesModel.find();
  res.json(clients);
};

// INSERT
branchesController.createBranches = async (req, res) => {
  const { name, addres, telephone, schedule } = req.body;
  const newProduct = new branchesModel({ name, addres, telephone, schedule });
  await newProduct.save();
  res.json({ message: "Branch Saved Succesfully :)" });
};

// DELETE
branchesController.deleteBranches = async (req, res) => {
  const deletedProduct = await branchesModel.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "Branch Not Found :(" });
  }
  res.json({ message: "Branch Deleted!" });
};

// UPDATE
branchesController.updateBranches = async (req, res) => {
  // Solicito todos los valores
  const { name, addres, telephone, schedule } = req.body;
  // Actualizo
  await branchesModel.findByIdAndUpdate(
    req.params.id,
    {
        name, addres, telephone, schedule
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Branch Updated!" });
};

export default branchesController;
