import { Schema, model } from "mongoose";
import { name, email } from "./validators";

const options = {
    discriminatorKey: "details",
};

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (v) => email(v),
                message: "Invalid email address!",
            },
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (v) => name(v),
                message: "Invalid name!",
            },
        },
    },
    options
);

export default model("User", UserSchema);
