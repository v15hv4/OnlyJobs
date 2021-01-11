import { Schema, model } from "mongoose";

const LanguageSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, "Language name can not exceed 100 characters"],
    },
});

export default model("Language", LanguageSchema);
