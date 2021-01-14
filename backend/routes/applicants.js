import { Router } from "express";
import Applicant from "../models/Applicant";

const router = Router();

// retrieve applcants
router.get("/", async (req, res) => {
    try {
        const applicants = await Applicant.find(req.query).populate("skills");
        return res.status(200).json(applicants);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// edit applicant details
router.post("/edit/:id", async (req, res) => {
    try {
        const applicant = await Applicant.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json(applicant);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// rate an applicant
router.post("/rate/:id", async (req, res) => {
    try {
        await Applicant.findByIdAndUpdate(
            req.params.id,
            { $pull: { ratings: { recruiter: req.body.recruiter } } },
            { new: true }
        );
        const applicant = await Applicant.findByIdAndUpdate(
            req.params.id,
            { $push: { ratings: { value: req.body.rating, recruiter: req.body.recruiter } } },
            { new: true }
        );
        return res.status(200).json(applicant);
    } catch (e) {
        return res.status(500).json(e);
    }
});

export default router;
