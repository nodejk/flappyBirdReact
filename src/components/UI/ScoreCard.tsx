import classes from "./ScoreCard.module.css";

export const ScoreCard = (props: any) => {
  return <span className={classes.text}>{`Score:` + props.score}</span>;
};

export default ScoreCard;
