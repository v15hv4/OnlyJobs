import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import Applicant from "../models/Applicant";
import Recruiter from "../models/Recruiter";

const router = Router();

router.post("/register", async (req, res) => {
    User.find({ email: req.body.email }, async (e, existing) => {
        // check whether email already in use
        if (e) return res.status(500).json(e);
        if (existing.length > 0)
            return res.status(500).json({ message: "Error! Email already in use." });

        try {
            // hash & store password
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            switch (req.body.role) {
                case "applicant":
                    const newApplicant = new Applicant({
                        email: req.body.email,
                        password: passwordHash,
                        name: req.body.name,
                        education: req.body.education,
                        skills: req.body.skills,
                    });
                    newApplicant.save((e, applicant) => {
                        if (e) return res.status(500).json(e);
                        return res.status(200).json(applicant);
                    });
                    break;

                case "recruiter":
                    const newRecruiter = new Recruiter({
                        email: req.body.email,
                        password: req.body.password,
                        name: req.body.name,
                        contact: req.body.contact,
                        bio: req.body.bio,
                    });
                    newRecruiter.save((e, recruiter) => {
                        if (e) return res.status(500).json(e);
                        return res.status(200).json(recruiter);
                    });
                    break;

                default:
                    return res.status(500).json({ message: "Invalid role!" });
            }
        } catch (e) {
            return res.status(500).json(e);
        }
    });
});

export default router;
