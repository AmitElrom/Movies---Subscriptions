import React, { useEffect, useState } from 'react'
import { Member } from '../member comp/Member'
import {getItems} from '../../utils/inSiteUtils'
import './AllMembers.css'

export const AllMembers = () => {

  const [members,setMembers] = useState([]);
  const [memberIdDeleted,setMemberIdDeleted] = useState('');

  useEffect(() =>
  {  
    (async () => {
      let {data} = await getItems('members')

      let memberIdFromSS = JSON.parse(sessionStorage.getItem('selected_member_id'))
      sessionStorage.removeItem('selected_member_id')
      if(memberIdFromSS !== null) 
      {
        setMembers(data.filter(x => x._id == memberIdFromSS))
      }
      else
      {
        setMembers(data)
      }
    })();
  }, [])

  useEffect(() =>
  {
    setMembers(members.filter(member =>
      {
        return member._id !== memberIdDeleted;
      }))
  }, [memberIdDeleted])

  const handleCallback = (childData) => setMemberIdDeleted(childData)

  const membersComps = members.map(member =>
    {
      return(
        <Member key={member._id} memberData={member} parentCallback={handleCallback} />
      )
    })

  return (
    <div className='members_div'>
        <h2>All Members</h2>
        {membersComps}
    </div>
  )
}
