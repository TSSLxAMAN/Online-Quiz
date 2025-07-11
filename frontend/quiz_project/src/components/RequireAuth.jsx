import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/Login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
