const Card = ({ title, poster, year, type }) => {
  console.log(title, poster);
  const colorRGB = {
    yellow: [224, 216, 94, 1],
    blue: [47, 125, 235],
    green: [50, 230, 95],
    red: [247, 80, 77],
  };
  return (
    <div
      className="w-52 h-52 bg-blue-200 rounded-2xl shadow-lg"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(${colorRGB.red.join(
          ","
        )})), url(${poster}`,
      }}
    >
      <div className="flex flex-col m-5">
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
