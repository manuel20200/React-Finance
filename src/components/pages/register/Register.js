import React, { useRef, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
//import { useNavigate } from "react-router-dom";

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
  const { setUserName, setIsLogging } = useContext(AuthContext);
  const { sendRequest, errorFb } = useFetch();

  const createNewUserHandler = async (event) => {
    event.preventDefault();
    const userName = usernameRef.current.value;
    const password = password1Ref.current.value;
    if (
      password1Ref.current.value === "" ||
      password1Ref.current.value !== password2Ref.current.value
    ) {
      return setIsUserInvalid("wrong password");
    }

    const AuthResponse = await sendRequest(
      {
        url: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDWXZCmt9T9yu3pQXCL8345_L-vsmAEOKs",
        method: "POST",
        body: {
          email: userName,
          password: password,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
      (data) => {
        return data;
      }
    );
    console.log("AuthResponse");
    console.log(AuthResponse);
    console.log(errorFb);

    if (AuthResponse.error) {
      //const res = await AuthResponse.json();
      console.log("res.email");
      console.log(AuthResponse);
      console.log(AuthResponse.error.message);
      console.log(AuthResponse.error.code);
      return setIsUserInvalid(AuthResponse.error.message);
    }

    initialState.username = userName;
    initialState.password = password;
    const FBResponse = await sendRequest(
      {
        url: "https://react-httprequest-2a14f-default-rtdb.firebaseio.com/users.json",
        method: "POST",
        body: initialState,
      },
      (data) => {
        return data;
      }
    );
    if (FBResponse !== null) {
      console.log("userName");
      console.log(userName);
      setIsUserInvalid("valid");
      setUserName(userName);
      setIsLogging(true);
    }
  };

  if (isUserInvalid !== "valid" && isUserInvalid !== null) {
    return <h1>Error: {isUserInvalid}</h1>;
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
