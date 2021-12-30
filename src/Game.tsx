import { FlappyBird } from "./components/FlappyBird";
import bird from "./assets/dabird.png";
import upperPipe from "./assets/upperPipe.png";
import lowerPipe from "./assets/lowerPipe.png";
import {
  birdcoordinates,
  TodoPropsBird,
  TodoPropsPipe,
  TodoPropsPipeSys,
} from "./interfaces";
import { Fragment } from "react";
import { PipeSys } from "./components/PipeSys";
import { Background } from "./components/Background";
import React from "react";
import ScoreCard from "../src/components/UI/ScoreCard";
import ReactDOM from "react-dom";
import { BackGroundUI } from "./components/UI/BackGroundUI";

export class Game extends React.Component<any, any> {
  flappybird: any;
  pipeSys: any;

  componentsToUpdate: React.Component[];
  animationId: number;

  todoPropsBird: TodoPropsBird;
  todoPropsPipe: TodoPropsPipeSys;

  birdcoordinates: birdcoordinates;

  pipeId: String;

  lastState: boolean;
  currentState: boolean;

  gameState: boolean;
  currentPipe: any;

  constructor(props: any) {
    super(props);

    this.birdcoordinates = { xRight: 0, yTop: 0, xLeft: 0, yBottom: 0 };

    this.pipeId = "";

    this.state = { score: 0 };
    this.lastState = false;
    this.currentState = false;

    this.todoPropsBird = {
      x: 50,
      y: 250,
      imgPath: bird,
      coordinateHandler: this.getbirdCoordinates,
    };

    this.todoPropsPipe = {
      upperPipeImgPath: upperPipe,
      lowerPipeImgPath: lowerPipe,
      scale: 0.4,
      gap: 230,
      speed: 8,
      coordinateHandler: this.getPipeCoordinates,
    };

    // this.currentPipe = this.todoPropsBird;

    this.flappybird = React.createRef();
    this.pipeSys = React.createRef();

    this.animationId = 0;

    this.componentsToUpdate = [this.flappybird, this.pipeSys];
    this.gameState = true;
  }

  componentDidMount() {
    // window.addEventListener("keydown", this.handleSpaceKey);
    this.animationId = window.requestAnimationFrame(() => this.update());
  }

  // handleSpaceKey = (event: KeyboardEvent) => {
  //   const kc = event.keyCode;
  //   if (kc === 32) {

  //   }
  // };

  scoreCal = () => {
    if (this.currentState === true && this.lastState === false) {
      this.lastState = this.currentState;
      this.setState({ score: this.state.score + 1 });
    } else if (this.currentState == false && this.lastState == true) {
      this.lastState = false;
    }
  };

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationId);
  }

  getPipeCoordinates = (currentPipe: TodoPropsPipe) => {
    // console.log(this.todoPropsBird.x, pipe.xPipeRight, pipe.xPipeLeft);
    this.currentState = this.todoPropsBird.x - currentPipe.xPipeRight > 100;
    this.currentPipe = currentPipe;

    // upper pipe collision
    console.log(
      currentPipe.yUpperPipeEdge,
      this.birdcoordinates.yTop,
      this.birdcoordinates.yBottom,
      currentPipe.xPipeRight,
      this.birdcoordinates.xLeft
    );
    if (
      this.birdcoordinates.yTop <= currentPipe.yUpperPipeEdge &&
      this.birdcoordinates.xRight - currentPipe.xPipeLeft >= 2 &&
      currentPipe.xPipeRight > this.birdcoordinates.xLeft
    ) {
      console.log("1");
      this.gameState = false;
    }
    // lower pipe collision
    else if (
      this.birdcoordinates.yTop >= currentPipe.yLowerPipe &&
      this.birdcoordinates.xRight - currentPipe.xPipeLeft >= 2 &&
      currentPipe.xPipeRight > this.birdcoordinates.xLeft
    ) {
      console.log("2");
      this.gameState = false;
    }
    // in-between pipe collision
    else if (
      this.birdcoordinates.xRight > currentPipe.xPipeLeft &&
      this.birdcoordinates.xLeft < currentPipe.xPipeRight &&
      currentPipe.xPipeRight > this.birdcoordinates.xLeft &&
      (this.birdcoordinates.yTop < currentPipe.yUpperPipeEdge ||
        this.birdcoordinates.yBottom > currentPipe.yLowerPipe)
    ) {
      console.log("3");
      this.gameState = false;
    } else {
      console.log("continue");
      // return true;
    }

    this.scoreCal();
  };

  getLastPipeCoordinates() {}

  getbirdCoordinates = (birdCoordinates: birdcoordinates) => {
    this.birdcoordinates = birdCoordinates;
  };

  update = () => {
    this.componentsToUpdate.map((component: any) => component.current.update());

    if (this.gameState) {
      this.animationId = window.requestAnimationFrame(() => this.update());
    } else {
      console.log(this.birdcoordinates);
      console.log(this.currentPipe);
    }
    // this.getPipeCoordinates();
  };

  render = () => {
    // console.log(this.score);
    return (
      <div>
        <Background></Background>
        <FlappyBird ref={this.flappybird} {...this.todoPropsBird}></FlappyBird>
        <PipeSys ref={this.pipeSys} {...this.todoPropsPipe}></PipeSys>
        <ScoreCard score={this.state.score}></ScoreCard>
      </div>
    );
  };
}
