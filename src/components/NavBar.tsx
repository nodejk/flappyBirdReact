import { navbarInterface } from "../interface";
import { Link } from "react-router-dom";
import "./NavBar.css";
// import { DefaultBackGround } from "../DefaultBackground";

export const NavBar = (props: any) => {
  return (
    // <DefaultBackGround>
    <nav>
      <div className="navbar">Welcome to the Game :)</div>
      <div className="links">
        <div className="linksTop">
          <Link to="/game">Play Game</Link>
        </div>
        <div className="links">
          <Link to="/leaderBoard">Leader board</Link>
        </div>
        <div className="links">
          <Link to="/chat">Chat with anyone?</Link>
        </div>
      </div>
    </nav>
    // {/* </DefaultBackGround> */}
  );
};
