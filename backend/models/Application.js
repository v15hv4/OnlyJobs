import { Schema, model } from "mongoose";
import { word_limit } from "./validators";

const ApplicationSchema = new Schema({
    applicant: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Applicant",
    },
    job: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Job",
    },
    SOP: {
        type: String,
        required: true,
        validate: {
            validator: (v) => word_limit(v, 250),
            message: "SOP can not exceed 250 words!",
        },
    },
    state: {
        type: String,
        required: true,
        trim: true,
        enum: ["applied", "shortlisted", "accepted", "rejected", "deleted"],
        default: "applied",
    },
});

export default model("Application", ApplicationSchema);
