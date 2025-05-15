"use client";

import React, { useEffect, useState } from "react";
import InventoryDialog from "@/components/dialog";
import DayTempWeather from "./dayTempWeather";
import { useInventory } from "@/context/dataContext";
import Image from "next/image";

const ExicutionInventory = () => {
  const { dataArray, setDataArry } = useInventory();

  const [open, setOpen] = useState(false);
  const [bubulAnim, setBubulAnim] = useState(false);

  const [dilogData, setDilogData] = useState({
    day: 0,
    actualCustomer: 0,
    inventoryConSumed: 0,
    remaining: 0,
  });

  const [formData, setFormData] = useState({
    estimCustomer: "0",
    currenInven: 0,
    estimInven: "0",
    totalInven: 0,
  });

  useEffect(() => {
    const estimatedInventory =
      Number(formData.estimCustomer) - formData.currenInven;
    const safeEstimatedInventory =
      estimatedInventory > 0 ? estimatedInventory : 0;

    // Only update if estimCustomer is not zero to prevent clearing estimInven when estimCustomer resets
    if (
      Number(formData.estimCustomer) !== 0 &&
      safeEstimatedInventory !== Number(formData.estimInven)
    ) {
      setFormData((prev) => ({
        ...prev,
        estimInven: JSON.stringify(safeEstimatedInventory),
      }));
    }
  }, [Number(formData.estimCustomer), formData.currenInven]);

  useEffect(() => {
    const totalInventory = formData.currenInven + Number(formData.estimInven);

    if (totalInventory !== formData.totalInven) {
      setFormData((prev) => ({
        ...prev,
        totalInven: totalInventory,
      }));
    }
  }, [Number(formData.estimInven), formData.currenInven]);

  // State to hold the new day data temporarily, but NOT added to dataArray yet
  const [pendingDayData, setPendingDayData] = useState<null | {
    estimCustomer: number;
    estimatedInventory: number;
    actualCustomer: number;
    currentInventory: number;
    totalInventory: number;
    remainigInventory: number;
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate all values
    const estimated = Number(formData.estimCustomer);
    const min = Math.floor(estimated * 0.7);
    const max = Math.ceil(estimated * 1.3);
    let actualCustomer = estimated;

    while (
      actualCustomer >= estimated * 0.9 &&
      actualCustomer <= estimated * 1.1
    ) {
      actualCustomer = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const inventoryConsumed = Math.min(actualCustomer, Number(formData.estimInven));
   ;
    const remainigInventory = Number(formData.estimInven) - actualCustomer;
 const totalInventory = formData.currenInven + Number(formData.estimInven)
    let currentInventory = totalInventory - inventoryConsumed;
    if (currentInventory < 0) currentInventory = 0;

    const estimatedInventory =
      Number(formData.estimCustomer) - currentInventory;

    // Set dialog data to show in popup
    setDilogData({
      day: dataArray.length,
      actualCustomer,
      inventoryConSumed: inventoryConsumed,
      remaining: remainigInventory,
    });

    // Store this day data in a temporary state, NOT pushing to dataArray yet
    setPendingDayData({
      estimCustomer: Number(formData.estimCustomer),
      estimatedInventory,
      actualCustomer,
      currentInventory,
      totalInventory,
      remainigInventory,
    });

    setOpen(true);
    setBubulAnim(true);
    setTimeout(() => setBubulAnim(false), 3000);

    // Update form data current inventory for next round
    // setFormData((prev) => ({
    //   ...prev,
    //   currenInven: currentInventory,
    //   estimCustomer: "0",
    //   estimInven: 0,
    //   totalInven: prev.totalInven,
    // }));
  };

  // This function will be passed to dialog and called on Confirm button click
  const handleConfirm = () => {
    if (pendingDayData) {
      setDataArry((prev) => [...prev, pendingDayData]);
      setPendingDayData(null);

      setFormData((prev) => ({
      ...prev,
      currenInven: pendingDayData.currentInventory,
      estimCustomer: "0",
      estimInven: "0",
      totalInven: pendingDayData.totalInventory, // <- only currentInventory remains
    }));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 place-items-center relative bg-violet-100 p-5 rounded-lg w-full gap-3">
        <img
          src="/bubul.gif"
          className={`${
            bubulAnim ? "opacity-80" : "opacity-0"
          } absolute object-cover top-0 rounded-lg overflow-hidden left-0 w-full h-full transition-all duration-150 delay-500`}
          alt=""
        />
        <div className="col-span-12 w-full">
          <DayTempWeather dataArray={dataArray} />
        </div>
        <div className="col-span-6 w-full flex justify-center items-center">
          <Image
            src="/leman-glass.png"
            width={100}
            height={100}
            alt="leman-glass"
          />
        </div>
        <div className="col-span-6 w-full h-full flex items-center">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-start gap-2 flex-col z-20"
          >
            <div className="flex items-center w-full justify-between gap-2">
              <label
                className="text-lg text-black min-w-[120px] text-left"
                htmlFor="estimatedCostomeer"
              >
                Estimated Customers
              </label>
              <input
                min={0}
                value={formData.estimCustomer}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    estimCustomer: e.target.value,
                  }))
                }
                type="text"
                id="estimatedCostomeer"
                className="text-black text-md border-b-2 border-black w-[60px] px-2"
              />
            </div>

            <div className="flex items-center w-full justify-between gap-2">
              <label
                className="text-lg text-black min-w-[120px] text-left"
                htmlFor="currentInventory"
              >
                Current Inventory
              </label>
              <input
                min={0}
                value={formData.currenInven}
                readOnly
                type="number"
                id="currentInventory"
                className="text-black text-md border-b-2 border-black w-[60px] px-2"
              />
            </div>

            <div className="flex items-center w-full justify-between gap-2">
              <label
                className="text-lg text-black min-w-[120px] text-left"
                htmlFor="estimatedInventory"
              >
                Estimated Inventory
              </label>
              <input
                min={0}
                value={formData.estimInven}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    estimInven:(e.target.value),
                  }))
                }
                type="text"
                id="estimatedInventory"
                className="text-black text-md border-b-2 border-black w-[60px] px-2"
              />
            </div>

            <div className="flex items-center w-full justify-between gap-2">
              <label
                className="text-lg text-black min-w-[120px] text-left"
                htmlFor="totalInventory"
              >
                Total Inventory
              </label>
              <input
                min={0}
                value={formData.totalInven}
                readOnly
                type="number"
                id="totalInventory"
                className="text-black text-md border-b-2 border-black w-[60px] px-2"
              />
            </div>

            <div className="flex items-center gap-2 justify-center w-full">
              <button
                disabled={dataArray.length >= 6}
                className="text-lg text-white z-20 w-full bg-blue-600 hover:bg-blue-700 p-1 rounded-lg cursor-pointer text-center"
              >
                Execute
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Pass onConfirm to dialog */}
      <InventoryDialog
        dilogData={dilogData}
        open={open}
        setOpen={setOpen}
        onConfirm={handleConfirm} // <-- here!
      />
    </div>
  );
};

export default ExicutionInventory;
