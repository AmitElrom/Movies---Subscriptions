import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMovie.css'
import axios from 'axios';

export const AddMovie = () => {

  const navigate = useNavigate();

  const [movie,setMovie] = useState({name : '', genres : [], image : '', yearPremiered : 0});

  const titleCase = (str) => 
    {
      return str.split(/[\s,\t,\n]+/)
        .map(s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()).join(" ")
    } 

  const handleChange = (e) =>
    {
        let {name,value,type} = e.target;
        if(name === 'genres')
        {
            let genresArr = value.split(',').map(str => str.trim());
            setMovie({...movie, genres : genresArr})
        }
        else if(type === 'number')
        {
            setMovie({...movie, [name] : +value})
        }
        else if(name === 'name')
        {
          let newVal = titleCase(value)
          setMovie({...movie, [name] : newVal})
        }
        else
        {
            setMovie({...movie, [name] : value})
        }

    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        await axios.post(`http://localhost:1938/movies`, movie)
        alert('new movie created')
        navigate('/main/movies/all-movies')
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Name : <input required type="text" name="name" onChange={handleChange} />
        Genres : <input required type="text" name="genres" onChange={handleChange} />
        Image URL : <input required type="text" name="image" onChange={handleChange} />
        Premiere Year : <input required type="number" name="yearPremiered" onChange={handleChange} />
        <input type="submit" value="save" />
        <input type="button" value="cancel" onClick={() => navigate('/main/movies/all-movies')} />
      </form>
    </div>
  )
}
