import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../config/global';

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${API_URL}/login`, formData);
        console.log(response);
        if (response.data === 'Invalid User name or Password') {
            alert('Invalid User name or Password')
        } else if (response.data === 'Server Busy') {
            alert('Verify your email id');
        } else if (response?.status) {
            localStorage.setItem('useInfo', JSON.stringify(response.data));
            navigate('/home')
        }
    };    

    return (
        <Container>
            <h1>Login Form</h1>
            <Form onSubmit={ handleSubmit }>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' name='email' value={formData.email} autoComplete='on' onChange={handleChange} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name='password' value={formData.password} autoComplete='on' onChange={handleChange} required/>
                </Form.Group>
                <Button variant='primary' type='submit'>Login</Button>
            </Form>
        </Container>
    )
}

export default Login;
