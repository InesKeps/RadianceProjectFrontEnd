import { FaUserLarge } from "react-icons/fa6";
import { FaChevronCircleLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import { deletePatient, getPatientDetails } from "@/store/patients/actions";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Formik, Form, FieldArray, Field, type FormikHelpers } from "formik";
import {
  Card,
  CardAction,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { assuranceSchema } from "./addpatient";
import Input from "@/components/myComponents/input";
import type { AssuranceDto } from "@/types/historique";
import type { AssuranceDtoUpdate } from "@/types/historique";
import { createAssurance, deleteAssurance } from "@/store/assurances/actions";
import Assurance from "@/components/myComponents/assurance";
import Antecedent from "@/components/myComponents/antecedent";
import Allergie from "@/components/myComponents/allergie";

const DetailsPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const patientDetails = useAppSelector((state: RootState) => state.patient.selectedPatient);

  // const idPatient:number = patientDetails!.id;

  useEffect(() => {
    if (id) {
      dispatch(getPatientDetails(Number(id)));
    }
  }, [dispatch, id]);

  if (!patientDetails) {
    return <p className="text-center mt-10">Chargement des détails...</p>;
  }

  const handleDeletePatient = async ()=>{
    const response = await dispatch(deletePatient(patientDetails.id));

    if (response.meta.requestStatus === "fulfilled") {
    toast.success("Patient supprimé avec succès.");
    navigate('/admin/patients')
    }

    if (response.meta.requestStatus === "rejected") {
    toast.error("Echec de suppression du Patient.");
    }
  };

  // const assuranceInitialValues : AssuranceDto = {
  //   type: "",
  //   matricule: "",
  //   adresse: "",
  //   patientId: Number(patientDetails.id),
  // };

  // const handleSubmitAssurance = async (
  //   values: AssuranceDto,
  //   formikHelpers: FormikHelpers<AssuranceDto>
  //   ) => {
  //   formikHelpers.setSubmitting(true);
  //   const response = await dispatch(createAssurance(values));

  //   if (response.meta.requestStatus === "fulfilled") {
  //       toast.success("Assurance ajoutée avec succès.");
  //       formikHelpers.resetForm();
  //       window.location.reload();
  //   }

  //   if (response.meta.requestStatus === "rejected") {
  //       toast.error("Echec d'ajout de l'assurance.");
  //   }

  //   formikHelpers.setSubmitting(false);
  // };

  // const OpenFormUpdate = (id:number) =>{
  //   let assToUpdate;
  //   for (let i = 0; i < patientDetails.assurance.length; i++) {
  //     if (patientDetails.assurance[i].id === id) {
  //       assToUpdate = patientDetails.assurance[i]; 
  //     }
  //   }
  //   console.log(assToUpdate);

  //   const assuranceToUpdateInitialValues :AssuranceDtoUpdate  = {
  //     id: Number(patientDetails.id),
  //     type: assToUpdate!.type,
  //     matricule: assToUpdate!.matricule,
  //     adresse: assToUpdate!.adresse,
  //   };
  // }

  // const handleDeleteAssurance = async (id:number)=>{
  //   const response = await dispatch(deleteAssurance(id));

  //   if (response.meta.requestStatus === "fulfilled") {
  //   toast.success("Assurance supprimée avec succès.");
  //   window.location.reload();
  //   }

  //   if (response.meta.requestStatus === "rejected") {
  //   toast.error("Echec de suppression de l'assurance.");
  //   }
  // };

  return (
    <section className="flex flex-col gap-4 p-4 w-full h-full relative">
      <AlertDialog>
        <button
          type="button"
          onClick={() => navigate("/admin/patients")}
          className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer"
        >
          <FaChevronCircleLeft />
        </button>

        <h1 className="font-bold text-center text-xl">Détails du patient</h1>

        <section className="flex w-full h-full gap-4">
          <Card className="flex flex-col gap-4 items-center w-1/4 shadow-md overflow-y-auto bg-[#f7f9fa] relative">
            <CardAction className="flex absolute right-4 top-4 gap-2">
              <button onClick={() => navigate(`/admin/updatepatient-form/${patientDetails.id}`)} className="text-[#0DABCB] text-xl hover:text-[#07c6ec] cursor-pointer"><FaRegEdit /></button>
              <AlertDialogTrigger className="text-red-500 text-xl hover:text-red-600 cursor-pointer"><MdDeleteOutline /></AlertDialogTrigger>
            </CardAction>
            <div className="flex justify-center items-center rounded-full mb-2 w-20 h-20 bg-[#0caccc]">
              <FaUserLarge className="text-white text-4xl" />
            </div>
            <CardTitle>Informations Personnelles</CardTitle>
            <CardContent className="flex flex-col gap-2 w-full text-sm">
              <h2 className="text-center font-semibold text-lg mb-2"></h2>
              <div className="flex gap-2"><p className="font-medium">Nom:</p><p>{patientDetails.nom}</p></div>
              <div className="flex gap-2"><p className="font-medium">Prénom:</p><p>{patientDetails.prenom}</p></div>
              <div className="flex gap-2"><p className="font-medium">Adresse:</p><p>{patientDetails.adresse}</p></div>
              <div className="flex gap-2"><p className="font-medium">Date de naissance:</p>
                <p>{format(new Date(patientDetails.dateNaissance), "dd/MM/yyyy", { locale: fr })}</p>
              </div>
              <div className="flex gap-2"><p className="font-medium">Genre:</p><p>{patientDetails.genre}</p></div>
              <div className="flex gap-2"><p className="font-medium">Téléphone:</p><p>{patientDetails.tel}</p></div>
              <div className="flex gap-2"><p className="font-medium">Profession:</p><p>{patientDetails.profession}</p></div>
              <div className="flex gap-2"><p className="font-medium">Nationalité:</p><p>{patientDetails.nationalite}</p></div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 w-3/4 h-[80vh] overflow-y-auto">

            <Assurance/>

            <Antecedent/>

            <Allergie/>

            {/* Consultations */}
            <Card className="bg-[#f7f9fa] p-4">
              <CardTitle className="flex justify-between px-2">
                <p>Consultations</p>
                <button className="text-[#0DABCB] text-xl hover:text-[#07c6ec] cursor-pointer"><IoAdd /></button>
              </CardTitle>
              <CardContent>
                {patientDetails.consultation?.length ? (
                  patientDetails.consultation.map((c) => (
                    <div key={c.id} className="border-b py-2">
                      <p><span className="font-medium">Motif:</span> {c.motif}</p>
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {format(new Date(c.dateHeure), "dd/MM/yyyy HH:mm", { locale: fr })}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Aucune consultation</p>
                )}
              </CardContent>
            </Card>
          </div>
          <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Attention</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Ce patient et toutes les informations 
              le concernant seront supprimés définitivement de votre base de données. 
              C'est bien ce que vous voulez?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={()=>handleDeletePatient()} className="bg-red-300">Oui, Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        </section>
      </AlertDialog>
    </section>
  );
};

export default DetailsPatient;