/*
    Clientes
  name
  lastName
  birthday
  email
  password
  telephone
  dui
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

export default model("Clients", clientsSchema);
