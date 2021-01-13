import { Router } from "express";
import Application from "../models/Application";

const router = Router();

router.get("/", async (req, res) => {
    Application.find(req.query, (e, applications) => {
        if (e) return res.status(500).json(e);
        return res.status(200).json(applications);
    });
});

router.post("/new", async (req, res) => {
    Application.find({ applicant: req.body.applicant }, (e, applications) => {
        if (e) return res.status(500).json(e);

        const openApplications = applications.filter((a) =>
            ["applied", "shortlisted"].includes(a.state)
        );

        if (openApplications.length > 10) {
            return res.status(500).json({
                message: "Applicant may not have more than 10 open applications!",
            });
        }

        if (openApplications.filter((o) => o.job.equals(req.body.job)).length > 0) {
            return res.status(500).json({
                message: "Applicant has already applied to this job!",
            });
        }

        const newApplication = new Application({
            applicant: req.body.applicant,
            job: req.body.job,
            SOP: req.body.SOP,
            state: req.body.state,
        });
        newApplication.save((e, application) => {
            if (e) return res.status(500).json(e);
            return res.status(200).json(application);
        });
    });
});

router.post("/edit/:id", async (req, res) => {
    Application.findByIdAndDelete(req.params.id, { $set: req.body }, (e, application) => {
        if (e) return res.status(500).json(e);
        return res.status(200).json(application);
    });
});

export default router;
