import { Router } from "express";
import Applicant from "../models/Applicant";

const router = Router();

router.get("/", async (req, res) => {
    Applicant.find(req.query, (e, applicants) => {
        if (e) return res.status(500).json(e);
        return res.status(200).json(applicants);
    }).populate("skills");
});

router.post("/new", async (req, res) => {
    const newApplicant = new Applicant({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        education: req.body.education,
        skills: req.body.skills,
    });
    newApplicant.save((e, applicant) => {
        if (e) return res.status(500).json(e);
        return res.status(200).json(applicant);
    });
});

router.post("/edit/:id", async (req, res) => {
    Applicant.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        (e, applicant) => {
            if (e) return res.status(500).json(e);
            return res.status(200).json(applicant);
        }
    );
});

router.post("/rate/:id", async (req, res) => {
    Applicant.findByIdAndUpdate(
        req.params.id,
        {
            $pull: { ratings: { recruiter: req.body.recruiter } },
        },
        { new: true },
        (e) => {
            if (e) return res.status(500).json(e);
            Applicant.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { ratings: { value: req.body.rating, recruiter: req.body.recruiter } },
                },
                { new: true },
                (e, applicant) => {
                    if (e) return res.status(500).json(e);
                    return res.status(200).json(applicant);
                }
            );
        }
    );
});

export default router;
