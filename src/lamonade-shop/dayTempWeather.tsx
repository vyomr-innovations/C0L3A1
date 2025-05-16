import DayTempWeatherData from "@/lamonade-shop/dayData.json";
import React from "react";
type InventoryItem = {
  estimCustomer: number;
  actualCustomer: number;
  currentInventory: number;
  totalInventory: number;
  remainigInventory: number;
  estimatedInventory:number
};

type myProps = {
  dataArray: InventoryItem[];
};
const DayTempWeather = ({dataArray}:myProps) => {

  const index = dataArray.length 
  if(index >= 6){
    return
  }
  return (
    <div className="grid grid-cols-12 w-full  place-items-center min-h-[50px]">
      <div className="col-span-4 w-full ">
        <h3 className="text-xl text-black text-center ">
          <span className="font-bold ">Day : </span>
          {DayTempWeatherData[index].day}/6
        </h3>
      </div>
      <div className="col-span-4 w-full">
        <h3 className="text-xl text-black text-center ">
          <span className="font-bold ">Temp : </span>
          {DayTempWeatherData[index].temp}
        </h3>
      </div>
      <div className="col-span-4 w-full">
        <h3 className="text-xl text-black text-center ">
          <span className="font-bold ">Weather : </span>
          {DayTempWeatherData[index].weather}
        </h3>
      </div>
    </div>
  );
};

export default DayTempWeather;
