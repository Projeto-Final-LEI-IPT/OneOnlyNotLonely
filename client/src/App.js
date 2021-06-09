import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import AppRouter from '../src/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

ReactDOM.render(<AppRouter />, document.getElementById('root'));

const Header = () => {
  return (
    <header>
      <h1>Box Management App</h1>
      <hr />
      <div className="links">
        <NavLink to="/" className="link" activeClassName="active" exact>
          Box List
        </NavLink>
        <NavLink to="/add" className="link" activeClassName="active">
          Add Box
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
