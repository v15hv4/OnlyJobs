import express from "express";
const app = express();

app.get("/", (req, res) => res.send("helo"));

app.listen(process.env.PORT || 5000, () => console.log("Running..."));
