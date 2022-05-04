import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { titleCase, ListCase } from '../../utils/manipulateData'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


const required = 'is a required field';

const schema = yup.object().shape({
  name : yup.string().required(`Name ${required}`),
  city : yup.string().required(`City ${required}`),
  email : yup.string().email().required(`Email ${required}`),
})

export const AddMember = () => {

    const { register, handleSubmit, formState : { errors } } = useForm({
      resolver : yupResolver(schema)
    })
  
    const navigate = useNavigate()
  
    const [member,setMember] = useState({name : '', email : '', city : ''})

    const submitForm = async (data) =>
    {
      let name = titleCase(data.name)
      let city = titleCase(data.city)

      const member = {...data,name,city}
      
      await axios.post(`http://localhost:1938/members`, member)
      alert('new member created')
      navigate('/main/subscriptions/all-members')
    }
    
    return (
    <div>
        <h2>Add New Member</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          Name : <input type="text" name='name' {...register('name')} /> <br />
          <p>{errors.name?.message}</p>
          Email : <input type="text" name='email' {...register('email')} /> <br />
          <p>{errors.email?.message}</p>
          City : <input type="text" name='city' {...register('city')} /> 
          <p>{errors.city?.message}</p>

          <input type="submit" value="save" />
          <input type="button" value="cancel" onClick={() => navigate('/main/subscriptions/all-members')} />
        </form>
    </div>
  )
}
