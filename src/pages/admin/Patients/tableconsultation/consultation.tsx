import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import useAppDispatch from "@/hooks/useAppDispatch";
import { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns} from "./columns";
import { getPatientConsultations } from "@/store/consultations/actions";

const Consultation = () => {
    const dispatch = useAppDispatch();
    const patientDetails = useAppSelector((state: RootState) => state.patient.selectedPatient);

    useEffect(() => {
        dispatch(getPatientConsultations(patientDetails!.id));
    }, [dispatch]);

    const Patientconsultations = useAppSelector((state: RootState) => state.consultation.PatientConsultations);

    const data = Patientconsultations!.map(c => ({
      id: c.id,
      dateHeure: format(new Date(c!.dateHeure), "dd/MM/yyyy hh:mm", { locale: fr }),
      nomPatient: c.patient?.nom,
      motif: c.motifs?.[0]?.Motif?.nomMotif,
      nomResponsable: c.user?.nom,
    }));


  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
      <DataTable columns={columns} data={data}/>
    </section>
  );
};

export default Consultation;
