import { Router } from "express";
import Job from "../models/Job";
import Application from "../models/Application";

const router = Router();

// retrieve jobs
router.get("/", async (req, res) => {
    // "expire" jobs whose deadlines have passed
    Job.updateMany(
        { deadline: { $lt: new Date() }, state: "available" },
        { $set: { state: "expired" } },
        { new: true },
        (e) => {
            if (e) return res.status(500).json(e);
            // return jobs filtered by query
            Job.find(req.query, (e, jobs) => {
                if (e) return res.status(500).json(e);
                return res.status(200).json(jobs);
            });
        }
    );
});

// add a new job
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

// delete job
router.post("/delete/:id", async (req, res) => {
    // set job state to "deleted"
    Job.findByIdAndUpdate(
        req.params.id,
        { $set: { state: "deleted" } },
        { new: true },
        (e, job) => {
            if (e) return res.status(500).json(e);

            // set state of all applications for this job to "deleted"
            Application.updateMany(
                { job: req.params.id },
                { $set: { state: "deleted" } },
                { new: true },
                (e, application) => {
                    if (e) return res.status(500).json(e);
                    return res.status(200).json({ application, job });
                }
            );
        }
    );
});

// rate a job
router.post("/rate/:id", async (req, res) => {
    Job.findByIdAndUpdate(
        req.params.id,
        {
            $pull: { ratings: { recruiter: req.body.applicant } },
        },
        { new: true },
        (e) => {
            if (e) return res.status(500).json(e);
            Job.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { ratings: { value: req.body.rating, applicant: req.body.applicant } },
                },
                { new: true },
                (e, job) => {
                    if (e) return res.status(500).json(e);
                    return res.status(200).json(job);
                }
            );
        }
    );
});

export default router;
