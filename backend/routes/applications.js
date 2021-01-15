import { Router } from "express";
import Application from "../models/Application";
import Job from "../models/Job";

const router = Router();

// retrieve applications
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find(req.query)
            .populate("applicant")
            .populate("job");
        return res.status(200).json(applications);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// create new application
router.post("/new", async (req, res) => {
    try {
        const applications = await Application.find({
            $or: [{ state: "applied" }, { state: "shortlisted" }],
        });

        // check whether applicant has already applied
        const openApplications = applications.filter((a) => a.applicant.equals(req.body.applicant));
        if (openApplications.filter((o) => o.job.equals(req.body.job)).length > 0) {
            return res.status(500).json({
                message: "Applicant has already applied to this job!",
            });
        }

        // check whether applicant has exceeded limit
        if (openApplications.length > 10) {
            return res.status(500).json({
                message: "Applicant may not have more than 10 open applications!",
            });
        }

        // check whether job has reached max number of applications
        const job = await Job.findOne({ _id: req.body.job });
        const jobApplications = applications.filter((a) => a.job.equals(req.body.job));
        if (job.max_applications <= jobApplications.length) {
            return res.status(500).json({
                message: "Job has reached application limit!",
            });
        }

        const newApplication = new Application({
            applicant: req.body.applicant,
            job: req.body.job,
            SOP: req.body.SOP,
        });

        const application = await newApplication.save();

        return res.status(200).json(application);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// edit application details
router.post("/edit/:id", async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json(application);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// delete application
router.post("/delete/:id", async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { $set: { state: "deleted" } },
            { new: true }
        );
        return res.status(200).json(application);
    } catch (e) {
        return res.status(500).json(e);
    }
});

// accept application
router.post("/accept/:id", async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { $set: { state: "accepted", join_date: new Date() } },
            { new: true }
        );

        // check whether job has filled all positions
        const job = await Job.findOne({ _id: application.job });
        const jobApplications = await Application.find({ job: application.job, state: "accepted" });
        if (job.max_positions <= jobApplications.length) {
            return res.status(500).json({
                message: "Job has reached position limit!",
            });
        }

        return res.status(200).json(application);
    } catch (e) {
        return res.status(500).json(e);
    }
});

export default router;
