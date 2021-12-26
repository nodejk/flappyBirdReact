import bird from "../assets/bird.png";

export const FlappyBird2 = (props: any) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 250,
        left: 150,
        width: 37,
        height: 26,
        backgroundImage: `url(${bird})`,
      }}
    ></div>
  );
};
