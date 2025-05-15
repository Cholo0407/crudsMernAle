/*
    name
    telephone
    image
*/

import { Schema, model } from "mongoose";

const providerSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    telephone: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("providers", providerSchema);
