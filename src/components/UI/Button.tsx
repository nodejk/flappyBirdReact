import { buttonInterface } from "../../interfaces";
import classes from "./Button.module.css";

export const Button = (props: buttonInterface) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.displayString}
    </button>
  );
};

export default Button;
