import { Schema, model } from "mongoose";
import User from "./User";

const ApplicantSchema = User.discriminator(
    "Applicant",
    new Schema({
        education: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                    maxlength: [500, "Name can not exceed 500 characters!"],
                },
                start_year: {
                    type: Date,
                    required: true,
                },
                end_year: {
                    type: Date,
                },
            },
        ],
        skills: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Language",
            },
        ],
        rating: {
            type: Number,
            required: true,
            min: 0,
        },
        // resume: {},
        // img: {},
    })
);

export default model("Applicant", ApplicantSchema);
