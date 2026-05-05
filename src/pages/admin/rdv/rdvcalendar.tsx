import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type { RootState } from "@/store/store";
import { getAllRDV, updateRDV } from "@/store/rdv/actions";
import useAppSelector from "@/hooks/useAppSelector";
import useAppDispatch from "@/hooks/useAppDispatch";
import tippy from "tippy.js"; 
import "tippy.js/dist/tippy.css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Formik, Form, type FormikHelpers } from "formik"
import { Field } from "formik";
import { Button } from "@/components/ui/button";
import Input from "@/components/myComponents/input";
import type { RDVUpdateDto } from "@/types/rdv";
import { toast } from "react-toastify";
import { format } from "date-fns";
import * as yup from "yup";

export const RDVCalendar = () => {
  const dispatch = useAppDispatch();
  const rdvs = useAppSelector((state: RootState) => state.rdv.items);
  const [openDialog, setOpenDialog] = useState(false); 
  const [selectedRDV, setSelectedRDV] = useState<any>(null);

  useEffect(() => {
    dispatch(getAllRDV());
  }, [dispatch]);

  const rdvSchema = yup.object().shape({
    date: yup
      .string()
      .required("Entrez La date et l'heure du RDV."),
  
    statut: yup
      .string()
      .oneOf(["PREVU", "ANNULE", "EFFECTUE"], "Statut invalide")
      .default("PREVU"),
  
    objet: yup
      .string()
      .nullable(),
  
    nom: yup
      .string()
      .nullable(),
  });
  
  const events = rdvs.map((rdv) => ({
    id: rdv.id.toString(),
    title: rdv.nom ?? "Rendez-vous",
    start: rdv.date,
    backgroundColor:
        rdv.statut === "ANNULE"
        ? "#e74c3c" // rouge
        : rdv.statut === "EFFECTUE"
        ? "#2ecc71" // vert
        : "#3498db", // bleu
    textColor: "#fff",
    borderColor: "#fff",
    extendedProps: {
        statut: rdv.statut,
        objet: rdv.objet,
        patientId: rdv.patientId,
        userId: rdv.userId,
    },
}));

const handleUpdateRDV = async (
  values: RDVUpdateDto,
  formikHelpers: FormikHelpers<RDVUpdateDto>
) => {
  formikHelpers.setSubmitting(true);
  const response = await dispatch(updateRDV(values));

  if (response.meta.requestStatus === "fulfilled") {
    toast.success("Rendez-vous modifié avec succès.");
    dispatch(getAllRDV());
    formikHelpers.resetForm();
    setOpenDialog(false);
  }

  if (response.meta.requestStatus === "rejected") {
    toast.error("Échec de modification du rendez-vous.");
  }

  formikHelpers.setSubmitting(false);
};

  return (
    <>
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      timeZone="local"
      eventTimeFormat={{ 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }}
      slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      events={events}
      eventClick={(info) => {
        const formattedDate = info.event.start 
        ? format(info.event.start, "yyyy-MM-dd'T'HH:mm") 
        : "";
        setSelectedRDV({ 
            id: info.event.id, 
            nom: info.event.title, 
            date: formattedDate, 
            statut: info.event.extendedProps.statut, 
            objet: info.event.extendedProps.objet, 
            userId: info.event.extendedProps.userId, 
        }); 
        setOpenDialog(true);
      }}
      height="auto"
      eventDidMount={(info) => {
            const statut = info.event.extendedProps.statut;
            const formattedDate = format(info.event.start!, "dd/MM/yyyy HH:mm");
            tippy(info.el, {
            content: `
                <strong>${info.event.title}</strong><br/>
                Date: ${formattedDate}<br/>
                Statut: <span class="statut-${statut}">${statut}</span><br/>
                Objet: ${info.event.extendedProps.objet ?? "RAS"}
            `,
            allowHTML: true,
            theme: "rdv",
            });
        }}
    />
    {openDialog && selectedRDV && (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
            <DialogTitle className="font-medium text-xl text-[#0DABCB] text-center">Modifier le rendez-vous</DialogTitle>
        </DialogHeader>
        <Formik
            initialValues={selectedRDV}
            validationSchema={rdvSchema}
            onSubmit={handleUpdateRDV}
        >
            {(formik) => (
            <Form className="flex flex-col gap-4">
                <Input label="Date" name="date" type="datetime-local" placeholder="Entrez la date du RDV"/>
                <Input label="Nom" name="nom" type="text" placeholder="Entrez le nom du RDV"/>
                <Input label="Objet" name="objet" type="text" placeholder="Entrez l'objet du RDV"/>

                <div role="group" aria-labelledby="statut-group">
                <label>
                    <Field type="radio" name="statut" value="PREVU" />
                    Prévu
                </label>
                <label>
                    <Field type="radio" name="statut" value="ANNULE" />
                    Annulé
                </label>
                <label>
                    <Field type="radio" name="statut" value="EFFECTUE" />
                    Effectué
                </label>
                </div>

                <DialogFooter className="flex gap-4 justify-center py-4">
                <DialogClose asChild>
                    <Button variant="outline">Annuler</Button>
                </DialogClose>
                <Button type="submit" disabled={formik.isSubmitting}>
                    Enregistrer
                </Button>
                </DialogFooter>
            </Form>
            )}
        </Formik>
        </DialogContent>
    </Dialog>
    )}

    </>
  );
};


