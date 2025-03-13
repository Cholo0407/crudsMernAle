//Array de metodos (C R U D)
const employeesController = {};
import employeesModel from "../models/Employees.js";

// SELECT
employeesController.getEmployees = async (req, res) => {
  const employees = await employeesModel.find();
  res.json(employees);
};

// INSERT
employeesController.createEmployees = async (req, res) => {
  const { name, lastName, birthday, email,address,hireDate, password,telephone,dui,isssNumber ,isVerified } = req.body;
  const newProduct = new employeesModel({ name, lastName, birthday, email,address,hireDate, password,telephone,dui,isssNumber ,isVerified });
  await newProduct.save();
  res.json({ message: "Emplooye Saved Succesfully :)" });
};

// DELETE
employeesController.deleteEmployees = async (req, res) => {
  const deletedProduct = await employeesModel.findByIdAndDelete(req.params.id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "Employees Not Found :(" });
  }
  res.json({ message: "Employee Deleted!" });
};

// UPDATE
employeesController.updateEmployees = async (req, res) => {
  // Solicito todos los valores
  const { name, lastName, birthday, email, password,telephone,dui ,isVerified } = req.body;
  // Actualizo
  await employeesModel.findByIdAndUpdate(
    req.params.id,
    {
      name, lastName, birthday, email, password,telephone,dui ,isVerified,
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Employee Updated!" });
};

export default employeesController;
