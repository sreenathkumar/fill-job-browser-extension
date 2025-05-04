import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { ReactNode } from 'react';
import EmailNotVerified from './EmailNotVerified';


const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { auth } = useAuth();

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    if (!auth.emailVerified) {
        return <EmailNotVerified />
    }

    return children;
};

export default PrivateRoute;
