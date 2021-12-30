import React from "react";
import { useState } from "react";

// add user authentication on the after revising mongodb >//<

export const AuthenticationContext = React.createContext({
  score: 0,
  loginUserName: "",
  loginPassWord: "",
  loginStatus: false,
});

export const AuthenticationProvider = (props: any) => {
  const defaultAuthenticationState = {
    score: 0,
    loginUserName: "",
    loginPassWord: "",
    loginStatus: false,
  };

  return (
    <AuthenticationContext.Provider value={defaultAuthenticationState}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
