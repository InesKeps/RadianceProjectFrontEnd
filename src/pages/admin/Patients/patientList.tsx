import { columns} from "./columns"
import { DataTable } from "./data-table"
import type { RootState } from "../../../store/store"; 
import { useEffect } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import { getAllPatients } from "@/store/patients/actions";

export default function DemoPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.patient.items);
  
  useEffect(() => {
    dispatch(getAllPatients());
  }, [dispatch]);
  
  return (
    <section className="p-4">
        <div className="flex items-center justify-center pb-4">
            <h1 className="font-medium text-xl text-[#0DABCB]">Gestion des patients</h1>
        </div>
        <div className="container mx-auto">
            <DataTable columns={columns} data={data} />
        </div>
    </section>
  )
}