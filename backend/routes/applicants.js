import { Router } from "express";
import Applicant from "../models/Applicant";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const applicants = await Applicant.find(req.query).populate("skills");
        res.status(200).json(applicants);
    } catch (e) {
        res.json(e);
    }
});

router.post("/new", async (req, res) => {
    try {
        const { email, password, name, education, skills, rating } = req.body;
        const newApplicant = new Applicant({
            email,
            password,
            name,
            education,
            skills,
            rating,
        });
        const applicant = await newApplicant.save();
        res.status(200).json(applicant);
    } catch (e) {
        res.json(e);
    }
});

router.post("/edit/:id", async (req, res) => {
    try {
        Applicant.findByIdAndUpdate(req.params.id, { $set: req.body }, (e, applicant) => {
            if (e) res.json(e);
            else res.status(200).json(applicant);
        });
    } catch (e) {
        res.json(e);
    }
});

export default router;
