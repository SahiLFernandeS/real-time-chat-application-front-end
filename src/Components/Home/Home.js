import React from "react";
import { Container, Row, Tabs, Tab } from "react-bootstrap";
import "./Home.css";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

export default function Home() {
  return (
    <Container fluid className="main">
      <Row className="box1 m-5">
        <h1>Whats Up (The Real Time Chat Application)</h1>
      </Row>
      <Row className="box1 m-5">
        <Tabs
          id="left-tabs-example"
          defaultActiveKey="login"
          className="m-2"
          justify
        >
          <Tab eventKey="login" title="Login">
            <Login />
          </Tab>
          <Tab eventKey="sign up" title="Sign Up">
            <SignUp />
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}
