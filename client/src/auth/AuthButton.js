import React from "react";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

const AuthButton= () =>{
    const {isAuthenticated} = useAuth0

    return isAuthenticated ? <LogoutButton /> : <LoginButton/>
}
export default AuthButton;