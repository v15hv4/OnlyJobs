import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// routers {{{
import authRouter from "./routes/auth";
import applicantRouter from "./routes/applicants";
import applicationRouter from "./routes/applications";
import jobRouter from "./routes/jobs";
import languageRouter from "./routes/languages";
import recruiterRouter from "./routes/recruiters";
// }}}

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI;

// middleware {{{
app.use(express.json());
app.use(cookieParser());
// }}}

// routes {{{
app.use("/api/auth", authRouter);
app.use("/api/applicants", applicantRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/languages", languageRouter);
app.use("/api/recruiters", recruiterRouter);
// }}}

mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

app.get("/", (_req, res) => res.send("helo"));

app.listen(port, () => console.log(`Started server on port ${port}.`));
mongoose.connection.once("open", () => console.log("Connected to MongoDB."));
