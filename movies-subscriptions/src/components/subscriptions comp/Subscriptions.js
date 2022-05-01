import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export const Subscriptions = () => {

    const navigate = useNavigate()

    return (
        <div>
            <h2>Subscriptions</h2>
            <input type="button" value="All Members" onClick={() => navigate('all-members')} />
            <input type="button" value="Add Member" onClick={() => navigate('add-member')} />

            <Outlet />
        </div>
    )
}
