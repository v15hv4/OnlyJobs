import { Router } from "express";
import Language from "../models/Language";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const languages = await Language.find(req.query);
        res.status(200).json(languages);
    } catch (e) {
        res.json(e);
    }
});

router.post("/new", async (req, res) => {
    try {
        const { name } = req.body;
        const newLanguage = new Language({ name });
        const language = await newLanguage.save();
        res.status(200).json(language);
    } catch (e) {
        res.json(e);
    }
});

export default router;
