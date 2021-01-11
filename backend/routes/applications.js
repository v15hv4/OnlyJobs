import { Router } from "express";
import Application from "../models/Application";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const applications = await Application.find(req.query);
        res.status(200).json(applications);
    } catch (e) {
        res.json(e);
    }
});

router.post("/new", async (req, res) => {
    try {
        const { applicant, job, SOP, state } = req.body;
        const newApplication = new Application({ applicant, job, SOP, state });
        const application = await newApplication.save();
        res.status(200).json(application);
    } catch (e) {
        res.json(e);
    }
});

router.post("/edit/:id", async (req, res) => {
    Application.findByIdAndDelete(req.params.id, { $set: req.body }, (err, application) => {
        if (err) res.json({ error: err });
        else res.status(200).json(application);
    });
});

export default router;
