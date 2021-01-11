import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI;

app.use(express.json());

mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

app.get("/", (req, res) => res.send("helo"));

app.listen(port, () => console.log(`Started server on port ${port}.`));
mongoose.connection.once("open", () => console.log("Connected to MongoDB."));
