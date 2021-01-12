import { Schema } from "mongoose";
import { phone_number, word_limit } from "./validators";
import User from "./User";

const RecruiterSchema = new Schema({
    contact: {
        type: String,
        required: true,
        validate: {
            validator: (v) => phone_number(v),
            message: "Invalid phone number!",
        },
    },
    bio: {
        type: String,
        required: true,
        validate: {
            validator: (v) => word_limit(v, 250),
            message: "Bio may not exceed 250 words!",
        },
    },
});

export default User.discriminator("Recruiter", RecruiterSchema);
