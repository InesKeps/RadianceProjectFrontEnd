import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Formik, Form, type FormikHelpers, Field, FieldArray } from "formik";
import {
  Card,
  CardContent,
  CardFooter,
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
import { toast } from "sonner";
import useAppDispatch from "@/hooks/useAppDispatch";
import { antecedentSchema } from "@/pages/admin/Patients/addpatient";
import Input from "@/components/myComponents/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { AntecedentDtoUpdate } from "@/types/historique";
import { createAntecedent, deleteAntecedent, updateAntecedent } from "@/store/antecedents/actions";

const Antecedent = () => {
    const dispatch = useAppDispatch();
    const patientDetails = useAppSelector((state: RootState) => state.patient.selectedPatient);
        const [open, setOpen] = useState(false);
        const [active, setActive] = useState<"first" | "second" | null>(null);
        const [antId, setAntId] = useState(0);
        const [formUpdateAnt, setFormUpdateAnt] = useState({id: 0, nomAntecedent: ""});

    const antecedentInitialValues = {
        antecedents: [""],
    };

    useEffect(() => {
        if (antId !== 0) {
        const ant = patientDetails?.antecedent.find(a => a.id === antId);
        if (ant) setFormUpdateAnt({
            id: ant!.id, 
            nomAntecedent: ant!.nomAntecedent, 
        });
        }
    }, [antId]);

    const OpenFormUpdate = () =>{
        console.log(antId);
        setActive("second");
        setOpen(true);
    };

    const antecedentToUpdateInitialValues: AntecedentDtoUpdate = formUpdateAnt!;

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
                toast.success("Antecedent ajoutée avec succès.");
                formikHelpers.resetForm();
                
                window.location.reload();
            }
    
            if (response.meta.requestStatus === "rejected") {
                toast.error("Echec d'ajout de l'Antecedent.");
            }
    
        }
        
        formikHelpers.setSubmitting(false);
    };

    const handleUpdateAntecedent = async (values: AntecedentDtoUpdate,formikHelpers: FormikHelpers<AntecedentDtoUpdate>)=>{
        console.log(formUpdateAnt);
        
        console.log(values);
        
        formikHelpers.setSubmitting(true);
        const response = await dispatch(updateAntecedent(values));
    
        if (response.meta.requestStatus === "fulfilled") {
        toast.success("Antecedent modifiée avec succès.");
        console.log("success");
        // window.location.reload();
        }
    
        if (response.meta.requestStatus === "rejected") {
        toast.error("Echec de modification de l'antecedent.");
        }
    };

    const [selectedIdDel, setSelectedIdDel] = useState<number | null>(null);

    const handleIdToDelete = (id: number) => {
        setSelectedIdDel(id);
    };

    const handleDeleteAntecedent = async (id:number)=>{
        const response = await dispatch(deleteAntecedent(id));

        if (response.meta.requestStatus === "fulfilled") {
        toast.success("Assurance supprimée avec succès.");
        window.location.reload();
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
                        <button onClick={() => { setActive("first"); setOpen(true); }} className="bg-[#0DABCB] text-white font-medium px-2 py-1 text-sm rounded-sm hover:bg-[#07c6ec] cursor-pointer">Ajouter</button>
                        </DialogTrigger>
                    </CardAction>
                    <CardTitle className="flex items-center justify-between px-2">Antécédents: <b className="text-black">{patientDetails?.antecedent.length}</b></CardTitle>
                    <CardContent>
                        {patientDetails?.antecedent?.length ? (
                        patientDetails.antecedent.map((ant) => (
                            <div className="flex justify-between border-b py-2">
                            <p key={ant.id}>{ant.nomAntecedent}</p>
                            <div className="flex gap-2">
                                <button onClick={() => {setAntId(ant.id); OpenFormUpdate();}} className="bg-[#0DABCB] text-white font-medium px-2 py-1 text-xs rounded-sm hover:bg-[#07c6ec] cursor-pointer">Modifier</button>
                                <AlertDialogTrigger onClick={()=>handleIdToDelete(Number(ant.id))} className="bg-red-500 text-white font-medium px-2 py-1 text-xs rounded-sm hover:bg-red-600 cursor-pointer">Supprimer</AlertDialogTrigger>
                            </div>
                            </div>
                        ))
                        ) : (
                        <p className="text-gray-500">Aucun antécédent</p>
                        )}
                        </CardContent>
                    </Card>
                <form>
                {active === "first" && (
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-medium text-[#0caccc]">
                        <DialogTitle className="text-xl text-center">Enregistrement des antécédents</DialogTitle>
                        </DialogHeader>
                        <Formik initialValues={antecedentInitialValues} validationSchema={antecedentSchema} onSubmit={handleSubmitAntecedent}>
                            {(formik) => (
                            <Form className="flex flex-col gap-6 w-[90%] mx-auto">
                                <CardContent>
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
                                </CardContent>
                                <CardFooter className="flex gap-4 items-center justify-center py-4">
                                    <button type="submit" disabled={formik.isSubmitting} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-full">
                                        Enregistrer
                                    </button>
                                </CardFooter>
                            </Form>
                            )}
                        </Formik>
                    </DialogContent>
                )}
                {active === "second" && (
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-medium text-[#0caccc]">
                        <DialogTitle className="text-xl text-center">Modification de l'antécédent</DialogTitle>
                        </DialogHeader>
                        <Formik initialValues={antecedentToUpdateInitialValues} validationSchema={antecedentSchema} onSubmit={handleUpdateAntecedent}>
                            {(formik) => (
                            <Form className="flex flex-col gap-6 w-[90%] mx-auto">
                                <CardContent>
                                    <Input label="Nom de l'Antécédent" name="antecedent" type="text" placeholder="Entrez le nom de l'antécédent"/>
                                </CardContent>
                                <CardFooter className="flex gap-4 items-center justify-center py-4">
                                    <button type="submit" disabled={formik.isSubmitting} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-full">
                                        Modifier
                                    </button>
                                </CardFooter>
                            </Form>
                            )}
                        </Formik>
                    </DialogContent>
                )}
                </form>
            </Dialog>
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