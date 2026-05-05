import type { RDVDto } from "@/types/rdv";
import { RDVCalendar } from "./rdvcalendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, Formik, type FormikHelpers } from "formik";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import Input from "@/components/myComponents/input";
import useAuth from "@/hooks/useAuth";
import useAppDispatch from "@/hooks/useAppDispatch";
import { createRDV, getAllRDV } from "@/store/rdv/actions";
import { toast } from "react-toastify";

const RendezVous = () => {
  
const user = useAuth();
const id = user?.userInfo?.userToLogin?.id!;
const dispatch = useAppDispatch();

const initialValues :RDVDto = {
    date: "",
    statut: "PREVU",
    objet: "",
    nom: "",
    userId: id 
  }

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

// Fonction pour créer un RDV
const handleSubmitRDV = async (
  values: RDVDto,
  formikHelpers: FormikHelpers<RDVDto>
) => {
  formikHelpers.setSubmitting(true);
  const response = await dispatch(createRDV(values));

  if (response.meta.requestStatus === "fulfilled") {
    toast.success("Rendez-vous ajouté avec succès.");
    dispatch(getAllRDV());
    formikHelpers.resetForm();
  }

  if (response.meta.requestStatus === "rejected") {
    toast.error("Échec d'ajout du rendez-vous.");
  }

  formikHelpers.setSubmitting(false);
};


  return (
    <section className="p-4">
      <Dialog>
        <div className="flex items-center justify-between pb-8">
            <h1 className="font-medium text-xl text-[#0DABCB]">Gestion des rendez-vous</h1>
            <DialogTrigger className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-md">
                Enregistrer un RDV
            </DialogTrigger>
        </div>
        <div className="container mx-auto">
          <RDVCalendar/>
        </div>
        <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="font-medium text-[#0caccc]">
          <DialogTitle className="text-xl text-center">Ajouter un rendez-vous</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={rdvSchema} 
          onSubmit={handleSubmitRDV} 
        >
          {(formik) => (
            <Form className="flex flex-col gap-6 w-[80%] mx-auto">
              <div className="flex gap-8 w-full">
                <div className="flex flex-col gap-4 w-1/2">
                  <Input
                    label="Date du RDV"
                    name="date"
                    type="datetime-local"
                    placeholder="Entrez la date et l'heure"
                  />
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Statut</label>
                    <select
                      name="statut"
                      value={formik.values.statut}
                      onChange={formik.handleChange}
                      className="border rounded px-2 py-1"
                    >
                      <option value="PREVU">Prévu</option>
                      <option value="ANNULE">Annulé</option>
                      <option value="EFFECTUE">Terminé</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-1/2">
                 <Input
                    label="Nom"
                    name="nom"
                    type="text"
                    placeholder="Entrez le nom du RDV"
                  />
                  <Input
                    label="Objet"
                    name="objet"
                    type="text"
                    placeholder="Entrez l'objet du RDV"
                  />
                </div>
              </div>

              <DialogFooter className="flex gap-4 items-center justify-center py-4">
                <DialogClose
                  asChild
                  className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2"
                >
                  <Button variant="outline">Annuler</Button>
                </DialogClose>
                <DialogClose
                  asChild
                  className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 hover:text-black cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2"
                >
                  <Button type="submit" disabled={formik.isSubmitting}>
                    Enregistrer
                  </Button>
                </DialogClose>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>

    </Dialog>
    </section>
  )
}

export default RendezVous;