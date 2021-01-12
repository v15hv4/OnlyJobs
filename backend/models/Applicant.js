import { Schema } from "mongoose";
import User from "./User";

import { in_future } from "./validators";

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
                    validator: (v) => in_future(v.start_year, v.end_year),
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
    rating: {
        value: {
            type: Number,
            required: true,
            min: 0,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    // resume: {},
    // img: {},
});

export default User.discriminator("Applicant", ApplicantSchema);
