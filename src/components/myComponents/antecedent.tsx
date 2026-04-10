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
import { Formik, Form, type FormikHelpers, Field, FieldArray } from "formik";
import {
  Card,
  CardContent,
  CardAction,
  CardTitle
} from "@/components/ui/card";
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
import useAppDispatch from "@/hooks/useAppDispatch";
import { antecedentSchema } from "@/pages/admin/Patients/addpatient";
import Input from "@/components/myComponents/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { AntecedentDtoUpdate } from "@/types/patientdata";
import { createAntecedent, deleteAntecedent, updateAntecedent } from "@/store/antecedents/actions";
import { getPatientDetails } from "@/store/patients/actions";
import { toast } from "react-toastify";

// Composant pour afficher et gérer les antécédents du patient sur la page DetailsPatient

const Antecedent = () => {
    const dispatch = useAppDispatch();
     //recuperation du patient selectionne dont on veut traiter les details
    const patientDetails = useAppSelector((state: RootState) => state.patient.selectedPatient);

    //states pour controller l'etat des boites de dialogues
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<"first" | "second" | null>(null);

    //state pour conserver l'id de l'antecedent selectionné pour la modification
    const [antId, setAntId] = useState(0);

    //state pour conserver l'id de l'antecedent selectionné pour la suppression
    const [selectedIdDel, setSelectedIdDel] = useState<number | null>(null);

    //state pour recuperer les donnees de l'antecedent a modifier et preremplir le formulaire
    const [formUpdateAnt, setFormUpdateAnt] = useState({id: 0, nomAntecedent: ""});

    //valeurs initiales du formulaire pour ajouter un antecedent
    const antecedentInitialValues = {
        antecedents: [""],
    };

    //update instantanement les donnees pour preremplir le formulaire de modification quand l'id change
    useEffect(() => {
        if (antId !== 0) {
        const ant = patientDetails?.antecedent.find(a => a.id === antId);
        if (ant) setFormUpdateAnt({
            id: ant!.id, 
            nomAntecedent: ant!.nomAntecedent, 
        });
        }
    }, [antId]);

    //valeurs initiales du formulaire pour modifier un antecedent
    const antecedentToUpdateInitialValues: AntecedentDtoUpdate = formUpdateAnt!;

    //fonction d'enregistrement d'un ou plusieurs antecedent(s) en BD
    const handleSubmitAntecedent = async (
        values: {antecedents: string[]},
        formikHelpers: FormikHelpers<{antecedents: string[]}>
        ) => {
        formikHelpers.setSubmitting(true);

        const value = {
            nomAntecedent: "",
            patientId: Number(patientDetails?.id)
        }
        for (let i = 0; i < values.antecedents.length; i++) {
            value.nomAntecedent = values.antecedents[i];  
            
            const response = await dispatch(createAntecedent(value));

            if (response.meta.requestStatus === "fulfilled") {
                toast.success("Antécédent ajouté avec succès.");
                dispatch(getPatientDetails(Number(patientDetails?.id)));
                formikHelpers.resetForm();
            }
    
            if (response.meta.requestStatus === "rejected") {
                toast.error("Echec d'ajout de l'antécédent.");
            }
    
        }
        
        formikHelpers.setSubmitting(false);
    };

    //fonction de modification d'un antecedent en BD
    const handleUpdateAntecedent = async (values: AntecedentDtoUpdate,formikHelpers: FormikHelpers<AntecedentDtoUpdate>)=>{
        console.log(formUpdateAnt);
        
        console.log(values);
        
        formikHelpers.setSubmitting(true);
        const response = await dispatch(updateAntecedent(values));
    
        if (response.meta.requestStatus === "fulfilled") {
        toast.success("Antecedent modifiée avec succès.");
        dispatch(getPatientDetails(Number(patientDetails?.id)));
        }
    
        if (response.meta.requestStatus === "rejected") {
        toast.error("Echec de modification de l'antecedent.");
        }
    };

    //fonction de suppression d'un antecedent en BD
    const handleDeleteAntecedent = async (id:number)=>{
        const response = await dispatch(deleteAntecedent(id));

        if (response.meta.requestStatus === "fulfilled") {
        toast.success("Assurance supprimée avec succès.");
        dispatch(getPatientDetails(Number(patientDetails?.id)));
        }

        if (response.meta.requestStatus === "rejected") {
        toast.error("Echec de suppression de l'assurance.");
        }
    };

  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <AlertDialog>
            <Dialog open={open} onOpenChange={setOpen}>  
                <Card className="bg-[#f7f9fa] p-4 ">
                    <CardAction className="flex absolute right-4 top-4 gap-2">
                        <DialogTrigger asChild>
                            {/* bouton pour ouvrir le dialog contenant le form d'ajout d'un antecedent */}
                            <button onClick={() => { setActive("first"); setOpen(true); }} className="bg-[#0DABCB] text-white font-medium px-2 py-1 text-sm rounded-sm hover:bg-[#07c6ec] cursor-pointer">
                                Ajouter
                            </button>
                        </DialogTrigger>
                    </CardAction>
                    <CardTitle className="flex gap-2 items-center px-2">Antécédents: { patientDetails?.antecedent? <p className="text-black">{patientDetails.antecedent.length}</p> : 0 }</CardTitle>
                    {/* Affichage des allergies enregistrees en BD */}
                    <CardContent>
                        {patientDetails?.antecedent?.length ? (
                        patientDetails.antecedent.map((ant) => (
                            <div className="flex items-center justify-between border-b py-2">
                                <p className="text-sm" key={ant.id}>{ant.nomAntecedent}</p>
                                <div className="flex gap-2">
                                    {/* bouton pour ouvrir le dialog contenant le form de modification d'un antecedent */}
                                    <button onClick={() => {setAntId(ant.id); setActive("second"); setOpen(true);}} className="bg-[#0DABCB] text-white font-medium px-2 py-1 text-xs rounded-sm hover:bg-[#07c6ec] cursor-pointer">
                                        Modifier
                                    </button>
                                    {/* bouton pour supprimer un antecedent */}
                                    <AlertDialogTrigger onClick={()=>(setSelectedIdDel(ant.id))} className="bg-red-500 text-white font-medium px-2 py-1 text-xs rounded-sm hover:bg-red-600 cursor-pointer">
                                        Supprimer
                                    </AlertDialogTrigger>
                                </div>
                            </div>
                        ))
                        ) : (
                        <p className="text-gray-500 text-sm">Aucun antécédent</p>
                        )}
                    </CardContent>
                </Card>
                {/* Dialog + form pour ajouter un antecedent */}
                {active === "first" && (
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-medium text-[#0caccc]">
                        <DialogTitle className="text-xl text-center">Enregistrement des antécédents</DialogTitle>
                        </DialogHeader>
                        <Formik initialValues={antecedentInitialValues} validationSchema={antecedentSchema} onSubmit={handleSubmitAntecedent}>
                            {(formik) => (
                            <Form className="flex flex-col gap-6 w-[90%] mx-auto">
                                <FieldArray name="antecedents">
                                    {({ push, remove }) => (
                                    <div className="flex flex-col gap-3">
                                    {formik.values.antecedents.map((_: any, index: any) => (
                                    <div className="flex gap-2" key={index}>
                                    <Field
                                    className="w-full outline-none py-1 px-3 shadow-sm bg-white rounded-full placeholder:text-xs"
                                    name={`antecedents[${index}]`}
                                    placeholder="Entrer l'antécédent"
                                    />
                                    <button type="button"  onClick={() => remove(index)} className="cursor-pointer hover:text-red-500">Supprimer</button>
                                    </div>
                                    ))}
                                    <button type="button" onClick={() => push("")} className="text-[#0DABCB] hover:text-[#00cff8] font-medium cursor-pointer">Ajouter un antécédent</button>
                                    </div>
                                    )}
                                </FieldArray>
                                <DialogFooter className="flex gap-4 items-center justify-center py-4">
                                    <DialogClose asChild className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                        <Button variant="outline">Annuler</Button>
                                    </DialogClose>
                                    <DialogClose asChild className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
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
                {/* Dialog + form pour modifier un antecedent */}
                {active === "second" && (
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-medium text-[#0caccc]">
                        <DialogTitle className="text-xl text-center">Modification de l'antécédent</DialogTitle>
                        </DialogHeader>
                        <Formik initialValues={antecedentToUpdateInitialValues} validationSchema={antecedentSchema} onSubmit={handleUpdateAntecedent}>
                            {(formik) => (
                            <Form className="flex flex-col gap-6 w-[90%] mx-auto">
                                <Input label="Nom de l'Antécédent" name="nomAntecedent" type="text" placeholder="Entrez le nom de l'antécédent"/>
                                <DialogFooter className="flex gap-4 items-center justify-center py-4">
                                    <DialogClose asChild className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                        <Button variant="outline">Annuler</Button>
                                    </DialogClose>
                                    <DialogClose asChild className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
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
            {/* Alerte pour confirmer la suppression d'un antecedent */}
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Attention</AlertDialogTitle>
                <AlertDialogDescription>
                Vous voulez vraiment supprimer cet antecedent?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={()=>handleDeleteAntecedent(selectedIdDel!)} className="bg-red-300">Oui, Supprimer</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </section>
  );
};

export default Antecedent;