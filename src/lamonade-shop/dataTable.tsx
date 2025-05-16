"use client";
import { MyCustomerChart } from "@/components/chart";
import { MyResultChart } from "@/components/resultChart";
import { useInventory } from "@/context/dataContext";
import DayTempWeatherData from "@/lamonade-shop/dayData.json";
import React, { useState } from "react";

const DataTable = () => {
  const [showGraph,setShowGraph]=useState(false)
  const { dataArray } = useInventory();
  if (dataArray.length > 6) return null;
  return (
    <div className="grid grid-cols-9 w-full place-items-center  gap-0.5   p-1 rounded-lg ">
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
        <div className="col-span-10 border border-black w-full  px-1 min-h-[50px] text-center  font-bold flex items-center justify-center text-md">
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

      {
        dataArray.length >=6 ? 
<>

        <div className={` ${showGraph ? "hidden":"block"} mt-5 col-span-9 w-full text-center`}>
          <button onClick={()=>setShowGraph(true)} className="min-w-[200px] rounded-lg text-lg cursor-pointer bg-blue-600 hover:bg-blue-700 py-2 text-center text-white ">
            Analysis
          </button>
        </div>

  <div className={`${showGraph ? "block" :"hidden"} mt-8 col-span-5 w-[450px]`}>
        <MyCustomerChart />
      </div>

      <div className={`${showGraph ? "block" :"hidden"} mt-8 col-span-4 w-[450px]`}>
        <MyResultChart />
      </div>
</>

        
        
        :""
      }

    
    </div>
  );
};

export default DataTable;
