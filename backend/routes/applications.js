import { Router } from "express";
import Application from "../models/Application";
import Job from "../models/Job";

const router = Router();

// retrieve applications
router.get("/", async (req, res) => {
    Application.find(req.query, (e, applications) => {
        if (e) return res.status(500).json(e);
        return res.status(200).json(applications);
    });
});

// create new application
router.post("/new", async (req, res) => {
    Application.find(
        { $or: [{ state: "applied" }, { state: "shortlisted" }] },
        (e, applications) => {
            if (e) return res.status(500).json(e);

            const openApplications = applications.filter((a) =>
                a.applicant.equals(req.body.applicant)
            );

            // check whether applicant has already applied
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

            Job.findOne({ _id: req.body.job }, (e, job) => {
                if (e) return res.status(500).json(e);

                const jobApplications = applications.filter((a) => a.job.equals(req.body.job));

                // check whether job has reached max number of applications
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
                newApplication.save((e, application) => {
                    if (e) return res.status(500).json(e);
                    return res.status(200).json(application);
                });
            });
        }
    );
});

// edit application details
router.post("/edit/:id", async (req, res) => {
    Application.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        (e, application) => {
            if (e) return res.status(500).json(e);
            return res.status(200).json(application);
        }
    );
});

// delete application
router.post("/delete/:id", async (req, res) => {
    Application.findByIdAndUpdate(
        req.params.id,
        { $set: { state: "deleted" } },
        { new: true },
        (e, application) => {
            if (e) return res.status(500).json(e);
            return res.status(200).json(application);
        }
    );
});

// accept application
router.post("/accept/:id", async (req, res) => {
    Application.findByIdAndUpdate(
        req.params.id,
        { $set: { state: "accepted", join_date: new Date() } },
        { new: true },
        (e, application) => {
            if (e) return res.status(500).json(e);

            Job.findOne({ _id: application.job }, (e, job) => {
                if (e) return res.status(500).json(e);

                // check whether job has filled all positions
                if (job.state === "filled") {
                    return res.status(500).json({
                        message: "Job has reached application limit!",
                    });
                }

                Application.find({ job: application.job, state: "accepted" }, (e, applications) => {
                    if (e) return res.status(500).json(e);

                    // update job state if filled by this application
                    if (job.max_positions <= applications.length) {
                        Job.findByIdAndUpdate(
                            application.job,
                            { $set: { state: "filled" } },
                            (e) => {
                                if (e) return res.status(500).json(e);
                                return res.status(200).json(application);
                            }
                        );
                    }
                });
            });
        }
    );
});

export default router;
