import React from 'react';
import withAuth from './withAuth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMainContent } from "./redux/actions/mainActions";
import { logoutUser } from "./redux/actions/authActions";

const MainPage = () => {
    const dispatch = useDispatch();

    const { serverErrors, mainContentLoading, mainContent } = useSelector((state) => state.main);

    useEffect(() => {
        dispatch(getMainContent()); 
    }, [dispatch]);

    if(mainContentLoading){
        return;
    }

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div>
        <h1>Main Page</h1>
        {serverErrors && <p>Error: {serverErrors}</p>}
        {mainContent && <p> {mainContent} </p>}
        <button type="submit" onClick={handleLogout}>Logout</button> 
    </div>
    );
};

export default withAuth(MainPage);