const Minipage = ({
  title,
  released,
  runtime,
  genre,
  director,
  writer,
  actors,
  type,
  plot,
  imageSrc,
}) => {
  return (
    <div className="bg-white w-full h-full rounded-3xl flex flex-col overflow-y-auto">
      <div className="px-5 pb-5 text-center my-5 font-semibold text-2xl border-b-4 w-full">
        {title}
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="ml-5 w-3/4">
          <div className="mx-auto my-5 font-regular text-md">
            <span className="font-bold">Released:</span> {released}
          </div>
          <div className="mx-auto my-5 font-regular text-md">
            <span className="font-bold">Runtime:</span> {runtime}
          </div>
          <div className="mx-auto my-5 font-regular text-md italic">
            <span className="font-bold not-italic">Genre:</span> {genre}
          </div>
          <div className="mx-auto my-5 font-regular text-md">
            <span className="font-bold">Director:</span> {director}
          </div>
          <div className="mx-auto my-5 font-regular text-md">
            <span className="font-bold">Writer:</span> {writer}
          </div>
          <div className="mx-auto my-5 font-regular text-md">
            <span className="font-bold">Actors:</span>&nbsp;
            {actors}
          </div>
          <div className="mx-auto my-5 font-regular text-md">
            <span className="font-bold">Type:</span> {type}
          </div>
          <div className="mx-auto my-5 font-regular text-md text-justify">
            <span className="font-bold">Plot:</span> {plot}
          </div>
        </div>
        <div className="mt-5 ml-5 mr-5 order-first lg:order-2">
          <img src={imageSrc} alt="" className="w-60 h-60 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default Minipage;
