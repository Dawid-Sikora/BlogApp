import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUser } from "./redux/actions/authActions";


const withAuth = (WrappedComponent) => {
    return (props) => {
        const dispatch = useDispatch();

        const { loading, isLogin } = useSelector((state) => state.auth);

        useEffect(() => {
            dispatch(checkUser()); 
        }, [dispatch]);

        // null is initial state, when loading is null then any check request was not started yet 
        if (loading == null || loading) {
            return null; 
        }

        if (!isLogin) {
           return <Navigate to="/login" replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;