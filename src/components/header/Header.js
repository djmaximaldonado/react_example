import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";
import './header.css';

const Header = () => (
  <div>
    <div className="header">
      <NavLink 
        to='/'
        exact
        className="header-item"
        activeClassName="active-header-item"> Home 
      </NavLink>

      <NavLink 
        to='/titles'
        exact
        className="header-item"
        activeClassName="active-header-item"> Titulos 
      </NavLink>

      <NavLink 
        to='/cart'
        exact
        className="header-item"
        activeClassName="active-header-item"> Cart 
      </NavLink>
    </div>
  </div>
);

export default Header;
