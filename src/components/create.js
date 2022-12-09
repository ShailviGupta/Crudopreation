import React from 'react'
import {useState} from 'react'
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create(){
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [address,setAddress]=useState("");
    const navigate = useNavigate()
    
    

    const postData=()=>{
        const data = { email , username,address };
        if(username.trim().length <=4 || email==="" || address.trim().length<= 8){
            return alert("All Fields is mandantory!")
        }
        else{
        axios.post("http://localhost:4000/users" , data);
        navigate("/")
        }
    }
    return(
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
        <Button type='submit' onClick={postData}>Submit</Button>
    </Form>
)
}

