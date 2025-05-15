import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useInventory } from "@/context/dataContext";

type InventoryDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  dilogData: {
    day: number;
    actualCustomer: number;
    inventoryConSumed: number;
    remaining: number;
  };
  onConfirm: () => void; // new prop for OK button handler
};

const InventoryDialog = ({ dilogData, open, setOpen, onConfirm }: InventoryDialogProps) => {
  const {dataArray}=useInventory()
  const handleOkClick = () => {
    onConfirm();    // call the passed function on OK click
    setOpen(false); // close the dialog
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#F8FCFA] text-black">
        <DialogTitle className="hidden"></DialogTitle>

        <form className="flex justify-center items-start gap-10 flex-col">
          <h2 className="text-2xl text-black text-center w-full">
            Day {dilogData.day + 1} Result
          </h2>

          <div className="flex items-center gap-2">
            <label className="text-2xl text-black min-w-[250px] text-left">
              Actual Customers
            </label>
            <span className="text-black text-xl w-[100px] px-2">{dilogData.actualCustomer}</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-2xl text-black min-w-[250px] text-left">
              Inventory Consumed
            </label>
            <span className="text-black text-xl w-[100px] px-2">{dilogData.inventoryConSumed}</span>
          </div>

          <div className="flex items-center gap-2">
            <label
              className={`text-2xl min-w-[250px] text-left ${
                dilogData.remaining < 0
                  ? "text-red-500"
                  : dilogData.remaining > 0
                  ? "text-green-500"
                  : ""
              }`}
            >
              {dilogData.remaining < 0
                ? "Shortfall Inventory"
                : dilogData.remaining > 0
                ? "Surplus Inventory"
                : ""}
            </label>
            <span
              className={`text-xl w-[100px] px-2 ${
               dilogData.remaining > 0 ? "text-green-500":
               dilogData.remaining < 0 ? "text-red-500":""
              }`}
            >
              {dilogData.remaining}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-center w-full">
            <button
              type="button"
              onClick={handleOkClick}
              className="px-10 cursor-pointer py-2 bg-blue-600 rounded-lg text-white"
            >


              {dataArray.length >= 5 ? "Ok" : ` Next Day (Day ${dilogData.day + 2})`}
             
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryDialog;
