import { Router } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

import passportConfig from "../passport";
import User from "../models/User";
import Applicant from "../models/Applicant";
import Recruiter from "../models/Recruiter";

dotenv.config();

const router = Router();

const signToken = (pk) => {
    return JWT.sign({ iss: "OnlyJobs", sub: pk }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

// authenticate & log the user in
router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, name, details } = req.user;
        const token = signToken(_id);
        res.cookie("auth_token", token, { httpOnly: true, sameSite: true });
        res.status(200).json({
            isAuthenticated: true,
            user: { id: _id, name: name, role: details.toLowerCase() },
        });
    } else {
        res.send("bruh");
    }
});

// log the user out & clear cookie
router.get("/logout", passport.authenticate("jwt", { session: false }), (_req, res) => {
    res.clearCookie("auth_token")
        .status(200)
        .json({
            isAuthenticated: false,
            user: { id: null, name: "", role: "" },
        });
});

// return authenticated user's session details
router.get("/session", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, name, details } = req.user;
        res.status(200).json({
            isAuthenticated: true,
            user: { id: _id, name: name, role: details.toLowerCase() },
        });
    } else {
        res.status(401).send("Unauthorized");
    }
});

// register a new user based on role
router.post("/register", async (req, res) => {
    try {
        // check whether email already in use
        const existing = await User.find({ email: req.body.email });
        if (existing.length > 0) return res.status(500).json({ message: "Email already in use." });

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
                    password: passwordHash,
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

export default router;
