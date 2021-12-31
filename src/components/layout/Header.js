import React, { useState, useContext, router } from "react";
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import classes from "./Header.module.css";

const Header = (props) => {
  const { userName, setUserName, isLogging, setIsLogging } = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        <span className={classes.blue}>C</span>
        <span className={classes.red}>S</span>
        <span className={classes.yellow}>5</span>
        <span className={classes.green}>0</span>
        <span className={classes.red}>Finance</span>
      </Link>
      {isLogging && (<ul className={classes.mainmenu}>
        <li>
          <Link to="/quote">Quote</Link>
        </li>
        <li>
          <Link to="/buy">Buy</Link>
        </li>
        <li>
          <Link to="/sell">Sell</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>)}
      {isLogging && (
        <ul className={classes.logout}>
          <li>
            <Link to="/configuration">Configuration</Link>
          </li>
          <li>
            <Link to="/login" onClick={() => {setIsLogging(false)}}>Logout</Link>
          </li>
        </ul>
      )}
      {!isLogging && (
        <ul className={classes.login}>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      )}
      <Outlet />
    </header>
  );
};

export default Header;
