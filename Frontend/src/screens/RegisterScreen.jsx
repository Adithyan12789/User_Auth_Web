import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify';
import Loader from "../components/Loader.jsx";
import { useRegisterMutation } from "../Slices/usersApiSlice";


const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const nameHandler = (e) => {
        setName(e.target.value);
    }
    
    const emailHandler = (e) => {
        setEmail(e.target.value);
    }
    
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }
    
    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Password do not match');
        }else{
            try {
                await register({ name, email, password }).unwrap();
                navigate('/login')
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>

            <Form onSubmit={submitHandler}>

                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        required
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={nameHandler}
                    />
                </Form.Group>
                
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        required
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={emailHandler}
                    />
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={passwordHandler}
                    />
                </Form.Group>
                
                <Form.Group className="my-2" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        required
                        type="password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={confirmPasswordHandler}
                    />
                </Form.Group>

                {isLoading && (
                    <div className="loader-container">
                        <Loader />
                    </div>
                )}

                <Button type="submit" variant='primary' className="mt-3">
                    Sign Up
                </Button>

                <Row className="py-3">
                    <Col>
                        Already have an account? <Link to='/login'>Sign In</Link>
                    </Col>
                </Row>

            </Form>

        </FormContainer>
    )
}

export default RegisterScreen;
