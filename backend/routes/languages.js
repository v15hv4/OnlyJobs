import { Router } from "express";
import Language from "../models/Language";

const router = Router();

router.get("/", async (req, res) => {
    try {
        Language.find(req.query, (e, languages) => {
            if (e) throw e;
            res.status(200).json(languages);
        });
    } catch (e) {
        res.json(e);
    }
});

router.post("/new", async (req, res) => {
    try {
        const newLanguage = new Language({
            name: req.body.name,
        });
        newLanguage.save((e, language) => {
            if (e) throw e;
            res.status(200).json(language);
        });
    } catch (e) {
        res.json(e);
    }
});

export default router;
