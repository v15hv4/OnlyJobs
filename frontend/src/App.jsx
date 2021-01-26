import { useState, useEffect, createContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ManageSession } from "api/session";

import * as Auth from "./pages/auth";
import * as Applicant from "./pages/applicant";
import * as Recruiter from "./pages/recruiter";

import ProtectedRoute from "./components/ProtectedRoute";

export const SessionContext = createContext();

const App = () => {
    const [session, handlers] = ManageSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            await handlers.session();
            setLoading(false);
        };
        fetchSession();
    }, []); // eslint-disable-line

    if (loading) return null; // TODO: loading indicator / page
    return (
        <SessionContext.Provider value={{ session, handlers }}>
            <Switch>
                <Route exact path="/">
                    {session.user.role === "applicant" && <Redirect replace to="/dashboard" />}
                    {session.user.role === "recruiter" && <Redirect replace to="/listings" />}
                    {!session.user.role && <Redirect replace to="/login" />}
                </Route>

                <ProtectedRoute exact path="/login" allowed={[""]}>
                    <Auth.Login />
                </ProtectedRoute>
                <ProtectedRoute exact path="/signup" allowed={[""]}>
                    <Auth.Signup />
                </ProtectedRoute>

                <ProtectedRoute exact path="/dashboard" allowed={["applicant"]}>
                    <Applicant.Dashboard />
                </ProtectedRoute>
                <ProtectedRoute exact path="/applications" allowed={["applicant"]}>
                    <Applicant.Applications />
                </ProtectedRoute>
                <ProtectedRoute exact path="/applicantprofile" allowed={["applicant"]}>
                    <Applicant.Profile />
                </ProtectedRoute>

                <ProtectedRoute exact path="/listings" allowed={["recruiter"]}>
                    <Recruiter.Listings />
                </ProtectedRoute>
                <ProtectedRoute path="/listings/:id/applications" allowed={["recruiter"]}>
                    <Recruiter.Applications />
                </ProtectedRoute>
                <ProtectedRoute exact path="/employees" allowed={["recruiter"]}>
                    <Recruiter.Employees />
                </ProtectedRoute>
                <ProtectedRoute exact path="/recruiterprofile" allowed={["recruiter"]}>
                    <Recruiter.Profile />
                </ProtectedRoute>

                <Redirect to="/" />
            </Switch>
        </SessionContext.Provider>
    );
};

export default App;
