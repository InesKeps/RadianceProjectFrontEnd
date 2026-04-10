import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";

import { DataTable } from "./data-table";
import { columns} from "./columns";
import { useEffect } from "react";
import useAppDispatch from "@/hooks/useAppDispatch";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useRoutePrefix from "@/hooks/useRoutePrefix";
import { getAllSoinsDevis } from "@/store/devis/actions";

const DevisSoins = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const baseRoute = useRoutePrefix();
  const soinsDevis = useAppSelector((state: RootState) => state.devis.items);
  const selectedConsultation = useAppSelector((state: RootState) => state.consultation.ConsultationDetails);
  const id = Number(selectedConsultation?.id)

  useEffect(() => {
      if (id) {
          dispatch(getAllSoinsDevis(id));
      }
  }, [dispatch, id]);


  const data = soinsDevis.map(s => ({
    id: s.id,
    idSoin: s.soin?.id, 
    codification: s.soin?.codification, 
    nomSoin: s.soin?.nom, 
    tarif: s.soin?.tarif,
    idDent: s.dent?.id, 
    numero: s.dent?.numero, 
    nomDent: s.dent?.nom!, 
  })) ?? [];

  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <DataTable columns={columns} data={data}/>
        <div className="flex justify-end">
          <Button onClick={()=>{navigate(`${baseRoute}/devis/${selectedConsultation?.id}`)}} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 w-1/3 cursor-pointer text-white font-medium px-3 py-1 rounded-md">
            Générer un devis
          </Button>
        </div>
    </section>
  );
};

export default DevisSoins;

