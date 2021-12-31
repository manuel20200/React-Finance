import React, { useRef, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

import classes from "./Register.module.css";

const initialState = {
  username: "",
  password: "",
  cash: 10000,
  stocks: [{}],
  transactions: [{}],
};

const Register = () => {
  const [isUserInvalid, setIsUserInvalid] = useState(null);
  const username = useRef();
  const password1 = useRef();
  const password2 = useRef();
  const navigate = useNavigate();
  const { setUserName, setIsLogging } = useContext(AuthContext);
  const { sendRequest } = useFetch();

  const createNewUserHandler = () => {
    if (
      password1.current.value === "" ||
      password1.current.value !== password2.current.value
    ) {
      return setIsUserInvalid("wrong password");
    }

    const applyData = async (data) => {
      for (let keys in data) {
        if (
          data[keys].username.toUpperCase() ===
          username.current.value.toUpperCase()
        ) {
          return setIsUserInvalid("exist");
        }
      }
      initialState.username = username.current.value;
      initialState.password = password1.current.value;
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
    <React.Fragment>
      <h1>Register New User</h1>
      <div style={{ height: "20px" }}></div>
      <input
        className={classes.inputSymbol}
        placeholder="new user"
        type="text"
        id="username"
        ref={username}
      ></input>
      <input
        className={classes.inputSymbol}
        placeholder="password"
        type="password"
        id="password1"
        ref={password1}
      ></input>
      <input
        className={classes.inputShares}
        placeholder="repeat password"
        type="password"
        id="password2"
        ref={password2}
      ></input>
      <button className={classes.button} onClick={createNewUserHandler}>
        Register
      </button>
    </React.Fragment>
  );
};

export default Register;
