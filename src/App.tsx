import { Game } from "./Game";
// import "./App.css";
import { NavBar } from "./components/NavBar";
import { Fragment, useState, useContext } from "react";
import { DefaultBackGround } from "./DefaultBackground";
import { BackGroundUI } from "./components/UI/BackGroundUI";
import {
  AuthenticationContext,
  AuthenticationProvider,
} from "./store/AuthProvider";
import Button from "./components/UI/Button";
import { ScoreList } from "../src/components/scoreList";

import Login from "./components/Login/Login";
function App() {
  const [gameState, setgameState] = useState(false);
  const [scoreBoard, setScoreBoard] = useState(false);
  const [leaderBoard, setLeaderBoard] = useState(false);

  const authCtx = useContext(AuthenticationContext);

  const gameStartHandler = () => {
    setLeaderBoard(false);
    setScoreBoard(false);
    setgameState(true);
  };

  const gameEndHandler = (event: Event) => {
    event.stopPropagation();
    setgameState(false);
  };

  const scoreBoardHandler = (event: Event) => {
    event.preventDefault();
    let temp = !scoreBoard;
    setScoreBoard(temp);
  };

  const leaderBoardHandler = (event: Event) => {
    event.preventDefault();
    setLeaderBoard(!leaderBoard);
  };

  const gamescoreHandler = async (score: number) => {
    // console.log("the score is in App");
    // console.log(score);
    try {
      authCtx.scoreUpload(score);
    } catch (err) {
      console.log("here's the error from the app");
      console.log(err);
    }
  };

  return (
    <BackGroundUI>
      {!authCtx.loginStatus && <DefaultBackGround></DefaultBackGround>}
      {!authCtx.loginStatus && <Login></Login>}

      {authCtx.loginStatus && !gameState && (
        <DefaultBackGround></DefaultBackGround>
      )}
      {authCtx.loginStatus && !gameState && !leaderBoard && !scoreBoard && (
        <NavBar
          onStart={gameStartHandler}
          onEnd={gameEndHandler}
          leaderBoard={leaderBoardHandler}
          scoreBoard={scoreBoardHandler}
        ></NavBar>
      )}

      {authCtx.loginStatus && !leaderBoard && !scoreBoard && gameState && (
        <Fragment>
          <Game gameScoreHandler={gamescoreHandler}></Game>
          <BackGroundUI>
            <Button displayString={"back!"} onClick={gameEndHandler}></Button>
          </BackGroundUI>
        </Fragment>
      )}

      {authCtx.loginStatus && leaderBoard && !scoreBoard && !gameState && (
        <div>
          <Button displayString={"back!"} onClick={leaderBoardHandler}></Button>
          <h2 style={{ textAlign: "center", top: "-10px" }}>LeaderBoard</h2>
          <DefaultBackGround></DefaultBackGround>
          <ScoreList type={"LEADER_BOARD"}></ScoreList>
        </div>
      )}

      {authCtx.loginStatus && scoreBoard && !leaderBoard && !gameState && (
        <div>
          <Button displayString={"back!"} onClick={scoreBoardHandler}></Button>
          <h2 style={{ textAlign: "center", top: "-10px" }}>Scoreboard</h2>
          <DefaultBackGround></DefaultBackGround>
          <ScoreList type={"user"}></ScoreList>
        </div>
      )}
    </BackGroundUI>
  );
}

export default App;
