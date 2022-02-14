import React, { useRef, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import classes from "./Login.module.css";

const Login = () => {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const { setUserName, setIsLogging } = useContext(AuthContext);
  const navigate = useNavigate();
  const submitLoginDataHandler = (event) => {
    event.preventDefault();
    setUserName(userNameRef.current.value);
    setIsLogging(true);
    navigate("/");
  };
  return (
    <section>
      <h1>Login page</h1>
      <div style={{ height: "20px" }}></div>
      <form onSubmit={submitLoginDataHandler}>
        <input
          className={classes.inputUser}
          placeholder="username"
          type="text"
          id="username"
          ref={userNameRef}
        ></input>
        <input
          className={classes.inputPassword}
          placeholder="password"
          type="text"
          id="password"
          ref={passwordRef}
        ></input>
        <button className={classes.button}>Login</button>
      </form>
    </section>
  );
};

export default Login;
