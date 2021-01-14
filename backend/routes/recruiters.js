import { Router } from "express";
import Recruiter from "../models/Recruiter";

const router = Router();

// retrieve recruiters
router.get("/", async (req, res) => {
    try {
        const recruiters = await Recruiter.find(req.query);
        return res.status(200).json(recruiters);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// edit recruiter details
router.post("/edit/:id", async (req, res) => {
    try {
        const recruiter = await Recruiter.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json(recruiter);
    } catch (e) {
        return res.status(500).json(e);
    }
});

export default router;
