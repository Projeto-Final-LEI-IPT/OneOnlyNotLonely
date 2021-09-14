import React, { Component } from "react";
import "../App.css";
import {Container } from "reactstrap";
import mainlogo from '../img/LOGO.png'
import LoginButton from "../auth/LoginButton";
import HomeNavbar from "./HomeNavBar";

class Home extends Component {
  render() {
    return (
      <div>
        <HomeNavbar />
        <Container
          fluid
          style={{
            height: "400px",
            width: "400px",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute ", left: "30%", top: "50%" , margin:" -35px 0 0 -35px" }}>
            <img src = {mainlogo} style={{width:"200px", height:"200px"}} alt="Twinkle in your wrinkle logo" />
            <br />
            <LoginButton />
          </div>
        </Container>
      </div>
    );
  }
}
export default Home;
