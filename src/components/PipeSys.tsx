import { Component } from "react";
import { Pipe } from "./Pipe";
import { TodoPropsPipeSys, TodoPropsPipe } from "../interfaces";
import { v4 as uuid } from "uuid";

export class PipeSys extends Component<TodoPropsPipeSys, any> {
  animationId: any;
  todoPropsPipe: TodoPropsPipe[];
  startingx: number;
  gap: number;
  upperPipeImgPath: string;
  lowerPipeImgPath: string;
  scale: number;
  lastUpdate: number;
  coordinateHandler: (pipe: TodoPropsPipe) => {};

  private randomInt(max: number, min: number): number {
    return Math.random() * (max - min) + min;
  }
  constructor(props: TodoPropsPipeSys) {
    super(props);
    this.startingx = 2000;
    this.gap = props.gap;
    this.upperPipeImgPath = props.upperPipeImgPath;
    this.lowerPipeImgPath = props.lowerPipeImgPath;
    this.scale = props.scale;
    this.lastUpdate = Date.now();
    this.coordinateHandler = props.coordinateHandler;

    const y = this.randomInt(600, 400);
    this.todoPropsPipe = [
      {
        upperPipeImgPath: props.upperPipeImgPath,
        lowerPipeImgPath: props.lowerPipeImgPath,
        scale: props.scale,
        keyId: uuid(),
        xPipeRight: this.startingx + 244 * props.scale,
        xPipeLeft: this.startingx,
        yLowerPipe: y,
        yUpperPipe: y - props.gap - 400,
        yUpperPipeEdge: y - this.props.gap,
      },
    ];

    this.state = {
      pipeComponents: this.todoPropsPipe,
      speed: props.speed,
    };
  }

  pipeGenerator = () => {
    const y = this.randomInt(600, 400);
    const tempCoordinates: TodoPropsPipe = {
      upperPipeImgPath: this.upperPipeImgPath,
      lowerPipeImgPath: this.lowerPipeImgPath,
      scale: this.scale,
      keyId: uuid(),
      xPipeRight: this.startingx + 244 * this.props.scale,
      xPipeLeft: this.startingx,
      yLowerPipe: y,
      yUpperPipe: y - this.props.gap - 400,
      yUpperPipeEdge: y - this.props.gap,
    };

    let updatedPipes = this.state.pipeComponents;
    updatedPipes.push(tempCoordinates);

    return updatedPipes;
  };

  updatePipePos = (position: TodoPropsPipe) => {
    position.xPipeRight -= this.state.speed;
    position.xPipeLeft -= this.state.speed;

    return position;
  };

  update = () => {
    let updatedList: TodoPropsPipe[];
    updatedList = [];

    for (let i = 0; i < this.state.pipeComponents.length; i++) {
      let tempCoordinate = this.updatePipePos(this.state.pipeComponents[i]);

      if (tempCoordinate.xPipeRight < -200) {
        continue;
      }
      updatedList.push(tempCoordinate);
    }

    if (Date.now() - this.lastUpdate > 1100) {
      const updatedPipe = this.pipeGenerator();
      this.setState({ pipeComponents: updatedPipe });
      this.lastUpdate = Date.now();
    } else {
      this.setState({ pipeComponents: updatedList });
    }

    this.coordinateHandler(updatedList[0]);
  };

  render = () => {
    // const temp = this.state.pipeComponents[0];

    // let temp;
    // if (this.state.pipeComponents.length === 1) {
    //   temp = this.state.pipeComponents[0];
    // } else {
    //   temp = this.state.pipeComponents[1];
    // }
    // this.coordinateHandler(temp);
    // console.log(temp.keyId);
    return (
      <div style={{ position: "absolute" }}>
        {this.state.pipeComponents.map((component: any) => (
          <Pipe key={component.keyId} {...component}></Pipe>
        ))}
      </div>
    );
  };
}
