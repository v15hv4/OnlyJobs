import { Schema } from "mongoose";
import { future_year } from "./validators";
import User from "./User";

const ApplicantSchema = new Schema({
    education: [
        {
            instance: {
                type: {
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
                validate: {
                    validator: (v) => future_year(v.start_year, v.end_year),
                    message: "End year can not be earlier than start year!",
                },
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
