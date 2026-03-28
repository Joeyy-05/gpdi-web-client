import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <PublicNavbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;