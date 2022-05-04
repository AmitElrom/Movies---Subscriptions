import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getMovies } from '../../utils/moviesUtils'
import { Movie } from '../movie comp/Movie';
import './AllMovies.css'


export const AllMovies = () => {

  const [movies,setMovies] = useState([])
  const [filteredMovies,setFilteredMovies] = useState([])
  const [movieIdDeleted,setMovieIdDeleted] = useState('');
  const [searchTerm,setSearchTerm] = useState('');

  useEffect(() =>
  {
    (async () => {
      let {data} = await axios.get('http://localhost:1938/movies', {
        headers: {
          'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })

      let movieIdFromSS = JSON.parse(sessionStorage.getItem('selected_movie_id'))
      sessionStorage.removeItem('selected_movie_id')
      if(movieIdFromSS !== null) 
      {
        setMovies(data.filter(x => x._id == movieIdFromSS))
      }
      else
      {
        setMovies(data)
      }
    })();
  }, [])

  useEffect(() =>
  {
    setMovies(movies.filter(movie =>
      {
        return movie._id !== movieIdDeleted;
      }))
  }, [movieIdDeleted])

  useEffect(() =>
  {
    setFilteredMovies(
      movies.filter(movie =>
        {
          if(movie == '')
          {
            return movie
          }
          else
          {
            return movie.name.toLowerCase()
              .includes(searchTerm
                .toLowerCase().replace(/\s+/g, ' ').trim())
          }
        })
    )
  }, [searchTerm])

  const handleCallback = (childData) => setMovieIdDeleted(childData)

  const moviesKind = searchTerm.length === 0 ? movies : filteredMovies

  const moviesComps = moviesKind.map(movie =>
    {
      return(
        <Movie key={movie._id} movieData={movie} parentCallback={handleCallback} />
      )
    })

  return (
    <div className='movies_div'>
      <input type="text" onChange={(e) => {setSearchTerm(e.target.value)}} placeholder="Search..." />
      {moviesComps}
    </div>
  )
}

