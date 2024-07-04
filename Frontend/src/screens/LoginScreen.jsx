import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'; 
import { useLoginMutation } from "../Slices/usersApiSlice";
import { setCredentials } from "../Slices/authSlice";
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify';
import Loader from "../components/Loader.jsx";

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }
    
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate("/")
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate("/")
        }
    }, [navigate, userInfo])

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
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

                {isLoading && (
                    <div className="loader-container">
                        <Loader />
                    </div>
                )}

                <Button type="submit" variant='primary' className="mt-3">
                    Sign In
                </Button>

                <Row className="py-3">
                    <Col>
                        New Customer? <Link to='/register'>Sign Up</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen;
