import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns} from "./columns";
import { getAllSoins } from "@/store/soins/actions";
import useAppDispatch from "@/hooks/useAppDispatch";

const Soins = () => {
  const dispatch = useAppDispatch();

  const soins = useAppSelector((state: RootState) => state.soin.items);
  
  useEffect(() => {
      dispatch(getAllSoins());
  }, [dispatch]);



  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
      <div className="container mx-auto">
          <DataTable columns={columns} data={soins} />
      </div>
    </section>
  );
};

export default Soins;
