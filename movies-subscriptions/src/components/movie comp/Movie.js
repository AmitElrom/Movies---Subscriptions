import React from 'react';
import './Movie.css';
import { SubscriptionsWatched } from '../subscriptions watched/SubscriptionsWatched';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Movie = ({parentCallback , movieData : {_id, name, yearPremiered, genres, image, allMovieSubs}}) => {

  const navigate = useNavigate()

  const genresList = (<ul> {genres.map((genre,index) =>
  {
    return(
      <li key={index}>{genre}</li>
    )
  })} </ul>)

  const deletesMovie = async() =>
  {
    let status = await axios.delete("http://localhost:1938/movies/" + _id)
    parentCallback(_id)
    alert(status)
  }


  return (
    <div className='movie_div' >
        <h3>{name} - {yearPremiered}</h3> {/* name + year */}
        <img src={image} alt='movie_img' /> <br />
        Genres : {genresList}
        <SubscriptionsWatched subs={allMovieSubs} />
        <input type="button" value="edit" onClick={() => navigate(`/main/movies/${_id}`)} />
        <input type="button" value="delete" onClick={deletesMovie} />
    </div>
  )
}
