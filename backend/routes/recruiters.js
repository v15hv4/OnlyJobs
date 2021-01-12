import { Router } from "express";
import Recruiter from "../models/Recruiter";

const router = Router();

router.get("/", async (req, res) => {
    Recruiter.find(req.query, (e, recruiters) => {
        if (e) res.json(e);
        res.status(200).json(recruiters);
    });
});

router.post("/new", async (req, res) => {
    const newRecruiter = new Recruiter({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        contact: req.body.contact,
        bio: req.body.bio,
    });
    newRecruiter.save((e, recruiter) => {
        if (e) res.json(e);
        res.status(200).json(recruiter);
    });
});

router.post("/edit/:id", async (req, res) => {
    Recruiter.findByIdAndUpdate(req.params.id, { $set: req.body }, (e, recruiter) => {
        if (e) res.json(e);
        else res.status(200).json(recruiter);
    });
});

export default router;
