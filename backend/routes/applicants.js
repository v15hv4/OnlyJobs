import { Router } from "express";
import Applicant from "../models/Applicant";

const router = Router();

router.get("/", async (req, res) => {
    Applicant.find(req.query, (e, applicants) => {
        if (e) res.status(500).json(e);
        res.status(200).json(applicants);
    }).populate("skills");
});

router.post("/new", async (req, res) => {
    const newApplicant = new Applicant({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        education: req.body.education,
        skills: req.body.skills,
        rating: req.body.rating,
    });
    newApplicant.save((e, applicant) => {
        if (e) res.status(500).json(e);
        res.status(200).json(applicant);
    });
});

router.post("/edit/:id", async (req, res) => {
    Applicant.findByIdAndUpdate(req.params.id, { $set: req.body }, (e, applicant) => {
        if (e) res.status(500).json(e);
        res.status(200).json(applicant);
    });
});

router.post("/rate/:id", async (req, res) => {
    Applicant.findByIdAndUpdate(
        req.params.id,
        { $inc: { "rating.value": req.body.rating, "rating.amount": 1 } },
        (e, applicant) => {
            if (e) res.status(500).json(e);
            res.status(200).json(applicant);
        }
    );
});

export default router;
