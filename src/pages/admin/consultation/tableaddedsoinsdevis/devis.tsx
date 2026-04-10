import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";

import { DataTable } from "./data-table";
import { columns} from "./columns";

const Devis = () => {
  const soinsDevis = useAppSelector((state: RootState) => state.devisSoins.items);


  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <DataTable columns={columns} data={soinsDevis}/>
    </section>
  );
};

export default Devis;
