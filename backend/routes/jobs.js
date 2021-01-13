import { Router } from "express";
import Job from "../models/Job";

const router = Router();

router.get("/", async (req, res) => {
    Job.find(req.query, (e, jobs) => {
        if (e) return res.status(500).json(e);
        return res.status(200).json(jobs);
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
        if (e) return res.status(500).json(e);
        return res.status(200).json(job);
    });
});

router.post("/rate/:id", async (req, res) => {
    Job.findByIdAndUpdate(
        req.params.id,
        { $push: { ratings: { value: req.body.rating, recruiter: req.body.applicant } } },
        { new: true },
        (e, job) => {
            if (e) return res.status(500).json(e);
            return res.status(200).json(job);
        }
    );
});

export default router;
