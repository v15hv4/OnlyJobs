import bcrypt from "bcrypt";
import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";

import User from "./models/User";

dotenv.config();

var LocalStrategy = passportLocal.Strategy;
var JWTStrategy = passportJWT.Strategy;

// extract token from cookie
const ExtractJWT = (req) => {
    var token = null;
    if (req && req.cookies) token = req.cookies["auth_token"];
    return token;
};

// authorization
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT,
            secretOrKey: process.env.JWT_SECRET,
        },
        (payload, done) => {
            User.findById({ _id: payload.sub }, (e, user) => {
                if (e) return done(e, false);
                if (!user) return done(null, false);
                return done(null, user);
            });
        }
    )
);

// authentication
passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne({ email }, (e, user) => {
            if (e) return done(e, false);
            if (!user) return done(null, false);

            // check password
            bcrypt.compare(password, user.password, (e, success) => {
                if (e) return done(e, false);
                if (!success) return done(null, false);
                return done(null, user);
            });
        });
    })
);
