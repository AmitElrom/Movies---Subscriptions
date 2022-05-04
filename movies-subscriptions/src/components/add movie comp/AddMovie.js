import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMovie.css'
import axios from 'axios';
import { titleCase, ListCase } from '../../utils/manipulateData'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


const required = 'is a required field';
const int = 'must be an integer';
const url = 'must be a valid URL';

const schema = yup.object().shape({
  name : yup.string().required(`Name ${required}`),
  genres : yup.string().required(`Genres ${required}`),
  image : yup.string().url(`Image URL ${url}`).required(`Image URL ${required}`),
  yearPremiered : yup.number()
                      .typeError(`You must specify a number`)
                      .required()
                      .integer(`Premiere year ${int}`)
                      .min(1888, "Premiere year must be equal or greater than 1888, the year of the world's first movie premiere")
})

export const AddMovie = () => {

  const { register, handleSubmit, formState : { errors } } = useForm({
    resolver : yupResolver(schema)
  })

  const navigate = useNavigate();

  const submitForm = async (data) =>
  {
      let name = titleCase(data.name)
      let genres = ListCase(data.genres)

      const movie = {...data,name,genres}

      await axios.post(`http://localhost:1938/movies`, movie)
      alert('new movie created')
      navigate('/main/movies/all-movies')
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          Name : <input type="text" name="name" {...register('name')} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          Genres : <input type="text" name="genres" {...register('genres')} />
          <p>{errors.genres?.message}</p>
        </div>
        <div>
          Image URL : <input type="text" name="image" {...register('image')} />
          <p>{errors.image?.message}</p>
        </div>
        <div>
          Premiere Year : <input type="text" name="yearPremiered" {...register('yearPremiered')} />
          <p>{errors.yearPremiered?.message}</p>
        </div>
        <input type="submit" value="save" />
        <input type="button" value="cancel" onClick={() => navigate('/main/movies/all-movies')} />
      </form>
    </div>
  )
}
