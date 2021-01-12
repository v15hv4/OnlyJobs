import { Router } from "express";
import Job from "../models/Job";

const router = Router();

router.get("/", async (req, res) => {
    try {
        Job.find(req.query, (e, jobs) => {
            if (e) throw e;
            res.status(200).json(jobs);
        });
    } catch (e) {
        res.json(e);
    }
});

router.post("/new", async (req, res) => {
    try {
        const newJob = new Job({
            title: req.body.title,
            recruiter: req.body.recruiter,
            max_applications: req.body.max_applications,
            max_positions: req.body.max_positions,
            deadline: req.body.deadline,
            skillset: req.body.skillset,
            type: req.body.type,
            duration: req.body.duration,
            salary: req.body.salary,
            rating: req.body.rating,
        });
        newJob.save((e, job) => {
            if (e) throw e;
            res.status(200).json(job);
        });
    } catch (e) {
        res.json(e);
    }
});

export default router;
