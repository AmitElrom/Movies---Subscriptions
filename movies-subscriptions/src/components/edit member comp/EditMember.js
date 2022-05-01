import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {getItem} from '../../utils/inSiteUtils'
import axios from 'axios'

export const EditMember = () => {

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
    }, [_id])

    const handleChange = (e) =>
    {
        let {name,value} = e.target;
        setMember({...member, [name] : value})
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        await axios.put(`http://localhost:1938/members/${_id}`, member)
        alert('member updated')
        navigate('/main/subscriptions/all-members')
    }

    return (
        <div>
            <h3>Edit Member - {name}</h3>
            <form onSubmit={handleSubmit}>
                Name : <input type="text" name='name' value={name} onChange={handleChange} />
                Email : <input type="text" name='email' value={email} onChange={handleChange} />
                City : <input type="text" name='city' value={city} onChange={handleChange} />
                <input type="submit" value="update" />
                <input type="button" value="cancel" onClick={() => navigate('/main/subscriptions/all-members')} />
            </form>
        </div>
    )
}
