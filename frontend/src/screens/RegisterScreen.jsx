import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Button,Form, Row, Col} from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../Slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredential } from "../Slices/authSlice";
import Loader from "../components/Loader";



const RegisterScreen = () => {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector((state) => state.auth)


    useEffect(()=> {
        if(userInfo) {
          navigate('/')
        } 
}, [navigate, userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password != confirmPassword){
            toast.error('Password not correct')
        }else{
            try {
                const res = await register({name, email, password}).unwrap();
          dispatch(setCredential({...res}))
          navigate('/')
            } catch (err) {
                toast.error(err?.data?.message || err.error);
                
            }
        }
    
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>
         <Form onSubmit={handleSubmit}>

         <Form.Group className="my-2 " controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>



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

            <Form.Group className='my-2' controlId='confirmpassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            {isLoading && <Loader/>}

            <Button type="submit" variant="primary" classname='mt-3'>
               Sign Up
            </Button>


            <Row className="py-2">
            <Col>
            Already Have an Account <Link to='/login'>Sign In</Link>
            </Col>
         </Row>

         </Form>

        
  
 
                
        
    </FormContainer>
  )
}

export default RegisterScreen;