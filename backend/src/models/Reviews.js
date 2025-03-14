/*
    Reviews
        Comment
        Rating
        idCient
*/

import { Schema, model } from "mongoose";

const reviewsSchema = new Schema({
    comment: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true,
        max: 5
    },
    idClient: {
        type: Schema.Types.ObjectId,
        ref: "Clients",
        require: true
    }
},
{
    timeStamps: true,
    strict: false
}
);

export default model("Reviews", reviewsSchema );