import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import { DataTable } from "./data-table";
import { columns} from "./columns";
import useAppDispatch from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { getConsultationPrescriptions } from "@/store/prescriptions/actions";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import useRoutePrefix from "@/hooks/useRoutePrefix";
interface Props {
  id: number;
}
const Prescriptions = ({ id }: Props) => {
  const navigate = useNavigate();
  const baseRoute = useRoutePrefix();
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(getConsultationPrescriptions(id));
    }, [dispatch]);
    
  const Prescriptions = useAppSelector((state: RootState) => state.prescription.items);

  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <DataTable columns={columns} data={Prescriptions}/>
        <div className="flex justify-end">
          <Button onClick={()=>{navigate(`${baseRoute}/ordonnance/${id}`)}} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 w-1/3 cursor-pointer text-white font-medium px-3 py-1 rounded-md">
            Générer une ordonnance
          </Button>
        </div>
    </section>
  );
};

export default Prescriptions;

