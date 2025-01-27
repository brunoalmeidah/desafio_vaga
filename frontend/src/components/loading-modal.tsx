import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Rings } from "react-loader-spinner";
export function LoadingModal() {
  return (
    <Dialog open modal >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Importando Arquivo</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Rings
            visible={true}
            height="80"
            width="80"
            color="#09090b"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
