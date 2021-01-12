import { Schema } from "mongoose";
import User from "./User";

const RecruiterSchema = new Schema({
    contact: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
        validate: {
            validator: (v) => v.split(" ").length <= 250,
            message: "Bio can not exceed 250 words!",
        },
    },
});

export default User.discriminator("Recruiter", RecruiterSchema);
