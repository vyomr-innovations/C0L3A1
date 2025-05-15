"use client"
import { useState } from "react";
import DataTable from "./dataTable";
import ExicutionInventory from "./exicution";
type InventoryItem = {
  estimCustomer: number;
  actualCustomer: number;
  currentInventory: number;
  totalInventory: number;
  remainigInventory: number;
  estimatedInventory:number
};
const LemonadeShome = () => {
  const [dataArray, setDataArry] = useState<InventoryItem[]>([]);
  return (
    <div className="min-h-screen flex justify-center items-start p-2 bg-[#F8FCFA]">
      <div className="grid grid-cols-12  gap-5 w-full  ">
        
        <div className="col-span-12  ">
      <div className=" flex justify-center ">
            <ExicutionInventory setDataArry={setDataArry} dataArray={dataArray} />
      </div>
        </div>
        <div className="col-span-12  w-full h-full  flex items-center ">
          <DataTable dataArray={dataArray} />
        </div>
      </div>
    </div>
  );
};

export default LemonadeShome;
