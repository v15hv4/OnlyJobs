import { Router } from "express";
import Application from "../models/Application";

const router = Router();

router.get("/", async (req, res) => {
    try {
        Application.find(req.query, (e, applications) => {
            if (e) throw e;
            res.status(200).json(applications);
        });
    } catch (e) {
        res.json(e);
    }
});

router.post("/new", async (req, res) => {
    try {
        const newApplication = new Application({
            applicant: req.body.applicant,
            job: req.body.job,
            SOP: req.body.SOP,
            state: req.body.state,
        });
        newApplication.save((e, application) => {
            if (e) throw e;
            res.status(200).json(application);
        });
    } catch (e) {
        res.json(e);
    }
});

router.post("/edit/:id", async (req, res) => {
    try {
        Application.findByIdAndDelete(req.params.id, { $set: req.body }, (e, application) => {
            if (e) throw e;
            else res.status(200).json(application);
        });
    } catch (e) {
        res.json(e);
    }
});

export default router;
