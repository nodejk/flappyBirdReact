import { buttonInterface } from "../../interfaces";
import classes from "./Button.module.css";

export const Button = (props: buttonInterface) => {
  return (
    <button
      className={classes.button}
      // style={{ position: "absolute", left: left, top: top }}
      onClick={props.onClick}
    >
      {props.displayString}
    </button>
  );
};

export default Button;
