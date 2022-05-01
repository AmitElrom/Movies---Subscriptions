import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AddMember = () => {
  
    const navigate = useNavigate()
  
    const [member,setMember] = useState({name : '', email : '', city : ''})

    const titleCase = (str) => 
    {
      return str.split(/[\s,\t,\n]+/)
        .map(s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()).join(" ")
    } 
  
    const handleChange = (e) =>
    {
        let {name,value} = e.target;
        if(name !== 'email')
        {
          let newVal = titleCase(value)
          setMember({...member, [name] : newVal})
        }
        else
        {
          setMember({...member, [name] : value})
        }
        console.log(member);
    }

    const handleSubmit = async (e) =>
    {
      e.preventDefault();
      
      await axios.post(`http://localhost:1938/members`, member)
      alert('new member created')
      navigate('/main/subscriptions/all-members')
    }
    
    return (
    <div>
        <h2>Add New Member</h2>
        <form onSubmit={handleSubmit}>
          Name : <input type="text" name='name' onChange={handleChange} /> <br />
          Email : <input type="text" name='email' onChange={handleChange} /> <br />
          City : <input type="text" name='city' onChange={handleChange} /> <br /><br />
          <input type="submit" value="save" />
          <input type="button" value="cancel" onClick={() => navigate('/main/subscriptions/all-members')} />
        </form>
    </div>
  )
}
