import upperPipe from "./assets/upperPipe.png";
import lowerPipe from "./assets/lowerPipe.png";
import { TodoPropsPipeSys } from "./interfaces";
import React from "react";
import { PipeSys } from "./components/PipeSys";
import { Background } from "./components/Background";
import { Link } from "react-router-dom";

export class DefaultBackGround extends React.Component<any, any> {
  pipeSys: any;
  pipe: any;

  componentsToUpdate: React.Component[];
  animationId: number;

  todoPropsPipe: TodoPropsPipeSys;

  constructor(props: any) {
    super(props);

    this.todoPropsPipe = {
      upperPipeImgPath: upperPipe,
      lowerPipeImgPath: lowerPipe,
      scale: 0.4,
      gap: 250,
      speed: 8,
      coordinateHandler: null,
    };

    this.pipeSys = React.createRef();

    this.animationId = 0;

    this.componentsToUpdate = [this.pipeSys];
  }

  componentDidMount() {
    this.animationId = window.requestAnimationFrame(() => this.update());
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationId);
  }

  update = () => {
    this.componentsToUpdate.map((component: any) => component.current.update());
    this.animationId = window.requestAnimationFrame(() => this.update());
  };

  render() {
    return (
      <div style={{ position: "absolute" }}>
        <Background></Background>
        <PipeSys ref={this.pipeSys} {...this.todoPropsPipe}></PipeSys>
      </div>
    );
  }
}
