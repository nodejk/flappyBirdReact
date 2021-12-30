import { TodoPropsPipe } from "../interfaces";
import "./Pipe.css";

export const Pipe = (props: TodoPropsPipe) => {
  return (
    <div style={{ position: "absolute" }}>
      <div
        style={{
          position: "absolute",
          top: `${props.yLowerPipe}px`,
          left: `${props.xPipeLeft}px`,
        }}
      >
        <img
          src={props.lowerPipeImgPath}
          height={1000 * props.scale}
          width={244 * props.scale}
        ></img>
      </div>
      <div
        style={{
          position: "absolute",
          top: `${props.yUpperPipe}px`,
          left: `${props.xPipeLeft}px`,
        }}
      >
        <img
          src={props.upperPipeImgPath}
          height={1000 * props.scale}
          width={244 * props.scale}
        ></img>
      </div>
    </div>
  );
};
