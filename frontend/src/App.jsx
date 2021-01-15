import { useEffect, createContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ManageSession } from "api/session";

import * as Auth from "./pages/auth";
import * as Applicant from "./pages/applicant";
import * as Recruiter from "./pages/recruiter";

export const SessionContext = createContext();

const App = () => {
    const [session, handlers] = ManageSession();
    useEffect(() => handlers.session(), []); // eslint-disable-line

    console.log(session);

    return (
        <SessionContext.Provider value={{ session, handlers }}>
            <Switch>
                {/* auth routes */}
                <Route exact path="/">
                    <Auth.Login />
                </Route>

                {/* applicant routes */}
                <Route exact path="/applicant">
                    <Redirect to="/applicant/dashboard" />
                </Route>
                <Route path="/applicant/dashboard">
                    <Applicant.Dashboard />
                </Route>

                {/* recruiter routes */}
                <Route exact path="/recruiter">
                    <Redirect to="/recruiter/dashboard" />
                </Route>
                <Route path="/recruiter/dashboard">
                    <Recruiter.Dashboard />
                </Route>
            </Switch>
        </SessionContext.Provider>
    );
};

export default App;
