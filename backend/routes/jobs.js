import { Router } from "express";
import Job from "../models/Job";

const router = Router();

router.get("/", async (req, res) => {
    Job.find(req.query, (e, jobs) => {
        if (e) res.status(500).json(e);
        res.status(200).json(jobs);
    });
});

router.post("/new", async (req, res) => {
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
        if (e) res.status(500).json(e);
        res.status(200).json(job);
    });
});

router.post("/rate/:id", async (req, res) => {
    Job.findByIdAndUpdate(
        req.params.id,
        { $inc: { "rating.value": req.body.rating, "rating.amount": 1 } },
        (e, job) => {
            if (e) res.status(500).json(e);
            res.status(200).json(job);
        }
    );
});

export default router;
