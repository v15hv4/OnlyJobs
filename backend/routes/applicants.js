import { Router } from "express";
import Applicant from "../models/Applicant";

const router = Router();

router.get("/", async (req, res) => {
    try {
        Applicant.find(req.query, (e, applicants) => {
            if (e) throw e;
            res.status(200).json(applicants);
        }).populate("skills");
    } catch (e) {
        res.json(e);
    }
});

router.post("/new", async (req, res) => {
    try {
        const newApplicant = new Applicant({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            education: req.body.education,
            skills: req.body.skills,
            rating: req.body.rating,
        });
        newApplicant.save((e, applicant) => {
            if (e) throw e;
            res.status(200).json(applicant);
        });
    } catch (e) {
        res.json(e);
    }
});

router.post("/edit/:id", async (req, res) => {
    try {
        Applicant.findByIdAndUpdate(req.params.id, { $set: req.body }, (e, applicant) => {
            if (e) throw e;
            res.status(200).json(applicant);
        });
    } catch (e) {
        res.json(e);
    }
});

export default router;
