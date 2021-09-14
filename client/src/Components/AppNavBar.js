import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "../App.css";
import LogoutButton from "../auth/LogoutButton";
import logo from "../img/LOGO.png"

export default class AppNavbar extends Component {
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>
          <a href= "/map">
          <img src={logo}  alt ="Twinkle in your wrinkle logo" style={{height:"40px", width:"40px"}} />
          </a>
        </NavbarBrand>
        <div className="float-right">
          <LogoutButton />
        </div>
      </Navbar>
    );
  }
}
