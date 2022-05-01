import React, { useEffect, useState } from 'react'
import './SubscriptionsWatched.css'
import { Link } from 'react-router-dom'

export const SubscriptionsWatched = ({subs}) => {

  const subsList = (
    <ul>
      {subs.map(sub =>
        {
          return(
            <li key={sub._id} onClick={() => sessionStorage.setItem('selected_member_id', JSON.stringify(sub.memberId))} >
              <Link to='/main/subscriptions/all-members'>
                {sub.memberDetails.name}
              </Link> - {sub.date.toString().slice(0,10)}
            </li>
          )
        })}
    </ul>
  )
  return (
    <div className='subscription_watched_div'>
        <h4>Subscriptions Watched</h4>
        {subsList}
    </div>
  )
}
