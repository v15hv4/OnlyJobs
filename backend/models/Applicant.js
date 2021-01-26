import { Schema } from "mongoose";
import User from "./User";

const ApplicantSchema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: "Language",
        },
    ],
    ratings: [
        {
            value: {
                type: Number,
                required: true,
                min: 0,
            },
            recruiter: {
                type: Schema.Types.ObjectId,
                ref: "Recruiter",
            },
        },
    ],
    // resume: {},
    // img: {},
});

export default User.discriminator("Applicant", ApplicantSchema);
