import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const Main = () => {

  const navigate = useNavigate()

  return (
    <div>
        <input type="button" value="Movies" onClick={() => navigate('movies/all-movies')} />
        <input type="button" value="Subscriptions" onClick={() => navigate('subscriptions/all-members')} />
        <input type="button" value="Log Out" />

        <Outlet />
    </div>
  )
}
