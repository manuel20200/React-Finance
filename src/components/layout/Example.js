import React, { useState } from "react";

import classes from "./Example.module.css";

const Example = (props) => {
  const [isLogging, setIsLogging] = useState(false);
  return (
    <header className={classes.header}>
      <a href="/" className={classes.logo}>
        <span className={classes.blue}>C</span>
        <span className={classes.red}>S</span>
        <span className={classes.yellow}>5</span>
        <span className={classes.green}>0</span>
        <span className={classes.red}>Finance</span>
      </a>
      <ul className={classes.mainmenu}>
        <li>
          <a href="/quote">Quote</a>
        </li>
        <li>
          <a href="/buy">Buy</a>
        </li>
        <li>
          <a href="/sell">Sell</a>
        </li>
        <li>
          <a href="/history">History</a>
        </li>
      </ul>
      {isLogging && (
        <ul className={classes.logout}>
          <li>
            <a href="/configuration">Configuration</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      )}
      {!isLogging && (
        <ul className={classes.login}>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/login">Log In</a>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Example;
