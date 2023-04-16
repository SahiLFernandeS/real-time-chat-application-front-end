import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { POSTCALL } from "../../Services/Services";
import { API } from "../../API";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return alert("Please fill all the fields");
    }
    if (password !== confirmPassword) {
      return alert("Password doesn't natch confirm password");
    }
    const payload = {
      name: name,
      email: email,
      password: password,
    };
    POSTCALL(API.REGISTER, payload)
      .then((res) => {
        console.log("res------------>", res);
        sessionStorage.setItem("userName", email);
        navigate("/chat");
      })
      .catch((err) => {
        alert(err);
      });
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <Form>
      <Form.Group className="mb-2" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId="formPassword">
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

      <Form.Group className="mb-2" controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="mb-2 w-100"
        onClick={handleSignUp}
      >
        Sign Up
      </Button>
    </Form>
  );
}
