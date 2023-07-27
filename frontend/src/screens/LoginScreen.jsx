import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Button,Form, Row, Col} from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../Slices/userApiSlice";
import { setCredential } from "../Slices/authSlice";
import Loader from "../components/Loader";




const LoginScreen = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [log, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state) => state.auth) //it can only takes the date

    useEffect(()=> {
            if(userInfo) {
              navigate('/')
            } 
    }, [navigate, userInfo])

    const handleSubmit = async(e) => {
        e.preventDefault();
       // console.log('submit')
       // selector data can be validated
       try {
        const res = await log({email, password}).unwrap();
        dispatch(setCredential({...res}))
        navigate('/')
       } catch (err) {
            toast.error(err?.data?.message || err.error);
       }
    }

  return (
    <FormContainer>

        <h2>Sign In</h2>
         <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2 " controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            {isLoading && <Loader/>}

            <Button type="submit" variant="primary" classname='mt-3'>
               Sign In
            </Button>

            <Row className="py-2">
            <Col>
            New Customer <Link to='/register'>Register</Link>
            </Col>
         </Row>
         
         </Form>

         
  
 
                
        
    </FormContainer>
  )
}

export default LoginScreen