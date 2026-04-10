import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import { DataTable } from "./data-table";
import { columns} from "./columns";

const AddedPrescriptions = () => {
    const addedPrescriptions = useAppSelector((state: RootState) => state.addedPrescription.items);


  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <DataTable columns={columns} data={addedPrescriptions}/>
    </section>
  );
};

export default AddedPrescriptions;
