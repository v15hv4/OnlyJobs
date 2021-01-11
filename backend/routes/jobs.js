import { Router } from "express";
import Job from "../models/Job";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find(req.query);
        res.status(200).json(jobs);
    } catch (e) {
        res.json(e);
    }
});

router.post("/new", async (req, res) => {
    try {
        const {
            title,
            recruiter,
            max_applications,
            max_positions,
            post_date,
            deadline,
            skillset,
            type,
            duration,
            salary,
            rating,
        } = req.body;
        const newJob = new Job({
            title,
            recruiter,
            max_applications,
            max_positions,
            post_date,
            deadline,
            skillset,
            type,
            duration,
            salary,
            rating,
        });
        const job = await newJob.save();
        res.status(200).json(job);
    } catch (e) {
        res.json(e);
    }
});

export default router;
