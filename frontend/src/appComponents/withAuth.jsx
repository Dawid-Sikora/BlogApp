import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { userInfo } = useSelector((state) => state.auth);

        if (userInfo == null) {
           return <Navigate to="/login" replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;