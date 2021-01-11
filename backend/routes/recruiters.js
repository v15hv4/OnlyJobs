import { Router } from "express";
import Recruiter from "../models/Recruiter";

const router = Router();

router.get("/", async (req, res) => {
    try {
        Recruiter.find(req.query, (e, recruiters) => {
            if (e) throw e;
            res.status(200).json(recruiters);
        });
    } catch (e) {
        res.json(e);
    }
});

router.post("/new", async (req, res) => {
    try {
        const newRecruiter = new Recruiter({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            contact: req.body.contact,
            bio: req.body.bio,
        });
        newRecruiter.save((e, recruiter) => {
            if (e) throw e;
            res.status(200).json(recruiter);
        });
    } catch (e) {
        res.json(e);
    }
});

router.post("/edit/:id", async (req, res) => {
    try {
        Recruiter.findByIdAndUpdate(req.params.id, { $set: req.body }, (e, recruiter) => {
            if (e) throw e;
            else res.status(200).json(recruiter);
        });
    } catch (e) {
        res.json(e);
    }
});

export default router;
