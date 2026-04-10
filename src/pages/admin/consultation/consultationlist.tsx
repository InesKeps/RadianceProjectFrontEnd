import useAppSelector from "@/hooks/useAppSelector";
import useAppDispatch from "@/hooks/useAppDispatch";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DataTable } from "./data-table";
import { columns} from "./columns";
import type { RootState } from "@/store/store";
import { useEffect } from "react";
import { getAllConsultations } from "@/store/consultations/actions";

const Consultation = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllConsultations());
      }, [dispatch]);

    const consultations = useAppSelector((state: RootState) => state.consultation.items);

   const data = consultations.map(c => ({
      id: c.id,
      dateHeure: c.dateHeure ? 
        format(new Date(c.dateHeure), "dd/MM/yyyy HH:mm", { locale: fr }) : "",
      nomPatient: c.patient?.nom,
      motif: c.motifs?.[0]?.Motif?.nomMotif,
      nomResponsable: c.user?.nom,
    }));


  return (
    <section className="p-4">
            <div className="flex items-center justify-center pb-4">
                <h1 className="font-medium text-xl text-[#0DABCB]">Gestion des consultations</h1>
            </div>
            <div className="container mx-auto">
                <DataTable columns={columns} data={data} />
            </div>
        </section>
  );
};

export default Consultation;
