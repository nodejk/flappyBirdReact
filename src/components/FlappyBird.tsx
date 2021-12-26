import "./FlappyBird.css";
import { Component } from "react";
import bird from "../assets/dabird.png";
import { birdcoordinates, TodoPropsBird } from "../interfaces";

export class FlappyBird extends Component<TodoPropsBird, any> {
  constructor(props: TodoPropsBird) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      flap: false,
      imgPath: bird,
      lastFlap: Date.now(),
      currentFlap: Date.now(),
      max_jump: 70,
    };
  }

  update = (flag?: boolean) => {
    const dy = 5;
    const dy_down = 5;
    if (flag === true) {
      this.setState({ lastFlap: Date.now() });
    } else {
      if (Date.now() - this.state.lastFlap! < 200) {
        this.setState({ y: this.state.y - dy });

        if (this.state.y <= 100) {
          this.setState({ y: 100 });
        }
      } else {
        this.setState({ y: this.state.y + dy_down });
        if (this.state.y >= 600) {
          this.setState({ y: 600 });
        }
      }
    }
    this.getcoordinates();
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this.handleSpaceKey);
  };

  handleSpaceKey = (event: KeyboardEvent) => {
    const kc = event.keyCode;
    if (kc === 32) {
      this.update(true);
    }
  };

  getcoordinates = () => {
    let tempCoordinates: birdcoordinates = {
      xRight: this.state.x + 80,
      xLeft: this.state.x,
      yBottom: this.state.y + 60,
      yTop: this.state.y,
    };
    return this.props.coordinateHandler(tempCoordinates);
  };

  getImgPath = () => {
    return this.state.imgPath;
  };

  render = () => {
    return (
      <div
        style={{
          position: "absolute",
          top: `${this.state.y}px`,
          left: `${this.state.x}px`,
        }}
      >
        <img src={this.state.imgPath} height="60" width="80"></img>
      </div>
    );
  };
}
