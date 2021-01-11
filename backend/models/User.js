import { Schema, model } from "mongoose";

const options = {
    discriminatorKey: "details",
};

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    options
);

export default model("User", UserSchema);
