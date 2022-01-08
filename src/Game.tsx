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
import { PipeSys } from "./components/PipeSys";
import { Background } from "./components/Background";
import React from "react";
import ScoreCard from "../src/components/UI/ScoreCard";

interface scoreInterface {
  gameScoreHandler: (score: number) => void;
}

export class Game extends React.Component<scoreInterface, { score: number }> {
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
  score: number = 0;
  gameScoreHandler: Partial<{}> | undefined;

  constructor(props: scoreInterface) {
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

    this.flappybird = React.createRef();
    this.pipeSys = React.createRef();

    this.animationId = 0;

    this.componentsToUpdate = [this.flappybird, this.pipeSys];
    this.gameState = true;
  }

  componentDidMount() {
    this.animationId = window.requestAnimationFrame(() => this.update());
  }

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
    this.currentState = this.todoPropsBird.x - currentPipe.xPipeRight > 100;
    this.currentPipe = currentPipe;

    // upper pipe collision
    if (
      this.birdcoordinates.yTop <= currentPipe.yUpperPipeEdge &&
      this.birdcoordinates.xRight - currentPipe.xPipeLeft >= 2 &&
      currentPipe.xPipeRight > this.birdcoordinates.xLeft
    ) {
      this.gameState = false;
    }
    // lower pipe collision
    else if (
      this.birdcoordinates.yTop >= currentPipe.yLowerPipe &&
      this.birdcoordinates.xRight - currentPipe.xPipeLeft >= 2 &&
      currentPipe.xPipeRight > this.birdcoordinates.xLeft
    ) {
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
      this.gameState = false;
    } else {
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
      this.props.gameScoreHandler(this.state.score);
      return;
    }
  };

  render = () => {
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
