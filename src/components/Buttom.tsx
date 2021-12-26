import land from "../assets/fg.png";

export const Buttom = (props: any) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: 300,
        height: 100,
        backgroundImage: `url(${land})`,
      }}
    ></div>
  );
};
