import { Router } from "express";
import Recruiter from "../models/Recruiter";

const router = Router();

// retrieve recruiters
router.get("/", async (req, res) => {
    Recruiter.find(req.query, (e, recruiters) => {
        if (e) return res.status(500).json(e);
        return res.status(200).json(recruiters);
    });
});

// edit recruiter details
router.post("/edit/:id", async (req, res) => {
    Recruiter.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        (e, recruiter) => {
            if (e) return res.status(500).json(e);
            return res.status(200).json(recruiter);
        }
    );
});

export default router;
