import { Router } from "express";
import Application from "../models/Application";

const router = Router();

router.get("/", async (req, res) => {
    Application.find(req.query, (e, applications) => {
        if (e) res.status(500).json(e);
        res.status(200).json(applications);
    });
});

router.post("/new", async (req, res) => {
    const newApplication = new Application({
        applicant: req.body.applicant,
        job: req.body.job,
        SOP: req.body.SOP,
        state: req.body.state,
    });
    newApplication.save((e, application) => {
        if (e) res.status(500).json(e);
        res.status(200).json(application);
    });
});

router.post("/edit/:id", async (req, res) => {
    Application.findByIdAndDelete(req.params.id, { $set: req.body }, (e, application) => {
        if (e) res.status(500).json(e);
        else res.status(200).json(application);
    });
});

export default router;
