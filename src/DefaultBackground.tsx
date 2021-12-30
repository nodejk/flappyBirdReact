import upperPipe from "./assets/upperPipe.png";
import lowerPipe from "./assets/lowerPipe.png";
import { TodoPropsPipeSys } from "./interfaces";
import React from "react";
import { PipeSys } from "./components/PipeSys";
import { Background } from "./components/Background";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { BackGroundUI } from "./components/UI/BackGroundUI";

export class DefaultBackGround extends React.Component<any, any> {
  pipeSys: any;
  pipe: any;

  componentsToUpdate: React.Component[];
  animationId: number;

  todoPropsPipeSys: TodoPropsPipeSys;
  portalElement: HTMLElement;

  constructor(props: any) {
    super(props);
    this.portalElement = document.getElementById("overlay")!;

    this.todoPropsPipeSys = {
      upperPipeImgPath: upperPipe,
      lowerPipeImgPath: lowerPipe,
      scale: 0.4,
      gap: 250,
      speed: 8,
      coordinateHandler: () => {},
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
      <Fragment>
        {ReactDOM.createPortal(
          <BackGroundUI>
            <Background></Background>
          </BackGroundUI>,
          this.portalElement
        )}

        {ReactDOM.createPortal(
          <BackGroundUI>
            <PipeSys ref={this.pipeSys} {...this.todoPropsPipeSys}></PipeSys>
          </BackGroundUI>,
          this.portalElement
        )}
      </Fragment>
    );
  }
}
