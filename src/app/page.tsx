import { InventoryProvider } from "@/context/dataContext";
import LemonadeShome from "@/lamonade-shop";

export default function Home() {
  return (
    <InventoryProvider>
      <LemonadeShome />
    </InventoryProvider>
  );
}
