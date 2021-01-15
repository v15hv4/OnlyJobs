import { useState, useEffect, createContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ManageSession } from "api/session";

import * as Auth from "./pages/auth";
import * as Applicant from "./pages/applicant";
import * as Recruiter from "./pages/recruiter";

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

    console.log(session.user.role);

    if (loading) return null; // TODO: loading indicator / page
    return (
        <SessionContext.Provider value={{ session, handlers }}>
            <Switch>
                {/* auth routes */}
                <Route exact path="/">
                    {!session.user.role ? <Auth.Login /> : <Redirect to="/dashboard" />}
                </Route>
                <Route exact path="/signup">
                    {!session.user.role ? <Auth.Signup /> : <Redirect to="/dashboard" />}
                </Route>

                {/* conditionally render dashboard */}
                <Route exact path="/dashboard">
                    {session.user.role === "applicant" ? (
                        <Applicant.Dashboard />
                    ) : session.user.role === "recruiter" ? (
                        <Recruiter.Dashboard />
                    ) : (
                        <Redirect to="/" />
                    )}
                </Route>

                {/* conditionally render applications */}
                <Route exact path="/applications">
                    {session.user.role === "applicant" ? (
                        <Applicant.Applications />
                    ) : session.user.role === "recruiter" ? (
                        <Recruiter.Applications />
                    ) : (
                        <Redirect to="/" />
                    )}
                </Route>
            </Switch>
        </SessionContext.Provider>
    );
};

export default App;
