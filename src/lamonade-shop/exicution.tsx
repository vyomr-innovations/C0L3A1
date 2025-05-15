"use client";
import InventoryDialog from "@/components/dialog";
import Image from "next/image";
import React, { useState } from "react";
import DayTempWeather from "./dayTempWeather";

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
  setDataArry: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
};

const ExicutionInventory = ({ setDataArry, dataArray }: myProps) => {
  // const [dataArray, setDataArry] = useState([]);
  const [open, setOpen] = useState(false);

  const [bubulAnim, setBubulAnim] = useState(false);
  const [dilogData, setDilogData] = useState({
    day: 0,
    actualCustomer: 0,
    inventoryConSumed: 0,
    remaining: 0,
  });
  const [formData, setFormData] = useState({
    estimCustomer: 0,
    currenInven: 0,
    estimInven: 0,
    totalInven: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // random customers number==========
    const estimated = formData.estimCustomer;
    const min = Math.floor(estimated * 0.7); // 30% kam
    const max = Math.ceil(estimated * 1.3); // 30% zyada
    let actualCustomer = estimated;

    // Repeat until we get value outside the 90–110% close range
    while (
      actualCustomer >= estimated * 0.9 &&
      actualCustomer <= estimated * 1.1
    ) {
      actualCustomer = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //==========

    //  inventory Consumed ==========
    const inventoryConsumed = Math.min(actualCustomer, formData.estimInven);

    //==========
    //  total inventory  ==========
    const totalInventory = formData.currenInven + formData.estimInven;
    //==========
    //  inventory remaining ==========
    const remainigInventory = formData.estimInven - actualCustomer;
    //==========
    //  currunt inventory  ==========
    let currentInventory = totalInventory - inventoryConsumed;

    if (currentInventory < 0) {
      currentInventory = 0;
    }
    //==========

    //  inventory remaining ==========
    const estimatedInventory = formData.estimCustomer - currentInventory;
    //==========

    setFormData((prev) => ({
      ...prev,
      currenInven: currentInventory,
      totalInven: totalInventory,
    }));

    setDilogData((prev) => ({
      ...prev,
      day: dataArray.length,

      actualCustomer: actualCustomer,
      remaining: remainigInventory,
      inventoryConSumed: inventoryConsumed,
    }));

    setOpen(true);
    if (open) {
      return;
    }

    setDataArry((prev) => [
      ...prev,
      {
        estimCustomer: formData.estimCustomer,
         estimatedInventory,
        actualCustomer,
        currentInventory,
        totalInventory,
        remainigInventory,
      },
    ]);

    setBubulAnim(true);
    setTimeout(() => {
      setBubulAnim(false);
    }, 6000);
  };
  return (
    <div>
      <div className="grid grid-cols-12  place-items-center relative bg-violet-100 p-5 rounded-lg  w-full  gap-3 ">
        <img
          src="/bubul.gif"
          className={` ${
            bubulAnim ? "opacity-80" : "opacity-0"
          } absolute  object-cover top-0 rounded-lg overflow-hidden left-0 w-full h-full  transition-all duration-150 delay-500`}
          alt=""
        />
        <div className="col-span-12 w-full">
          <DayTempWeather />
        </div>
        <div className="col-span-6 w-full  flex justify-center items-center ">
          <Image
            src="/leman-glass.png"
            width={100}
            height={100}
            alt="leman-glass"
          />
        </div>
        <div className="col-span-6  w-full h-full  flex items-center ">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center  items-start gap-2 flex-col z-20"
          >
            <div className="flex items-center w-full justify-between gap-2">
              <label
                className="text-lg text-black  min-w-[120px] text-left"
                htmlFor="estimatedCostomeer"
              >
                Estimated Customers
              </label>
              <input
                min="0"
                value={formData.estimCustomer}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    estimCustomer: Number(e.target.value),
                  }))
                }
                type="number"
                id="estimatedCostomeer"
                className="  text-black text-md border-b-2  border-black w-[60px] px-2 "
              />
            </div>

            <div className="flex items-center w-full justify-between gap-2">
              <label
                className="text-lg text-black  min-w-[120px] text-left"
                htmlFor="currentInventory"
              >
                Current Inventory
              </label>
              <input
                min="0"
                value={formData.currenInven}
                  onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    currenInven: Number(e.target.value),
                  }))
                }
                type="number"
                id="currentInventory"
                className="  text-black text-md border-b-2  border-black w-[60px] px-2 "
              />
            </div>

            <div className="flex items-center w-full justify-between gap-2">
              <label
                className="text-lg text-black  min-w-[120px] text-left"
                htmlFor="estimatedInventory"
              >
                Estimated Inventory
              </label>
              <input
                min="0"
                value={formData.estimInven}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    estimInven: Number(e.target.value),
                  }))
                }
                type="number"
                id="estimatedInventory"
                className="  text-black text-md border-b-2  border-black w-[60px] px-2 "
              />
            </div>

            <div className="flex items-center w-full justify-between gap-2">
              <label
                className="text-lg text-black  min-w-[120px] text-left"
                htmlFor="totalInventory"
              >
                Total Inventory
              </label>
              <input
                min="0"
                value={formData.totalInven}
                readOnly
                type="number"
                id="totalInventory"
                className="  text-black text-md border-b-2  border-black w-[60px] px-2 "
              />
            </div>

            <div className="flex items-center  gap-2 justify-center  w-full">
              <button
                disabled={dataArray.length >= 6}
                className="text-lg text-white  z-20 w-full bg-blue-600 hover:bg-blue-700 p-1 rounded-lg cursor-pointer  text-center"
              >
                Execute
              </button>
            </div>
          </form>
        </div>
      </div>

      <InventoryDialog dilogData={dilogData} open={open} setOpen={setOpen} />
    </div>
  );
};

export default ExicutionInventory;
