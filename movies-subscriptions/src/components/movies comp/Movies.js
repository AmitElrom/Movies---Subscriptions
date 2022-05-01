import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export const Movies = () => {

    const navigate = useNavigate()

    return (
        <div >
            <h2>Movies</h2>
            <input type="button" value="All Movies" onClick={() => {navigate('all-movies')}} /> 
            <input type="button" value="Add Movie" onClick={() => navigate('add-movie')} />

            <Outlet />
        </div>
    )
}
