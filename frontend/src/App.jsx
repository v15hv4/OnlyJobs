import { Route, Switch } from "react-router-dom";

import * as Auth from "./pages/auth";

const App = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Auth.Login />
            </Route>
        </Switch>
    );
};

export default App;
