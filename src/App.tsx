import { Game } from "./Game";
// import "./App.css";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Fragment, useState, useContext } from "react";
import { DefaultBackGround } from "./DefaultBackground";
import { BackGroundUI } from "./components/UI/BackGroundUI";
import {
  AuthenticationContext,
  AuthenticationProvider,
} from "./store/AuthProvider";
import Button from "./components/UI/Button";
import ScoreCard from "./components/UI/ScoreCard";

function App() {
  const [gameState, setgameState] = useState(false);
  const [score, setScore] = useState(0);

  const gameStartHandler = () => {
    setgameState(true);
  };

  const gameEndHandler = (event: Event) => {
    event.stopPropagation();
    console.log("ending the game");
    setgameState(false);
  };

  return (
    <BackGroundUI>
      <AuthenticationProvider>
        {!gameState && <DefaultBackGround></DefaultBackGround>}
        {!gameState && (
          <NavBar onStart={gameStartHandler} onEnd={gameEndHandler}></NavBar>
        )}

        {/* {gameState && } */}
        {gameState && (
          <Fragment>
            <Game></Game>
            <BackGroundUI>
              <Button displayString={"back!"} onClick={gameEndHandler}></Button>
            </BackGroundUI>
          </Fragment>
        )}
      </AuthenticationProvider>
    </BackGroundUI>
  );
}

export default App;
