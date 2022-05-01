import React, { useEffect, useState } from 'react'
import './MoviesWatched.css'
import {getMovies} from '../../utils/moviesUtils'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const MoviesWatched = ({ subs, id }) => {

  const [subscription,setSubscription] = useState({memberId : id, movieId : '', date : ''});
  const [isNewMovie,setIsNewMovie] = useState(false);
  const [movies,setMovies] = useState([]);
  const [subs1,setSubs1] = useState(subs)

  useEffect(() => 
  {
    (async () => {
      let {data} = await getMovies()
      setMovies(data)
    })();    
  }, [isNewMovie])

  const handleChange = (e) =>
  {
    let {name, value} = e.target;
    if(name === 'date')
    {
      setSubscription({...subscription, date : value})
    }
    else
    {
      setSubscription({...subscription, [name] : value})
    }
  }
  
  const handleSubscription = async (e) =>
  {
    e.preventDefault()
    
    let {data} = await axios.post(' http://localhost:1938/subscriptions', subscription)
    setIsNewMovie(true)

    setSubs1(data)
  }

  const moviesOpts = movies.map(movie =>
    {
      return(
        <option key={movie._id} value={movie._id } >{movie.name}</option>
      )
    })

  const newMovie = (
    <div style={{border : '.2em solid black', padding : '.3em', margin : '.3em'}}>
      <h5>Add a New Movie</h5>
      <form onSubmit={handleSubscription} >
        <select name='movieId' onChange={handleChange}>
          <option disabled selected >-- pick a movie --</option>
          {moviesOpts}
        </select>{' '}
        <input type="date" name='date' onChange={handleChange} /> <br />
        <input type="submit" value="subscribe" />
        </form>
    </div>
  )

  const memberSubs = (
    <ul>
      {subs1.map(sub =>
        {
          return(
            <li key={sub._id}  onClick={() => sessionStorage.setItem('selected_movie_id', JSON.stringify(sub.movieId))} >
              <Link to='/main/movies/all-movies' 
              >
                {sub.movieDetails.name}</Link> 
              - {sub.date.toString().slice(0,10)}
            </li>
          )
        })}
    </ul>
  )

  return (
    <div className='movies_watched_div'>
        <h5>Movies Watched</h5>
        <input type="button" value="subscribe to a new movie" onClick={() => setIsNewMovie(!isNewMovie)} /> 
        {isNewMovie && newMovie}
        {memberSubs}
    </div>
  )
}
