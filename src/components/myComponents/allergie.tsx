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
import { allergieSchema, antecedentSchema } from "@/pages/admin/Patients/addpatient";
import Input from "@/components/myComponents/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { AllergieDtoUpdate } from "@/types/historique";
import { createAllergie, deleteAllergie, updateAllergie } from "@/store/allergies/actions";

const Allergie = () => {
    const dispatch = useAppDispatch();
    const patientDetails = useAppSelector((state: RootState) => state.patient.selectedPatient);
        const [open, setOpen] = useState(false);
        const [active, setActive] = useState<"first" | "second" | null>(null);
        const [allId, setAllId] = useState(0);
        const [formUpdateAll, setFormUpdateAll] = useState({id: 0, nomAllergie: ""});

    const allergieInitialValues = {
        allergies: [""],
    };

    useEffect(() => {
        if (allId !== 0) {
        const all = patientDetails?.allergie.find(a => a.id === allId);
        if (all) setFormUpdateAll({
            id: all!.id, 
            nomAllergie: all!.nomAllergie, 
        });
        }
    }, [allId]);

    const allergieToUpdateInitialValues: AllergieDtoUpdate = formUpdateAll!;

    const OpenFormUpdate = () =>{
        setActive("second");
        setOpen(true);
    };

    const handleSubmitAllergie = async (
        values: {allergies: string[]},
        formikHelpers: FormikHelpers<{allergies: string[]}>
        ) => {
        formikHelpers.setSubmitting(true);

        const value = {
            nomAllergie: "",
            patientId: Number(patientDetails?.id)
        }
        for (let i = 0; i < values.allergies.length; i++) {
            value.nomAllergie = values.allergies[i];  
            
            const response = await dispatch(createAllergie(value));

            if (response.meta.requestStatus === "fulfilled") {
                toast.success("Allergie ajoutée avec succès.");
                formikHelpers.resetForm();
                
                window.location.reload();
            }
    
            if (response.meta.requestStatus === "rejected") {
                toast.error("Echec d'ajout de l'allergie.");
            }
    
        }
        
        formikHelpers.setSubmitting(false);
    };

    const handleUpdateAllergie = async (values: AllergieDtoUpdate,formikHelpers: FormikHelpers<AllergieDtoUpdate>)=>{
        
        formikHelpers.setSubmitting(true);
        const response = await dispatch(updateAllergie(values));
    
        if (response.meta.requestStatus === "fulfilled") {
        toast.success("Allergie modifiée avec succès.");
        console.log("success");
        window.location.reload();
        }
    
        if (response.meta.requestStatus === "rejected") {
        toast.error("Echec de modification de l'allergie.");
        }
    };

    const [selectedIdDel, setSelectedIdDel] = useState<number | null>(null);

    const handleIdToDelete = (id: number) => {
        setSelectedIdDel(id);
    };

    const handleDeleteAllergie = async (id:number)=>{
        const response = await dispatch(deleteAllergie(id));

        if (response.meta.requestStatus === "fulfilled") {
        toast.success("Allergie supprimée avec succès.");
        window.location.reload();
        }

        if (response.meta.requestStatus === "rejected") {
        toast.error("Echec de suppression de l'allergie.");
        }
    };

  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <AlertDialog>
            <Dialog open={open} onOpenChange={setOpen}>  
                <Card className="bg-[#f7f9fa] p-4">
                    <CardAction className="flex absolute right-4 top-4 gap-2">
                        <DialogTrigger asChild>
                        <button onClick={() => { setActive("first"); setOpen(true); }} className="bg-[#0DABCB] text-white font-medium px-2 py-1 text-sm rounded-sm hover:bg-[#07c6ec] cursor-pointer">Ajouter</button>
                        </DialogTrigger>
                    </CardAction>
                    <CardTitle className="flex justify-between px-2">Allergies: <b className="text-black">{patientDetails?.allergie.length}</b></CardTitle>
                    <CardContent>
                    {patientDetails?.allergie?.length ? (
                    patientDetails.allergie.map((all) => (
                        <div className="flex justify-between border-b py-2">
                            <p key={all.id}>{all.nomAllergie}</p>
                            <div className="flex gap-2">
                                <button onClick={() => {setAllId(all.id); OpenFormUpdate();}} className="bg-[#0DABCB] text-white font-medium px-2 py-1 text-xs rounded-sm hover:bg-[#07c6ec] cursor-pointer">Modifier</button>
                                <AlertDialogTrigger onClick={()=>handleIdToDelete(Number(all.id))} className="bg-red-500 text-white font-medium px-2 py-1 text-xs rounded-sm hover:bg-red-600 cursor-pointer">Supprimer</AlertDialogTrigger>
                            </div>
                        </div>
                    ))
                    ) : (
                    <p className="text-gray-500">Aucune allergie</p>
                    )}
                    </CardContent>
                </Card>
                <form>
                {active === "first" && (
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="font-medium text-[#0caccc]">
                        <DialogTitle className="text-xl text-center">Enregistrement des allergies</DialogTitle>
                        </DialogHeader>
                        <Formik initialValues={allergieInitialValues} onSubmit={handleSubmitAllergie}  validationSchema={allergieSchema} >
                            {(formik) => (
                            <Form className="flex flex-col gap-6 w-[90%] mx-auto">
                                <CardContent>
                                    <FieldArray name="allergies">
                                        {({ push, remove }) => (
                                        <div className="flex flex-col gap-3">
                                        {formik.values.allergies.map((_: any, index: any) => (
                                        <div className="flex gap-2" key={index}>
                                        <Field
                                        className="w-full outline-none py-1 px-3 shadow-sm bg-white rounded-full placeholder:text-xs"
                                        name={`allergies[${index}]`}
                                        placeholder="Entrer l'allergie"
                                        />
                                        <button type="button"  onClick={() => remove(index)} className="cursor-pointer hover:text-red-500">Supprimer</button>
                                        </div>
                                        ))}
                                        <button type="button" onClick={() => push("")} className="text-[#0DABCB] hover:text-[#00cff8] font-medium cursor-pointer">Ajouter une allergie</button>
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
                        <DialogTitle className="text-xl text-center">Modification de l'allergie</DialogTitle>
                        </DialogHeader>
                        <Formik initialValues={allergieToUpdateInitialValues} validationSchema={antecedentSchema} onSubmit={handleUpdateAllergie}>
                            {(formik) => (
                            <Form className="flex flex-col gap-6 w-[90%] mx-auto">
                                <Input label="Nom de l'allergie" name="nomAllergie" type="text" placeholder="Entrez le nom de l'allergie"/>
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
                </form>
            </Dialog>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Attention</AlertDialogTitle>
                <AlertDialogDescription>
                Vous voulez vraiment supprimer cet allergie?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={()=>handleDeleteAllergie(selectedIdDel!)} className="bg-red-300">Oui, Supprimer</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </section>
  );
};

export default Allergie;