import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { POSTCALL } from "../../Services/Services";
import { API } from "../../API";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please fill all the fields");
    }
    const payload = { email: email, password: password };
    setEmail("");
    setPassword("");
    POSTCALL(API.LOGIN, payload)
      .then((res) => {
        console.log("res---------->", res);
        sessionStorage.setItem("userName", email);
        navigate("/chat");
      })
      .catch((err) => {
        // console.log("err------------->", err);
        alert(err);
      });
  };

  const handleGuest = () => {
    setEmail("guest@sahil.com");
    setPassword("1234");
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mb-2 w-100"
          onClick={loginHandler}
        >
          Login
        </Button>
        <Button
          variant="danger"
          type="button"
          className="mb-2 w-100"
          onClick={handleGuest}
        >
          Guest Login
        </Button>
      </Form>
    </>
  );
}
