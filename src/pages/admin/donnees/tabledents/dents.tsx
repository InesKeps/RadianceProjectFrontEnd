import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns} from "./columns";
import useAppDispatch from "@/hooks/useAppDispatch";
import { getAllDents } from "@/store/dents/actions";

const Dents = () => {
  const dispatch = useAppDispatch();
  const dents = useAppSelector((state: RootState) => state.dent.items);
  
  useEffect(() => {
      dispatch(getAllDents());
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
      <div className="container mx-auto">
          <DataTable columns={columns} data={dents} />
      </div>
    </section>
  );
};

export default Dents;
