import { Router } from "express";
import Job from "../models/Job";
import Application from "../models/Application";

import passport from "passport";
import passportConfig from "../passport";

const router = Router();

// retrieve jobs
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        var jobs = await Job.find(req.query).populate("skillset").populate("recruiter");
        jobs = jobs.map((j) => {
            var values = j.ratings.map((a) => a.value);
            var totalValue = values.reduce((a, i) => a + i, 0);
            return {
                _id: j._id,
                deadline: j.deadline,
                duration: j.duration,
                post_date: j.post_date,
                salary: j.salary,
                skillset: j.skillset,
                state: j.state,
                type: j.type,
                title: j.title,
                rating: {
                    value: totalValue / j.ratings.length,
                    amount: j.ratings.length,
                },
                recruiter: j.recruiter,
                max_positions: j.max_positions,
                max_applications: j.max_applications,
            };
        });

        // applicants filter
        if (req.user.details === "Applicant") {
            const allApplications = await Application.find({});
            const applications = allApplications
                .filter((a) => a.applicant.equals(req.user._id))
                .map((a) => a.job.toString());

            jobs.forEach((j) => {
                const filled = allApplications.filter(
                    (a) => a.job.equals(j._id) && a.state !== "deleted" // && a.state !== "rejected"
                ).length;
                if (filled >= j.max_applications || filled >= j.max_positions) {
                    j.state = "full";
                }
                if (applications.includes(j._id.toString())) {
                    j.state = "applied";
                }
            });

            jobs = jobs.filter((j) => new Date(j.deadline) > new Date());
        }

        //recruiters filter
        if (req.user.details === "Recruiter") {
            const allApplications = await Application.find({});
            jobs.forEach((j) => {
                const applications = allApplications.filter(
                    (a) => a.job.equals(j._id) && a.state !== "deleted" && a.state !== "rejected"
                ).length;
                const positions = allApplications.filter(
                    (a) => a.job.equals(j._id) && a.state === "accepted"
                ).length;
                j.filled_applications = applications;
                j.filled_positions = positions;
            });

            jobs = jobs.filter((j) => j.recruiter.equals(req.user._id));
        }

        return res.status(200).json(jobs.reverse());
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
        });
        const job = await newJob.save();
        return res.status(200).json(job);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// edit job details
router.post("/edit/:id", async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
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
router.post("/rate/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        // delete previous rating by current applicant
        await Job.findByIdAndUpdate(
            req.params.id,
            { $pull: { ratings: { applicant: req.user._id } } },
            { new: true }
        );

        // insert new rating by current applicant
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { $push: { ratings: { value: req.body.rating, applicant: req.user._id } } },
            { new: true }
        );
        return res.status(200).json(job);
    } catch (e) {
        return res.status(500).json(e);
    }
});

export default router;
