import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';


const Update = () => {
    const [email,setEmail]=useState("");
    const [username,setUsername]=useState("");
    const [address,setAddress]=useState("");
    const [id, setID] = useState(null);
    const navigate = useNavigate();

useEffect(() => {
        setID(localStorage.getItem('ID'))
        setEmail(localStorage.getItem('Email'));
        setAddress(localStorage.getItem('address'));
        setUsername(localStorage.getItem('username'))
}, []);


    
    const updateData=()=>{
        const data={email,address,username}
        axios.put(`http://localhost:4000/users/${id}`,data)
        .then(() =>{
            navigate("/")
        })
    }


  return (
    <div>
        <h1>Update data</h1>
        <Form className="create-form">
    <Form.Field>
        <label>Username :</label>
        <input type="text" placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
    </Form.Field>
    <Form.Field>
        <label>Email : </label>
        <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
    </Form.Field>
    <Form.Field>
        <label>Address:</label>
        <textarea type="text" row="5" col="5" placeholder='Address' onChange={(e)=>setAddress(e.target.value)}></textarea>
    </Form.Field>
    <Button type='submit' onClick={updateData}>update</Button>
</Form></div>
  )
}

export default Update