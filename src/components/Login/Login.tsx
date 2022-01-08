import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../UI/Button";
import Input from "../UI/Input/Input";
import { useReducer, useContext } from "react";
import { DefaultBackGround } from "../../DefaultBackground";
import { Fragment } from "react";
import classes from "./Login.module.css";
import { AuthenticationContext } from "../../store/AuthProvider";
import FormValidity from "../../hooks/form";
import useHttpRequest from "../../hooks/use-https";
import { loginCredentials } from "../../interfaces";
import { resourceUsage } from "process";

// const SIGNUP_URL =
//   "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLQ-47Cs4QkPmsMShQv_O4UOqN0eoGkrE";

// const SIGNIN_URL =
//   "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLQ-47Cs4QkPmsMShQv_O4UOqN0eoGkrE";

const Login = () => {
  const { state: passwordState, dispatchAction: passwordDispatchAction } =
    FormValidity({
      value: "",
      isValid: false,
    });

  const { state: usernameState, dispatchAction: usernameDispatchAction } =
    FormValidity({
      value: "",
      isValid: false,
    });

  const [newUser, setNewUser] = useState(false);
  const [cancelNewAccount, setCancelNewAccount] = useState(false);

  const emailValidtor = (item: string) => item.includes("@");
  const passwordValidtor = (item: string) => item.length > 0;
  const authCtx = useContext(AuthenticationContext);

  const { error: error, sendRequest: loginRequest } = useHttpRequest();

  console.log("0-----");
  console.log(error);
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValidState(usernameState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [usernameState.isValid, passwordState.isValid, loginRequest]);

  const [formIsValidState, setFormIsValidState] = useState(false);

  const userNameSubmitHandler = (event: React.FormEvent) => {
    usernameDispatchAction({
      type: "INPUT",
      value: (event.target as HTMLInputElement).value,
      formValidLogic: emailValidtor,
    });
  };

  const passwordSubmitHandler = (event: React.FormEvent<HTMLInputElement>) => {
    passwordDispatchAction({
      type: "INPUT",
      value: (event.target as HTMLInputElement).value,
      formValidLogic: passwordValidtor,
    });
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(usernameState, passwordState);
    if (formIsValidState) {
      const requestConfiguration = {
        userType: newUser ? "NEW" : "OLD",
        method: "POST",
        body: {
          email: usernameState.value,
          password: passwordState.value,
          returnSecureToken: true,
        },
      };

      const transformData = (data: {
        uid: string;
        email: string;
        password: string;
      }) => {
        console.log("here is the data given in login component");
        console.log(data);
        authCtx.onLogin(data);
      };

      loginRequest(requestConfiguration, transformData);
    }
  };

  const newUserSubmitHandler = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewUser(true);
  };

  const invalidCredentials = () => {
    if (error === "INVALID_EMAIL") {
      return (
        <p
          style={{ position: "absolute", left: "40px", color: "red" }}
        >{`enter a valid email >_<`}</p>
      );
    } else if (error === "EMAIL_EXISTS") {
      return (
        <p
          style={{
            position: "absolute",
            left: "40px",
            textAlign: "center",
            marginTop: "10px",
            color: "red",
          }}
        >{`this email is already in use :(`}</p>
      );
    } else if (error.includes("WEAK_PASSWORD")) {
      return (
        <p
          style={{
            position: "absolute",
            left: "40px",
            textAlign: "center",
            marginTop: "10px",
            color: "red",
          }}
        >{`toughen up a bit -_-`}</p>
      );
    } else if (error.includes("EMAIL_NOT_FOUND")) {
      return (
        <p
          style={{
            position: "absolute",
            left: "40px",
            textAlign: "center",
            marginTop: "10px",
            color: "red",
          }}
        >{`email not found :(`}</p>
      );
    } else if (error.includes("INVALID_PASSWORD")) {
      return (
        <p
          style={{
            position: "absolute",
            left: "40px",
            textAlign: "center",
            marginTop: "10px",
            color: "red",
          }}
        >{`check your password!!1!`}</p>
      );
    }
  };

  const cancelOperationHandler = (event: React.FormEvent) => {
    setNewUser(false);
  };

  const newUserDisplay = () => {
    if (newUser === true) {
      return <p className={classes.label}>ola newbie~</p>;
    } else {
      return <p className={classes.label}>Hello, login to play :)</p>;
    }
  };

  return (
    <Fragment>
      <div className={classes.login}>
        {newUserDisplay()}
        <br></br>
        <br></br>
        <form onSubmit={submitHandler}>
          <Input
            type="username"
            id="username"
            label="username"
            value={usernameState.value}
            onChangeHandler={userNameSubmitHandler}
          ></Input>
          <br></br>
          <br></br>
          <Input
            type="password"
            id="password"
            label="password"
            value={passwordState.value}
            onChangeHandler={passwordSubmitHandler}
          ></Input>
          <div className={classes.container}>
            <div className={classes["vertical-center"]}>
              <Button
                displayString={newUser ? "sign up!" : "login"}
                onClick={submitHandler}
              ></Button>
              {!newUser && (
                <Button
                  displayString={"new user?"}
                  onClick={newUserSubmitHandler}
                ></Button>
              )}
              {newUser && (
                <Button
                  displayString={"back?"}
                  onClick={cancelOperationHandler}
                ></Button>
              )}
              {invalidCredentials()}
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
