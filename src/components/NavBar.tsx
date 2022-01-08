import { Link } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import { AuthenticationContext } from "../store/AuthProvider";
import Button from "./UI/Button";

import React from "react";

interface navBarPropsInterface {
  onStart: (event: Event) => void;
  onEnd: (event: Event) => void;
  leaderBoard: (event: Event) => void;
  scoreBoard: (event: Event) => void;
}

export const NavBar: React.FC<navBarPropsInterface> = (props) => {
  const authCtx = useContext(AuthenticationContext);
  return (
    <div className="heading">
      <h2>Welcome to the game (＾▽＾)ﾉ♪</h2>
      <Button displayString={"play!"} onClick={props.onStart}></Button>
      <br></br>
      <br></br>
      <Button displayString={"scoreBoard"} onClick={props.scoreBoard}></Button>
      <br></br>
      <br></br>
      <Button
        displayString={"leaderBoard"}
        onClick={props.leaderBoard}
      ></Button>
      <br></br>
      <br></br>
      <Button displayString={"logout"} onClick={authCtx.onLogout}></Button>
    </div>
  );
};
