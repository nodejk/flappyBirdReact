import classes from "./ScoreCard.module.css";

const ScoreCard: React.FC<{ score: number }> = (props) => {
  return <span className={classes.text}>{`Score:` + props.score}</span>;
};

export default ScoreCard;
