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

    const y = this.randomInt(500, 275);
    this.todoPropsPipe = [
      {
        upperPipeImgPath: props.upperPipeImgPath,
        lowerPipeImgPath: props.lowerPipeImgPath,
        coordinateHandler: null,
        scale: props.scale,
        keyId: uuid(),
        xPipeRight: this.startingx + 244 * props.scale,
        xPipeLeft: this.startingx,
        yLowerPipe: y + props.gap / 2,
        yUpperPipe: y - props.gap - 400,
      },
    ];

    this.state = {
      pipeComponents: this.todoPropsPipe,
      speed: props.speed,
    };
  }

  pipeGenerator = () => {
    const y = this.randomInt(500, 175);
    const tempCoordinates = {
      upperPipeImgPath: this.upperPipeImgPath,
      lowerPipeImgPath: this.lowerPipeImgPath,
      coordinateHandler: null,
      scale: this.scale,
      key: uuid(),
      xPipeRight: this.startingx,
      xPipeLeft: this.startingx + 244 * this.props.scale,
      yLowerPipe: y + this.props.gap / 2,
      yUpperPipe: y - this.props.gap - 400,
    };

    let oldPipes = this.state.pipeComponents;
    oldPipes.push(tempCoordinates);

    // this.setState({ pipeComponents: oldPipes });
    return oldPipes;
  };

  updatePipePos = (position: TodoPropsPipe) => {
    // const temp = {TodoPropsPipe.xPipeRight = TodoPropsPipe.xPipeRight - }
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
  };

  render = () => {
    console.log("pipes: ", this.state.pipeComponents.length);
    return (
      <div style={{ position: "absolute" }}>
        {this.state.pipeComponents.map((component: any) => (
          <Pipe key={component.keyId} {...component}></Pipe>
        ))}
      </div>
    );
  };
}

// this.animationId = 0;
// this.interval = 0;

// const tempPipe = React.createRef();
// this.componentsToUpdate = [{ pipe: tempPipe, keyId: 0 }];

// this.todoPropsPipe = {
//   upperPipeImgPath: props.upperPipeImgPath,
//   lowerPipeImgPath: props.lowerPipeImgPath,
//   scale: props.scale,
//   gap: props.scale,
//   speed: props.speed,
//   coordinateHandler: this.getPipeCoordinates,
//   keyId: 0,
// };

// this.state = {
//   speed: props.speed,
//   pipeComponents: [{ pipe: tempPipe, keyId: 0 }],
// };
// this.pipeTimer = Date.now();
// }

// timerSpeed() {}

// getPipeCoordinates = (pipecoordinates: any) => {
// const xPipeRight = pipecoordinates.xPipeRight;
// const key = pipecoordinates.keyId;
// // console.log(key);
// let removeKey = 0;
// let flag = false;

// for (let i = 0; i < this.componentsToUpdate.length; i++) {
//   if (this.state.pipeComponents[i].keyId === key) {
//     removeKey = i;
//     flag = true;
//     break;
//   }
// }
// // console.log(removeKey, );
// console.log("before: ", this.componentsToUpdate.length);

// if (xPipeRight < 0) {
//   // const oldPipes =  this.componentsToUpdate;

//   // oldPipes.splice(removeKey, 1);

//   let oldPipes = this.componentsToUpdate.filter(
//     (item) => item.keyId !== key
//   );
//   // console.log("old pipe", oldPipes.length, xPipeRight);

//   // console.log("popping pipes");
//   this.componentsToUpdate = oldPipes;
//   console.log("after: ", this.componentsToUpdate.length);
// }
// };

// updatePipeState = () => {
// let e = Math.random();

// let te = React.createRef();

// // let te = React.forwardRef(<Pipe {...this.todoPropsPipe}></Pipe>);
// // let te = new ComponentLifecycle<Pipe>();

// const temp = {
//   pipe: te,
//   keyId: e,
// };

// const oldPipes = this.state.pipeComponents;
// oldPipes.push(temp);

// this.setState({ pipeComponents: oldPipes });

// // console.log("componets before: ", this.componentsToUpdate.length);
// // console.log("componets after: ", this.componentsToUpdate.length);
// console.log("setting state");
// this.componentsToUpdate = this.state.pipeComponents;
// };
// componentDidMount = () => {
// console.log("componentDidMount");

// this.animationId = window.requestAnimationFrame(() => this.update());
// setInterval(this.updatePipeState, 400);
// };

// componentWillUnmount = () => {
// window.cancelAnimationFrame(this.animationId);
// };

// update = () => {
// // this.componentsToUpdate = this.state.pipeComponents;

// // console.log(this.componentsToUpdate);

// this.componentsToUpdate
//   .filter((component) => {
//     return component.pipe.current !== null;
//   })
//   .map((component: any) => component.pipe.current.update());

// // this.componentsToUpdate.map((component: any) =>
// //   component.pipe.current.update()
// // );

// // console.log("setting new state");

// this.animationId = window.requestAnimationFrame(() => this.update());

// // if (Date.now() - this.pipeTimer > 300) {

// //   // this.state.componentsToUpdate.push(temp);
// //   this.pipeTimer = Date.now();
// //   // console.log("added new state");
// // }
// };

// render = () => {
// console.log("rendered state");
// // console.log(this.componentsToUpdate[0].pipe);

// // const prevState = this.state.pipeComponents;
// return (
//   <div>
//     {this.componentsToUpdate.map((component: any, index: number) => (
//       <Pipe
//         key={component.keyId}
//         ref={component.pipe}
//         {...{ ...this.todoPropsPipe, keyId: component.keyId }}
//       ></Pipe>
//     ))}
//   </div>
// );
// };
