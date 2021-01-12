import { Schema, model } from "mongoose";
import { future_date } from "./validators";

const JobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, "Job title can not exceed 200 characters"],
    },
    recruiter: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Recruiter",
    },
    max_applications: {
        type: Number,
        required: true,
        min: 0,
    },
    max_positions: {
        type: Number,
        required: true,
        min: 0,
    },
    post_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    deadline: {
        type: Date,
        required: true,
        validate: {
            validator: (v) => future_date(new Date(), v),
            message: "Deadline can not be in the past!",
        },
    },
    skillset: [
        {
            type: Schema.Types.ObjectId,
            ref: "Language",
        },
    ],
    type: {
        type: String,
        required: true,
        trim: true,
        enum: ["full_time", "part_time", "work_from_home"],
    },
    duration: {
        type: Number,
        required: true,
        min: 0,
    },
    salary: {
        type: Number,
        required: true,
        min: 0,
    },
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
});

export default model("Job", JobSchema);
