"use client";
import { useInventory } from "@/context/dataContext";
import DayTempWeatherData from "@/lamonade-shop/dayData.json";
import React from "react";


const DataTable = () => {
    const {dataArray} = useInventory()
  if (dataArray.length > 6) return null;
  return (
    <div className="grid grid-cols-9 w-full place-items-center  gap-0.5  p-1 rounded-lg ">
      <div className="col-span-1 w-full  px-1 min-h-[50px] text-center bg-[#fec907] font-bold flex items-center justify-center text-md">
        Day
      </div>
      <div className="col-span-1 w-full  px-1 min-h-[50px] text-center bg-[#fec907] font-bold flex items-center justify-center text-md">
        Temperature (°C)
      </div>
      <div className="col-span-1 w-full  px-1 min-h-[50px] text-center bg-[#fec907] font-bold flex items-center justify-center text-md">
        Weather
      </div>
      <div className="col-span-1 w-full  px-1 min-h-[50px] text-center bg-[#fec907] font-bold flex items-center justify-center text-md">
        Estimated Customers
      </div>
      <div className="col-span-1 w-full  px-1 min-h-[50px] text-center bg-[#fec907] font-bold flex items-center justify-center text-md">
        Actual Customers
      </div>
      <div className="col-span-1 w-full  px-1 min-h-[50px] text-center bg-[#fec907] font-bold flex items-center justify-center text-md">
        Current Inventory
      </div>
      <div className="col-span-1 w-full  px-1 min-h-[50px] text-center bg-[#fec907] font-bold flex items-center justify-center text-md">
        More Inventory Needed
      </div>
      <div className="col-span-1 w-full  px-1 min-h-[50px] text-center bg-[#fec907] font-bold flex items-center justify-center text-md">
        Total Inventory
      </div>
      <div className="col-span-1 w-full  px-1 min-h-[50px] text-center bg-[#fec907] font-bold flex items-center justify-center text-md">
        Result
      </div>

      {dataArray.length <= 0 ? (
        <div className="col-span-12 w-full  px-1 min-h-[50px] text-center  border border-black font-bold flex items-center justify-center text-md">
          Please execute for Day 1
        </div>
      ) : (
        dataArray?.map((item, index) => (
          <React.Fragment key={index}>
            <div className="col-span-1 w-full  px-1 min-h-[35px] text-center bg-[#fec907] font-bold flex items-center justify-center text-md">
              {index + 1}
            </div>
            <div
              className={` ${
                item.remainigInventory < 0
                  ? "bg-red-400"
                  : item.remainigInventory > 0
                  ? "bg-green-400"
                  : "border"
              } col-span-1 w-full  px-1 min-h-[35px] text-center font-bold flex items-center justify-center text-md`}
            >
              {DayTempWeatherData[index].temp}
            </div>
            <div
              className={` ${
                item.remainigInventory < 0
                  ? "bg-red-400"
                  : item.remainigInventory > 0
                  ? "bg-green-400"
                  : "border"
              } col-span-1 w-full  px-1 min-h-[35px] text-center font-bold flex items-center justify-center text-md`}
            >
              {DayTempWeatherData[index].weather}
            </div>
            <div
              className={` ${
                item.remainigInventory < 0
                  ? "bg-red-400"
                  : item.remainigInventory > 0
                  ? "bg-green-400"
                  : "border"
              } col-span-1 w-full  px-1 min-h-[35px] text-center font-bold flex items-center justify-center text-md`}
            >
              {item.estimCustomer}
            </div>
            <div
              className={` ${
                item.remainigInventory < 0
                  ? "bg-red-400"
                  : item.remainigInventory > 0
                  ? "bg-green-400"
                  : "border"
              } col-span-1 w-full  px-1 min-h-[35px] text-center font-bold flex items-center justify-center text-md`}
            >
              {item.actualCustomer}
            </div>
            <div
              className={` ${
                item.remainigInventory < 0
                  ? "bg-red-400"
                  : item.remainigInventory > 0
                  ? "bg-green-400"
                  : "border"
              } col-span-1 w-full  px-1 min-h-[35px] text-center font-bold flex items-center justify-center text-md`}
            >
              {item.currentInventory}
            </div>
            <div
              className={` ${
                item.remainigInventory < 0
                  ? "bg-red-400"
                  : item.remainigInventory > 0
                  ? "bg-green-400"
                  : "border"
              } col-span-1 w-full  px-1 min-h-[35px] text-center font-bold flex items-center justify-center text-md`}
            >
              {item.estimatedInventory}
            </div>
            <div
              className={` ${
                item.remainigInventory < 0
                  ? "bg-red-400"
                  : item.remainigInventory > 0
                  ? "bg-green-400"
                  : "border"
              } col-span-1 w-full  px-1 min-h-[35px] text-center font-bold flex items-center justify-center text-md`}
            >
              {item.totalInventory}
            </div>
            <div
              className={` ${
                item.remainigInventory < 0
                  ? "bg-red-400"
                  : item.remainigInventory > 0
                  ? "bg-green-400"
                  : "border"
              } col-span-1 w-full  px-1 min-h-[35px] text-center font-bold flex items-center justify-center text-md`}
            >
              {item.remainigInventory}
            </div>
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default DataTable;
