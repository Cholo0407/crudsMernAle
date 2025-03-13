/*
    Empleados
  name
  lastName
  birthday (esto es de tipo Date o lo puden poner como String)
  email
  address
  hireDate (esto es de tipo Date o lo puden poner como String)
  password
  telephone
  dui
  isssNumber
  isVerified (esto es booleano)
*/

import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
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
      minLength: 8
    },
    isssNumber: {
      type: String,
      require: true,
      match: [0-9],
      minLength: 9
    },
    dui:{
      type: String,
      require: true,
      match:[0-9],
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

export default model("Employees", clientsSchema);
