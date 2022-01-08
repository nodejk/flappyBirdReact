import React from "react";
import { useState, useEffect } from "react";
import { loginCredentials } from "../interfaces";
import { auth, db } from "../config/config";

import useHttpRequest from "../hooks/use-https";

export const AuthenticationContext = React.createContext({
  score: 0,
  loginEmail: "",
  password: "",
  uid: "",
  loginStatus: false,
  onLogin: (credentials: loginCredentials) => {},
  onLogout: () => {},
  scoreUpload: (scoreAchived: number) => {},
});

export const AuthenticationProvider: React.FC<{}> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [uid, setUID] = useState("");

  const [score, setScore] = useState(0);

  const { error: error, sendRequest: loginRequest } = useHttpRequest();

  const loginHandler = (credentials: loginCredentials) => {
    console.log("finaly here ");
    console.log("here are the creds");
    console.log(credentials);
    setUserEmail(credentials.email);
    setUID(credentials.uid);
    setUserPassword(credentials.password);
    setIsLoggedIn(true);
  };
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setUserEmail("");
    setUID("");
    setIsLoggedIn(false);
    auth.signOut();
  };

  const scoreHandler = async (scoreAchived: number) => {
    console.log("score is in the auth");
    console.log(scoreAchived);

    console.log(uid);

    // add score to personal
    const document = await db
      .collection("users")
      .doc(uid)
      .collection("gamesPlay")
      .add({
        score: scoreAchived,
        timestamp: new Date().toISOString(),
        uid: uid,
      });

    // add to all leaderboard
    const allGamesPlayed = await db.collection("gamesPlayed").add({
      score: scoreAchived,
      timestamp: new Date().toISOString(),
      uid: uid,
      userEmail: userEmail,
    });
  };

  const defaultAuthenticationState = {
    score: score,
    loginEmail: userEmail,
    password: userPassword,
    loginStatus: isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    uid: uid,
    scoreUpload: scoreHandler,
  };

  return (
    <AuthenticationContext.Provider value={defaultAuthenticationState}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
