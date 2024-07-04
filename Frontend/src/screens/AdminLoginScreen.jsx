import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'; 
import { useAdminLoginMutation } from "../Slices/adminApiSlice.js";
import { setCredentials } from "../Slices/adminAuthSlice.js";
import FormContainer from "../components/FormContainer";
import { toast } from 'react-toastify';
import Loader from "../components/Loader.jsx";

const AdminLoginScreen = () => {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useAdminLoginMutation();

    const { adminInfo } = useSelector((state) => state.auth);

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
            navigate("/admin/get-user")
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    useEffect(() => {
        if(adminInfo){
            navigate("/admin/get-user")
        }
    }, [navigate, adminInfo])

    return (
        <FormContainer>
            <h1>Admin Login</h1>

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

export default AdminLoginScreen;
