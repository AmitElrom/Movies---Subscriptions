import React from 'react'
import './Member.css'
import { MoviesWatched } from '../movies watched comp/MoviesWatched'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Member = ({parentCallback, memberData : {_id, name, email, city, allMemberSubs}}) => {

    const navigate = useNavigate();

    const deleteMember = async () =>
    {
      await axios.delete("http://localhost:1938/members/" + _id)
      parentCallback(_id)
      alert('member deleted')
    }

  return (
    <div className='member_div'>
        <h4>{name}</h4>
        Email : {email} <br />
        City : {city} <br />
        <input type="button" value="edit" onClick={() => navigate(`/main/subscriptions/${_id}`)} />
        <input type="button" value="delete" onClick={deleteMember} />
        <MoviesWatched subs={allMemberSubs} id={_id} />
    </div>
  )
}
