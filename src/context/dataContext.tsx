
"use client"
import React, { createContext, useContext, useState } from "react";
type InventoryItem = {
  estimCustomer: number;
  actualCustomer: number;
  currentInventory: number;
  totalInventory: number;
  remainigInventory: number;
  estimatedInventory: number;
};

type InventoryContextType = {
  dataArray: InventoryItem[];
  setDataArry: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
};


const InventoryContext = createContext<InventoryContextType | undefined>(undefined);
export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataArray, setDataArry] = useState<InventoryItem[]>([]);

  return (
    <InventoryContext.Provider value={{ dataArray, setDataArry }}>
      {children}
    </InventoryContext.Provider>
  );
};
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};
