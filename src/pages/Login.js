import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory} from "react-router-dom";
import { NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import loginMiddlewave from "../store/action/authAction"




export default function Login() {
  let history = useHistory();
  
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const login = (e) => {
    e.preventDefault();
    let user = { email: email, password: password }
    dispatch(loginMiddlewave(user))
  }
  if (isAuthenticated) {
    history.push('/jobs')
  }
  return (
   
    <div>
         <NavLink className="navbar navbar-expand-lg navbar-light bg-dark position-fixed style-nav" to="/#">
    <img
      class="logo-itviec"
      alt="itviec"
      src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
      width="108"
      height="42"
    />
  </NavLink>
  <div className ="top-100px login">
      <div>
      <h1 className = "style-login-text">Login</h1>
      <Form >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" onChange = {(e)=> setEmail(e.target.value)} placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange = {(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button
         onClick = {(e) => login(e)}
          variant="danger"
          type="button"
          className="submit"
        >
          Submit
        </Button>
      </Form>
      </div>

  </div>
      
    </div>
  );
}
