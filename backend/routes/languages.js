import { Router } from "express";
import Language from "../models/Language";

const router = Router();

router.get("/", async (req, res) => {
    Language.find(req.query, (e, languages) => {
        if (e) res.status(500).json(e);
        res.status(200).json(languages);
    });
});

router.post("/new", async (req, res) => {
    const newLanguage = new Language({
        name: req.body.name,
    });
    newLanguage.save((e, language) => {
        if (e) res.status(500).json(e);
        res.status(200).json(language);
    });
});

export default router;
