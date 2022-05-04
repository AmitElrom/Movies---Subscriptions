import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {getItem} from '../../utils/inSiteUtils'
import axios from 'axios'
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


export const EditMember = () => {

    const { register, handleSubmit, setValue, formState : { errors } } = useForm({
        resolver : yupResolver(schema)
    })

    const {id} = useParams();
    const navigate = useNavigate();
    
    const [member,setMember] = useState({_id : '', name : '', email : '', city : ''})

    const {_id, name, email, city} = member;

    useEffect(() =>
    {
        (async () => {
            let {data} = await getItem('members', id)
            setMember(data)
        })();
    }, [id])

    useEffect(() => {
        setValue('name',name)
        setValue('city',city)
        setValue('email',email)
    },[member])

    const submitForm = async (data) =>
    {
        let name = titleCase(data.name)
        let city = titleCase(data.city)

      const member = {...data,name,city}

        await axios.put(`http://localhost:1938/members/${_id}`, member)
        alert('member updated')
        navigate('/main/subscriptions/all-members')
    }

    return (
        <div>
            <h3>Edit Member - {name}</h3>
            <form onSubmit={handleSubmit(submitForm)}>
                Name : <input type="text" name='name' {...register('name')} /> <br />
                <p>{errors.name?.message}</p>
                Email : <input type="text" name='email' {...register('email')} /> <br />
                <p>{errors.email?.message}</p>
                City : <input type="text" name='city' {...register('city')} /> <br />
                <p>{errors.city?.message}</p>
                <input type="submit" value="update" />
                <input type="button" value="cancel" onClick={() => navigate('/main/subscriptions/all-members')} />
            </form>
        </div>
    )
}
