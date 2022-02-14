import React, { useRef, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

import classes from "./Register.module.css";

const initialState = {
  username: "",
  password: "",
  cash: 10000,
  stocks: [{ avoid: "avoid" }],
  transactions: [{ avoid: ["avoid", "avoid", 0, 0, "1970-01-01"] }],
};

const Register = () => {
  const [isUserInvalid, setIsUserInvalid] = useState(null);
  const usernameRef = useRef();
  const password1Ref = useRef();
  const password2Ref = useRef();
  const navigate = useNavigate();
  const { setUserName, setIsLogging } = useContext(AuthContext);
  const { sendRequest } = useFetch();

  const createNewUserHandler = () => {
    if (
      password1Ref.current.value === "" ||
      password1Ref.current.value !== password2Ref.current.value
    ) {
      return setIsUserInvalid("wrong password");
    }

    const applyData = async (data) => {
      for (let keys in data) {
        if (
          data[keys].username.toUpperCase() ===
          usernameRef.current.value.toUpperCase()
        ) {
          return setIsUserInvalid("exist");
        }
      }
      initialState.username = usernameRef.current.value;
      initialState.password = password1Ref.current.value;
      await sendRequest({
        url: "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users.json",
        method: "POST",
        body: initialState,
      });
      setIsUserInvalid("valid");
      setUserName(initialState.username);
      setIsLogging(true);
      navigate("/");
    };
    sendRequest(
      {
        url: "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users.json",
      },
      applyData
    );
  };

  if (isUserInvalid === "exist") {
    return <h1>User already exists, use another one.</h1>;
  } else if (isUserInvalid === "wrong password") {
    return <h1>Confirmation of password is incorrect.</h1>;
  }

  return (
    <section>
      <h1>Register New User</h1>
      <div style={{ height: "20px" }}></div>
      <form onSubmit={createNewUserHandler}>
        <input
          className={classes.inputSymbol}
          placeholder="new user"
          type="text"
          id="username"
          ref={usernameRef}
        ></input>
        <input
          className={classes.inputSymbol}
          placeholder="password"
          type="password"
          id="password1"
          ref={password1Ref}
        ></input>
        <input
          className={classes.inputShares}
          placeholder="repeat password"
          type="password"
          id="password2"
          ref={password2Ref}
        ></input>
        <button className={classes.button}>Register</button>
      </form>
    </section>
  );
};

export default Register;
