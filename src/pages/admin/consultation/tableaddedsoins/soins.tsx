import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";

import { DataTable } from "./data-table";
import { columns} from "./columns";

const Soins = () => {
  const addedSoins = useAppSelector((state: RootState) => state.addedSoin.items);

  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <DataTable columns={columns} data={addedSoins}/>
    </section>
  );
};

export default Soins;
