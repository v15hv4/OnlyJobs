import { Router } from "express";
import Recruiter from "../models/Recruiter";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const recruiters = await Recruiter.find(req.query);
        res.status(200).json(recruiters);
    } catch (e) {
        res.json(e);
    }
});

router.post("/new", async (req, res) => {
    try {
        const { email, password, name, contact, bio } = req.body;
        const newRecruiter = new Recruiter({
            email,
            password,
            name,
            contact,
            bio,
        });
        const recruiter = await newRecruiter.save();
        res.status(200).json(recruiter);
    } catch (e) {
        res.json(e);
    }
});

router.post("/edit/:id", async (req, res) => {
    try {
        Recruiter.findByIdAndUpdate(req.params.id, { $set: req.body }, (e, recruiter) => {
            if (e) res.json(e);
            else res.status(200).json(recruiter);
        });
    } catch (e) {
        res.json(e);
    }
});

export default router;
