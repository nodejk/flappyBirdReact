import { FlappyBird } from "./components/FlappyBird";
import bird from "./assets/dabird.png";
import upperPipe from "./assets/upperPipe.png";
import lowerPipe from "./assets/lowerPipe.png";
import { birdcoordinates, TodoPropsBird, TodoPropsPipeSys } from "./interfaces";
import React from "react";
import { PipeSys } from "./components/PipeSys";
import { Background } from "./components/Background";

export class Game extends React.Component<any, any> {
  flappybird: any;
  pipeSys: any;

  componentsToUpdate: React.Component[];
  animationId: number;

  todoPropsBird: TodoPropsBird;
  todoPropsPipe: TodoPropsPipeSys;

  birdcoordinates: birdcoordinates;

  constructor(props: any) {
    super(props);

    this.birdcoordinates = { xRight: 0, yTop: 0, xLeft: 0, yBottom: 0 };

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
      gap: 275,
      speed: 8,
      coordinateHandler: this.getPipeCoordinates,
    };

    this.flappybird = React.createRef();
    this.pipeSys = React.createRef();

    this.animationId = 0;

    this.componentsToUpdate = [this.flappybird, this.pipeSys];
  }

  componentDidMount() {
    this.animationId = window.requestAnimationFrame(() => this.update());
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationId);
  }

  getPipeCoordinates() {}

  getbirdCoordinates = (birdCoordinates: birdcoordinates) => {
    this.birdcoordinates = birdCoordinates;
  };

  update = () => {
    this.componentsToUpdate.map((component: any) => component.current.update());
    this.animationId = window.requestAnimationFrame(() => this.update());
  };

  render() {
    return (
      <div style={{ position: "absolute" }}>
        <Background></Background>
        <FlappyBird ref={this.flappybird} {...this.todoPropsBird}></FlappyBird>
        <PipeSys ref={this.pipeSys} {...this.todoPropsPipe}></PipeSys>
      </div>
    );
  }
}
