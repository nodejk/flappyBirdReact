import { Component } from "react";
import { FlappyBird } from "./components/FlappyBird";

interface props {
  title: String;
  bird: FlappyBird;
}

export class GamePlay extends Component<props> {
  public state: { bird: FlappyBird };
  constructor(props: props) {
    super(props);
    // this.state = { hasError: false };
    this.state = { bird: props.bird };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleSpaceKey);
  }

  handleSpaceKey = (event: KeyboardEvent) => {
    const kc = event.keyCode;

    if (kc === 32) {
      console.log("space key pressed");
      // this.state.bird.trigger();
      // this.setState(null, () => {this.});
    }
  };
  render = () => {
    // if (this.state.hasError) {
    //   console.log("rendering the error");
    //   return <h1>Something is wrong </h1>;
    // }
    // console.log("rendering the bird");
    return (
      <div>
        {/* <this.state.bird.displayBird></this.state.bird.displayBird> */}
      </div>
    );
  };
}
