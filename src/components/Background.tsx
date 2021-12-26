import background from "../assets/background.png";

export const Background = (props: any) => {
  return (
    <div style={{ position: "absolute" }}>
      <img src={background} height={`auto`} width={1300}></img>
    </div>
  );
};

export default Background;
