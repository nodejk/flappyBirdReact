import { inputPropsInterface } from "../../../interfaces";
import classes from "./Input.module.css";
const Input = (props: inputPropsInterface) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChangeHandler}
      ></input>
    </div>
  );
};

export default Input;
