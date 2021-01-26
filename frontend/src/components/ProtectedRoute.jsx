import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { SessionContext } from "App";

const ProtectedRoute = ({ children, allowed, ...rest }) => {
    const { session } = useContext(SessionContext);

    return (
        <Route
            {...rest}
            render={() => {
                if (!allowed.includes(session.user.role)) return <Redirect to="/" />;
                else return children;
            }}
        />
    );
};

export default ProtectedRoute;
