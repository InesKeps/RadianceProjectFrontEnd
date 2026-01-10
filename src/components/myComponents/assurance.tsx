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
import type { AssuranceDto, AssuranceDtoUpdate } from "@/types/historique";
import { createAssurance, deleteAssurance, updateAssurance } from "@/store/assurances/actions";
import { toast } from "sonner";
import useAppDispatch from "@/hooks/useAppDispatch";
import { assuranceSchema } from "@/pages/admin/Patients/addpatient";
import Input from "@/components/myComponents/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Assurance = () => {
    const dispatch = useAppDispatch();
    const patientDetails = useAppSelector((state: RootState) => state.patient.selectedPatient);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<"first" | "second" | null>(null);
    const [assId, setAssId] = useState(0);
    const [formUpdateAss, setFormUpdateAss] = useState({id: 0, type: '', matricule: '', adresse: ""});


    const assuranceInitialValues : AssuranceDto = {
        type: "",
        matricule: "",
        adresse: "",
        patientId: Number(patientDetails?.id),
    };

    useEffect(() => {
      if (assId !== 0) {
        const ass = patientDetails?.assurance.find(a => a.id === assId);
        if (ass) setFormUpdateAss({
          id: ass!.id, 
          type: ass!.type, 
          matricule: ass!.matricule, 
          adresse: ass!.adresse
        });
      }
    }, [assId]);

    const OpenFormUpdate = () =>{
      console.log(assId);
      setActive("second");
      setOpen(true);

    };

    const assuranceToUpdateInitialValues: AssuranceDtoUpdate = formUpdateAss!;

    const handleSubmitAssurance = async (
        values: AssuranceDto,
        formikHelpers: FormikHelpers<AssuranceDto>
        ) => {
        formikHelpers.setSubmitting(true);
        const response = await dispatch(createAssurance(values));

        if (response.meta.requestStatus === "fulfilled") {
            toast.success("Assurance ajoutée avec succès.");
            formikHelpers.resetForm();
            
            window.location.reload();
        }

        if (response.meta.requestStatus === "rejected") {
            toast.error("Echec d'ajout de l'assurance.");
        }

        formikHelpers.setSubmitting(false);
    };

  const [selectedIdDel, setSelectedIdDel] = useState<number | null>(null);

  const handleIdToDelete = (id: number) => {
    setSelectedIdDel(id);
  };

  const handleDeleteAssurance = async (id:number)=>{
    const response = await dispatch(deleteAssurance(id));

    if (response.meta.requestStatus === "fulfilled") {
    toast.success("Assurance supprimée avec succès.");
    window.location.reload();
    }

    if (response.meta.requestStatus === "rejected") {
    toast.error("Echec de suppression de l'assurance.");
    }
  };

  const handleUpdateAssurance = async (values: AssuranceDtoUpdate,formikHelpers: FormikHelpers<AssuranceDtoUpdate>)=>{
    console.log(values);
    
    formikHelpers.setSubmitting(true);
    const response = await dispatch(updateAssurance(values));

    if (response.meta.requestStatus === "fulfilled") {
    toast.success("Assurance modifiée avec succès.");
    console.log("success");
    window.location.reload();
    }

    if (response.meta.requestStatus === "rejected") {
    toast.error("Echec de modification de l'assurance.");
    }
  };
  

  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <AlertDialog>
            <Dialog open={open} onOpenChange={setOpen}>  
                <Card className="bg-[#f7f9fa] p-4 relative">
                <CardAction className="flex absolute right-4 top-4 gap-2">
                    <DialogTrigger asChild>
                    <button onClick={() => { setActive("first"); setOpen(true); }} className="bg-[#0DABCB] text-white font-medium px-2 py-1 text-sm rounded-sm hover:bg-[#07c6ec] cursor-pointer">Ajouter</button>
                    </DialogTrigger>
                </CardAction>
                <CardTitle className="flex items-center justify-between px-2">Assurance: <b className="text-black">{patientDetails?.assurance.length ?? 0}</b></CardTitle>
                <div className="flex flex-col gap-4 p-4">
                    {patientDetails?.assurance.length ? (
                    patientDetails?.assurance.map((ass) => (
                        <CardContent key={ass.id} className="grid grid-cols-10 p-1 text-sm border-b">
                        <p className="col-span-3"><span className="font-medium">Type:</span> {ass.type}</p>
                        <p className="col-span-3"><span className="font-medium">Matricule:</span> {ass.matricule}</p>
                        <p className="col-span-3"><span className="font-medium">Adresse:</span> {ass.adresse}</p>
                        <div className="flex gap-2 justify-end col-span-1">
                            <div>
                              <button onClick={() => {
                                setAssId(ass.id);
                                OpenFormUpdate();}}
                                className="bg-[#0DABCB] text-white font-medium px-2 py-1 text-xs rounded-sm hover:bg-[#07c6ec] cursor-pointer"
                              >
                                Modifier
                              </button>
                            </div>
                            <AlertDialogTrigger onClick={()=>handleIdToDelete(Number(ass.id))} className="bg-red-500 text-white font-medium px-2 py-1 text-xs rounded-sm hover:bg-red-600 cursor-pointer">Supprimer</AlertDialogTrigger>
                        </div>
                        </CardContent>
                    ))
                    ) : (
                    <p className="text-gray-500">Aucune assurance</p>
                    )}
                </div>
                </Card>
                <form>
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
                </form>
            </Dialog>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Attention</AlertDialogTitle>
                <AlertDialogDescription>
                Vous voulez vraiment supprimer cette assurance?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={()=>handleDeleteAssurance(selectedIdDel!)} className="bg-red-300">Oui, Supprimer</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </section>
  );
};

export default Assurance;
