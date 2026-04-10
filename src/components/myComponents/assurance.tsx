import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Formik, Form, type FormikHelpers } from "formik";
import {
  Card,
  CardAction,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import type { AssuranceDto, AssuranceDtoUpdate } from "@/types/patientdata";
import { createAssurance, updateAssurance } from "@/store/assurances/actions";
import useAppDispatch from "@/hooks/useAppDispatch";
import { assuranceSchema } from "@/pages/admin/Patients/addpatient";
import Input from "@/components/myComponents/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getPatientDetails } from "@/store/patients/actions";
import { toast } from "react-toastify";

// Composant pour afficher et gérer les assurances du patient sur la page DetailsPatient

const Assurance = () => {
  const dispatch = useAppDispatch();
  //recuperation du patient selectionne dont on veut traiter les details
  const patientDetails = useAppSelector((state: RootState) => state.patient.selectedPatient);
  
  //states pour controller l'etat des boites de dialogues
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<"first" | "second" | null>(null);

  //state pour conserver l'id de l'assurance selectionnée pour la modification
  const [assId, setAssId] = useState(0);


  //state pour recuperer les donnees de l'assurance a modifier et preremplir le formulaire
  const [formUpdateAss, setFormUpdateAss] = useState({id: 0, type: '', matricule: '', adresse: "", tel: ""});

  //valeurs initiales du formulaire pour ajouter une allergie
  const assuranceInitialValues : AssuranceDto = {
      type: "",
      matricule: "",
      adresse: "",
      tel: "",
      patientId: Number(patientDetails?.id),
  };

  //update instantanement les donnees pour preremplir le formulaire de modification quand l'id change
  useEffect(() => {
    if (assId !== 0) {
      const ass = patientDetails?.assurance.find(a => a.id === assId);
      if (ass) setFormUpdateAss({
        id: ass!.id, 
        type: ass!.type, 
        matricule: ass!.matricule, 
        adresse: ass!.adresse,
        tel: ass!.tel
      });
    }
  }, [assId]);

  //valeurs initiales du formulaire pour modifier une assurance
  const assuranceToUpdateInitialValues: AssuranceDtoUpdate = formUpdateAss!;

  //fonction d'enregistrement d'une  assurance en BD
  const handleSubmitAssurance = async (
      values: AssuranceDto,
      formikHelpers: FormikHelpers<AssuranceDto>
      ) => {
      formikHelpers.setSubmitting(true);
      const response = await dispatch(createAssurance(values));

      if (response.meta.requestStatus === "fulfilled") {
          toast.success("Assurance ajoutée avec succès.");
          dispatch(getPatientDetails(Number(patientDetails?.id)));
          formikHelpers.resetForm();
      }

      if (response.meta.requestStatus === "rejected") {
          toast.error("Echec d'ajout de l'assurance.");
      }

      formikHelpers.setSubmitting(false);
  };

  //fonction de modification d'une assurance en BD
  const handleUpdateAssurance = async (values: AssuranceDtoUpdate,formikHelpers: FormikHelpers<AssuranceDtoUpdate>)=>{
    formikHelpers.setSubmitting(true);
    const response = await dispatch(updateAssurance(values));

    if (response.meta.requestStatus === "fulfilled") {
    toast.success("Assurance modifiée avec succès.");
    dispatch(getPatientDetails(Number(patientDetails?.id)));
    }

    if (response.meta.requestStatus === "rejected") {
    toast.error("Echec de modification de l'assurance.");
    }
  }; 

  // suppression d'assurance désactivée en front-end


  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <Dialog open={open} onOpenChange={setOpen}>  
                <Card className="bg-[#f7f9fa] p-4 relative">
                <CardAction className="flex absolute right-4 top-4 gap-2">
                    <DialogTrigger asChild>
                      {/* bouton pour ouvrir le dialog contenant le form d'ajout d'une assurance */}
                      <button onClick={() => { setActive("first"); setOpen(true); }} className="bg-[#0DABCB] text-white font-medium px-2 py-1 text-sm rounded-sm hover:bg-[#07c6ec] cursor-pointer">
                        Ajouter
                      </button>
                    </DialogTrigger>
                </CardAction>
                <CardTitle className="flex gap-2 items-center px-2">Assurance: { patientDetails?.assurance? <p className="text-black">{patientDetails.assurance.length}</p> : 0 }</CardTitle>
                {/* Affichage des assurances enregistrees en BD */}
                <div className="flex flex-col gap-4 p-2">
                    {patientDetails?.assurance?.length ? (
                    patientDetails?.assurance.map((ass) => (
                        <CardContent
                          key={ass.id}
                          className={`flex justify-between items-center p-1 text-sm border-b ${ass.isActive ? "" : "opacity-50 bg-gray-100"}`}
                        >
                        <div className="flex flex-col gap-2">
                          <p className=""><span className="font-medium">Type:</span> {ass.type}</p>
                          <p className=""><span className="font-medium">Matricule:</span> {ass.matricule}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className=""><span className="font-medium">Adresse:</span> {ass.adresse}</p>
                          <p className=""><span className="font-medium">Téléphone:</span> {ass.tel}</p>
                          {!ass.isActive && <span className="text-xs text-red-500 font-semibold">Inactif</span>}
                        </div>
                                <div className="flex gap-2 justify-end ">
                                  <button
                                    onClick={() => {setAssId(ass.id); setActive("second"); setOpen(true);}}
                                    className={`px-2 py-1 text-xs rounded-sm font-medium ${ass.isActive ? "bg-[#0DABCB] text-white hover:bg-[#07c6ec] cursor-pointer" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
                                    disabled={!ass.isActive}
                                  >
                                    Modifier
                                  </button>
                                </div>
                        </CardContent>
                    ))
                    ) : (
                    <p className="text-gray-500 text-sm">Aucune assurance</p>
                    )}
                </div>
                </Card>
                {/* Dialog + form pour ajouter une assurance */}
                {active === "first" && (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="font-medium text-[#0caccc]">
                    <DialogTitle className="text-xl text-center">Ajouter une assurance</DialogTitle>
                    </DialogHeader>
                    <Formik initialValues={assuranceInitialValues} validationSchema={assuranceSchema} onSubmit={handleSubmitAssurance}>
                    {(formik) => (
                    <Form className="flex flex-col gap-6 w-[80%] mx-auto">
                        <Input label="Type" name="type" type="text" placeholder="Entrez le type d'assurance"/>
                        <Input label="Matricule" name="matricule" type="text" placeholder="Entrez le matricule d'assuré" />
                        <Input label="Adresse" name="adresse" type="text" placeholder="Entrez l'adresse"/>
                        <Input label="Téléphone" name="tel" type="text" placeholder="Entrez le numéro de téléphone"/>
                        <DialogFooter className="flex gap-4 items-center justify-center py-4">
                            <DialogClose asChild className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                            <Button variant="outline">Annuler</Button>
                            </DialogClose>
                            <DialogClose asChild className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 hover:text-black cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                            <Button type="submit" disabled={formik.isSubmitting}>
                                Enregistrer
                            </Button>
                            </DialogClose>
                        </DialogFooter>
                    </Form>
                    )}
                    </Formik>
                  </DialogContent>
                )}
                {/* Dialog + form pour modifier une assurance */}
                {active === "second" && (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="font-medium text-[#0caccc]">
                    <DialogTitle className="text-xl text-center">Modifier l'assurance</DialogTitle>
                    </DialogHeader>
                    <Formik initialValues={assuranceToUpdateInitialValues} validationSchema={assuranceSchema} onSubmit={handleUpdateAssurance}>
                    {(formik) => (
                    <Form className="flex flex-col gap-6 w-[80%] mx-auto">
                        <Input label="Type" name="type" type="text" placeholder="Entrez le type d'assurance"/>
                        <Input label="Matricule" name="matricule" type="text" placeholder="Entrez le matricule d'assuré" />
                        <Input label="Adresse" name="adresse" type="text" placeholder="Entrez l'adresse"/>
                        <Input label="Téléphone" name="tel" type="text" placeholder="Entrez le numéro de téléphone"/>
                        <DialogFooter className="flex gap-4 items-center justify-center py-4">
                            <DialogClose asChild className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                            <Button variant="outline">Annuler</Button>
                            </DialogClose>
                            <DialogClose asChild className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 hover:text-black cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                              <Button type="submit" disabled={formik.isSubmitting}>
                                  Modifier
                              </Button>
                            </DialogClose>
                        </DialogFooter>
                    </Form>
                    )}
                    </Formik>
                  </DialogContent>
                )}
            </Dialog>
    </section>
  );
};

export default Assurance;
