import React from 'react';
import withAuth from './withAuth';

const MainPage = () => {
    return (
        <div>
            <h1>Main Page</h1>
        </div>
    );
};

export default withAuth(MainPage);