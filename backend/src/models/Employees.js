/*
    Empleados
  name
  lastName
  birthday 
  email
  address
  hireDate 
  password
  telephone
  dui
  isssNumber
  isVerified (esto es booleano)
*/

import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true
    },
    birthday: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      match: [/^\S+@\S+\.\S+$/],
      unique: true
    },
    address: {
      type: String,
      require: true
    },
    hireDate: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true,
      minLength: 8
    },
    telephone: {
      type: String,
      require: false,
      match: [/^[0-9]{8}$/,
        "el telefono debe contener exacatemente 8 digitos"
      ]
    },
    isssNumber: {
      type: String,
      require: true,
      match: [/^[0-9]{8}$/,
        "el telefono debe contener exacatemente 8 digitos"
      ]
    },
    dui:{
      type: String,
      require: true,
      minLength: 10
    },
    isVerified: {
      type: Boolean,
      require: true
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Employees", employeesSchema);
