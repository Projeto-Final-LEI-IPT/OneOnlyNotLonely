import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "../index.css";
import LogoutButton from "../auth/LogoutButton";
import logo from "img/logo.png"

export default class AppNavbar extends Component {
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>
          <a href= "/map">
          <img src={logo}  alt ="Twinkle in your wrinkle logo" style={{height:"100px", width:"100px"}} />
          </a>
        </NavbarBrand>
        <div className="float-right">
          <LogoutButton />
        </div>
      </Navbar>
    );
  }
}