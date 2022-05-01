import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovie } from '../../utils/moviesUtils';
import axios from 'axios';

export const EditMovie = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [movie,setMovie] = useState({_id : '', name : '', genres : [], image : '', yearPremiered : 0});

    useEffect(() =>
    {
        (async () => {
            let {data} = await getMovie(id)
            setMovie(data)
          })();          
    },[])

    const handleChange = (e) =>
    {
        let {name,value} = e.target;
        if(name === 'genres')
        {
            let genresArr = value.split(',').map(str => str.trim());
            setMovie({...movie, genres : genresArr})
        }
        else if(typeof movie[name] === 'number')
        {
            setMovie({...movie, [name] : +value})
        }
        else
        {
            setMovie({...movie, [name] : value})
        }
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        await axios.put(`http://localhost:1938/movies/${movie._id}`, movie)
        alert('movie updated')
        navigate('/main/movies/all-movies')
    }

    return (
        <div >
            <h3>Edit Movie - {movie.name}</h3>
            <form onSubmit={handleSubmit} >
            <label>
                Name: <input type="text" value={movie.name} name="name" onChange={handleChange} />
                Genres: <input type="text" value={movie.genres} name="genres" onChange={handleChange} />
                Image URL: <input type="text" value={movie.image} name="image" onChange={handleChange} />
                Premier year: <input type="number" value={movie.yearPremiered} name="yearPremiered" onChange={handleChange} /> <br />
                <input type="submit" value="update" />
                <input type="button" value="cancel" onClick={() => navigate('/main/movies/all-movies')} />
            </label>
            </form>
        </div>
    )
}
