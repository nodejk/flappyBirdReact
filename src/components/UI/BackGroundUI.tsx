import classes from "./BackGround.module.css";

export const BackGroundUI = (props: any) => {
  return (
    <div className={`${classes.App} ${props.className}`}>{props.children}</div>
  );
};
