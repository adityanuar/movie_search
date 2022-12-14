import { useState } from "react";

const Card = ({ title, poster, year, type, color = "white", onClick }) => {
  const colorRGB = {
    yellow: [224, 216, 94, 1],
    blue: [47, 125, 235],
    green: [50, 230, 95],
    red: [247, 80, 77],
    black: [0, 0, 0],
  };
  const choosenColor = colorRGB[color];
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className="w-52 h-52 bg-blue-200 rounded-2xl shadow-lg overflow-hidden relative hover:cursor-pointer"
      onMouseEnter={() => {
        console.log("hovering");
        setIsHover(true);
      }}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      <div
        className="w-full h-full absolute transition-all"
        style={
          isHover
            ? {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(${choosenColor.join(
                  ","
                )})), url(${poster})`,
                transform: "scale(1.2)",
              }
            : {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(${choosenColor.join(
                  ","
                )})), url(${poster})`,
                transform: "scale(1)",
              }
        }
      ></div>
      <div className="flex flex-col m-5 absolute">
        <div className="text-white font-semibold">{title}</div>
        <div className="text-white">{year}</div>
        <div className="text-white font-light grow justify-self-end">
          {type}
        </div>
      </div>
    </div>
  );
};

export default Card;
