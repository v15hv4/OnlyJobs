import { Router } from "express";
import Language from "../models/Language";

const router = Router();

// retrieve languages
router.get("/", async (req, res) => {
    try {
        const languages = await Language.find(req.query);
        return res.status(200).json(languages);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// add a new language
router.post("/new", async (req, res) => {
    try {
        const newLanguage = new Language({
            name: req.body.name,
        });
        const language = await newLanguage.save();
        return res.status(200).json(language);
    } catch (e) {
        return res.status(500).json(e);
    }
});

export default router;
