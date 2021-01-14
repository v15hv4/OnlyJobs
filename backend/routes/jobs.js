import { Router } from "express";
import Job from "../models/Job";
import Application from "../models/Application";

const router = Router();

// retrieve jobs
router.get("/", async (req, res) => {
    try {
        // "expire" jobs whose deadlines have passed
        await Job.updateMany(
            { deadline: { $lt: new Date() }, state: "available" },
            { $set: { state: "expired" } },
            { new: true }
        );

        // return jobs filtered by query
        const jobs = await Job.find(req.query);
        return res.status(200).json(jobs);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// add a new job
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
        const job = await newJob.save();
        return res.status(200).json(job);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// delete job
router.post("/delete/:id", async (req, res) => {
    try {
        // set job state to "deleted"
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { $set: { state: "deleted" } },
            { new: true }
        );

        // set state of all applications for this job to "deleted"
        const application = Application.updateMany(
            { job: req.params.id },
            { $set: { state: "deleted" } },
            { new: true }
        );

        return res.status(200).json({ application, job });
    } catch (e) {
        return res.status(500).json(e);
    }
});

// rate a job
router.post("/rate/:id", async (req, res) => {
    try {
        // delete previous rating by current applicant
        await Job.findByIdAndUpdate(
            req.params.id,
            { $pull: { ratings: { recruiter: req.body.applicant } } },
            { new: true }
        );

        // insert new rating by current applicant
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { $push: { ratings: { value: req.body.rating, applicant: req.body.applicant } } },
            { new: true }
        );
        return res.status(200).json(job);
    } catch (e) {
        return res.status(500).json(e);
    }
});

export default router;
