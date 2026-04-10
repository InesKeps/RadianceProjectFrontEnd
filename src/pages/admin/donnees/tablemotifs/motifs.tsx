import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns} from "./columns";
import useAppDispatch from "@/hooks/useAppDispatch";
import { getAllMotifs } from "@/store/motifs/actions";

const Motifs = () => {
  const dispatch = useAppDispatch();
  const motifs = useAppSelector((state: RootState) => state.motif.items);
  
  useEffect(() => {
      dispatch(getAllMotifs());
  }, [dispatch]);



  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
      <div className="container mx-auto">
          <DataTable columns={columns} data={motifs} />
      </div>
    </section>
  );
};

export default Motifs;
