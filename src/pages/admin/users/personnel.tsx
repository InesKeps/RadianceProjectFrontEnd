import { columns} from "./columns"
import { DataTable } from "./data-table"
import type { RootState } from "../../../store/store"; 
import { getAllUsers } from "@/store/users/actions";
import { useEffect } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";

export default function DemoPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.user.items);
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  
  return (
    <section className="p-4">
        <div className="flex items-center justify-center pb-4">
            <h1 className="font-medium text-xl text-[#0DABCB]">Gestion du personnel</h1>
        </div>
        <div className="container mx-auto">
            <DataTable columns={columns} data={data} />
        </div>
    </section>
  )
}