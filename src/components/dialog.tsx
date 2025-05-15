import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
type myProps = {
  
  open: boolean;
  setOpen: (value: boolean) => void;
 
  dilogData: {
    day: number;
    actualCustomer: number;
    inventoryConSumed: number;
    remaining: number;
  };
};

const InventoryDialog = ({ dilogData, open, setOpen }: myProps) => {

const handleOkClick =()=>{
  setOpen(false)

}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" bg-[#F8FCFA] text-balck  ">
        <DialogTitle className="hidden"></DialogTitle>

        <form className="flex justify-center items-start gap-10 flex-col">
          <h2 className="text-2xl text-black text-center w-full">
            {" "}
            Day {dilogData.day + 1} Result
          </h2>
          <div className="flex items-center gap-2">
            <label
              className="text-2xl text-black  min-w-[250px] text-left"
              htmlFor="estimatedCostomeer"
            >
              Actual Customers
            </label>
            <span className="  text-black text-xl  w-[100px] px-2 ">
              {dilogData?.actualCustomer}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label
              className="text-2xl text-black  min-w-[250px] text-left"
              htmlFor="currentInventory"
            >
              Inventory Consumed
            </label>
            <span className="  text-black text-xl  w-[100px] px-2 ">
              {dilogData?.inventoryConSumed}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label
              className={`text-2xl text-black  min-w-[250px] text-left
              ${
                dilogData.remaining < 0
                  ? "text-red-500"
                  : dilogData.remaining > 0
                  ? "text-green-600"
                  : "text-white"
              }`}
              htmlFor="currentInventory"
            >
              {dilogData.remaining < 0
                ? "Shortfall Inventory"
                : dilogData.remaining > 0
                ? " Surplus Inventory"
                : ""}
            </label>
            <span
              className={` ${
                dilogData.remaining < 0
                  ? "text-red-500"
                  : dilogData.remaining > 0
                  ? "text-green-600"
                  : "text-white"
              }  text-black text-xl  w-[100px] px-2 `}
            >
              {dilogData.remaining}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-center w-full">
            <button type="button"  onClick={handleOkClick} className="px-10 cursor-pointer py-2 bg-blue-600 rounded-lg text-white">
              OK
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryDialog;
