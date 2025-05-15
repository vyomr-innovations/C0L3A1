import DayTempWeatherData from "@/lamonade-shop/dayData.json";

const DayTempWeather = () => {
  return (
    <div className="grid grid-cols-12 w-full  place-items-center min-h-[50px]">
      <div className="col-span-4 w-full bg">
        <h3 className="text-xl text-black text-center ">
          <span className="font-bold ">Day : </span>
          {DayTempWeatherData[0].day}
        </h3>
      </div>
      <div className="col-span-4 w-full">
        <h3 className="text-xl text-black text-center ">
          <span className="font-bold ">Temp : </span>
          {DayTempWeatherData[0].temp}
        </h3>
      </div>
      <div className="col-span-4 w-full">
        <h3 className="text-xl text-black text-center ">
          <span className="font-bold ">Weather : </span>
          {DayTempWeatherData[0].weather}
        </h3>
      </div>
    </div>
  );
};

export default DayTempWeather;
