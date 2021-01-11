import { Schema, model } from "mongoose";
import User from "./User";

const RecruiterSchema = User.discriminator(
    "Recruiter",
    new Schema({
        contact: {
            type: Number,
            required: true,
            min: 0,
        },
        bio: {
            type: String,
            required: true,
            validate: {
                validator: (v) => v.split(" ").length <= 250,
                message: "Bio can not exceed 250 words!",
            },
        },
    })
);

export default model("Recruiter", RecruiterSchema);
