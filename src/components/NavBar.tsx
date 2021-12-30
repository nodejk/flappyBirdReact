import { Link } from "react-router-dom";
// import classes from "./NavBar.css";
import "./NavBar.css";
import { useContext } from "react";
import { AuthenticationContext } from "../store/AuthProvider";
// import { MainMenuCard } from "./UI/MainMenuCard";
import Button from "./UI/Button";

export const NavBar = (props: any) => {
  return (
    <div className="heading">
      <h2>Welcome to the game ฅ^•ﻌ•^ฅ</h2>
      <br></br>
      <Button displayString={"Play!"} onClick={props.onStart}></Button>
      <br></br>
      <br></br>
      <Button displayString={"Leader Board"} onClick={props.onEnd}></Button>
    </div>
  );
};
