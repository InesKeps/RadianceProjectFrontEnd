"use client"

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import InputForm from "@/components/myComponents/input"
import { Formik, Form, type FormikHelpers } from "formik"
import { toast } from "react-toastify";
import { createConsultation } from "@/store/consultations/actions";
import useAppDispatch from "@/hooks/useAppDispatch";
import { Card} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import { createMotif, getAllMotifs } from "@/store/motifs/actions";
import useAuth from "@/hooks/useAuth";
import Soins from "@/pages/admin/consultation/tableaddedsoins/soins";
import type { ConsultationDto, MotifDto, SoinDto } from "@/types/consultationdatas";
import { createSoin } from "@/store/soins/actions";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { createPrescription } from "@/store/prescriptions/actions";
import AddedPrescriptions from "./tableAddedPrescriptions/prescriptions";
import { createSoinConsultation } from "@/store/soinsconsultations/actions";
import Devis from "./tableaddedsoinsdevis/devis";
import { createSoinDevis } from "@/store/devis/actions";
import { createMotifConsultation } from "@/store/motifsconsultations/actions";
import useRoutePrefix from "@/hooks/useRoutePrefix"

const AddConsultation = () => {
    const { id } = useParams();
    const patientId = Number(id);
    const user = useAuth();
    const userId = user?.userInfo?.userToLogin?.id!;
    const navigate = useNavigate();
    const baseRoute = useRoutePrefix();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [activeAlert, setActiveAlert] = useState<"first" | "second" | null>(null);
    const [active, setActive] = useState<"first" | "second" | null>(null);
    const [value, setValue] = useState("");
    const [dateError, setDateError] = useState("");
    const [motifError, setMotifError] = useState("");
    const [selectedMotifs, setSelectedMotifs] = useState<{ id: number; nomMotif: string }[]>([]);
    const motifs = useAppSelector((state: RootState) => state.motif.items);
    const addedSoins = useAppSelector((state: RootState) => state.addedSoin.items);
    const soinsDevis = useAppSelector((state: RootState) => state.devisSoins.items);
    const addedPrescriptions = useAppSelector((state: RootState) => state.addedPrescription.items);
    function getCurrentDateTimeLocal() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    useEffect(() => {
        dispatch(getAllMotifs());
    }, [dispatch]);    

    const values : ConsultationDto = {
        dateHeure: getCurrentDateTimeLocal(),
        patientId: Number(patientId),
        userId: Number(userId)
    };

    const motifInitialValues : MotifDto = {
        nomMotif: "",
    };

    const soinInitialValues : SoinDto = {
        nom: "",
        codification: "",
        tarif: 0
    };

    const motifSchema = yup.object().shape({
        nomMotif: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "le motif ne doit pas dépasser 50 caractères")
            .required("Motif requis"),
    });
    
    const soinSchema = yup.object().shape({
        nom: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "Le nom du soin doit pas dépasser 50 caractères")
            .required("Soin requis"),
        codification: yup
            .string()
            .trim()
            .max(10, "La codification ne doit pas dépasser 10 caractères")
            .required("codification requise"),
        tarif: yup
            .number()
            .min(25, "le tarif doit etre au dessus de 25")
            .required("Tarif requis")
    });

    const verifierConsultation = () =>{

        if(!values.dateHeure){
            setDateError("Veuillez entrer la date")
        }else if(selectedMotifs.length === 0){
            setMotifError("Veuillez sélectionner un motif")
        }else{
            setActiveAlert("first")
            setOpenAlert(true);
        }
    }

    const handleSubmitConsultation = async () => {

        const response = await dispatch(createConsultation(values));
        let consultationId = 0;
        let submitState = false;
        let submitError = "";

        if (createConsultation.fulfilled.match(response)) {
            consultationId = response.payload.data.id;
            submitState = true;
        } else if (createConsultation.rejected.match(response)) {
            console.error("Erreur:", response.payload);
            submitState = false;
            submitError = "Echec d'enregistrement de la consultation";
        }

        for (let i = 0; i < selectedMotifs.length; i++) {
            const response = await dispatch(createMotifConsultation({
                consultationId,
                motifId: selectedMotifs[i].id,
            }));
            if (response.meta.requestStatus === "fulfilled") {
                submitState = true;
            }
            if (response.meta.requestStatus === "rejected") {
                submitState = false;
                submitError = "Echec d'enregistrement des motifs";
            }
        }

        for (let i = 0; i < addedSoins.length; i++) {
            const response = await dispatch(createSoinConsultation({
                consultationId: consultationId,
                soinId: addedSoins[i].idSoin,
                dentId: addedSoins[i].idDent,
            }));
            if (response.meta.requestStatus === "fulfilled") {
                submitState = true;
            }
            if (response.meta.requestStatus === "rejected") {
                submitState = false;
                submitError = "Echec d'enregistrement des soins";
            }
        }

        for (let i = 0; i < soinsDevis.length; i++) {
            const response = await dispatch(createSoinDevis({
                consultationId: consultationId,
                soinId: soinsDevis[i].idSoin,
                dentId: soinsDevis[i].idDent,
            }));
            if (response.meta.requestStatus === "fulfilled") {
                submitState = true;
            }
            if (response.meta.requestStatus === "rejected") {
                submitState = false;
                submitError = "Echec d'enregistrement du devis";
            }
        }

        if (addedPrescriptions.length > 0) {
            for (let i = 0; i < addedPrescriptions.length; i++) {
            const response = await dispatch(createPrescription({
                nomMedicament: addedPrescriptions[i].nomMedicament,
                grammage: addedPrescriptions[i].grammage,
                forme: addedPrescriptions[i].forme,
                posologie: addedPrescriptions[i].posologie,
                duree: addedPrescriptions[i].duree,
                quantite: addedPrescriptions[i].quantite,
                consultationId: consultationId,
            }));
            if (response.meta.requestStatus === "fulfilled") {
                submitState = true;
            }
            if (response.meta.requestStatus === "rejected") {
                submitState = false;
                submitError = "Echec d'enregistrement des prescriptions";
            }
        }
        }

        if (submitState === true){
            toast.success("Consultation enregistrée avec succès.");
            navigate(`${baseRoute}/detailspatient/${patientId}`);
        }else{
            toast.error(submitError);
        }
    };


    const handleSubmitMotif = async (
        values: MotifDto,
        formikHelpers: FormikHelpers<MotifDto>
        ) => {
        formikHelpers.setSubmitting(true);
        const response = await dispatch(createMotif(values));
        console.log("error?");    

        if (response.meta.requestStatus === "fulfilled") {
            toast.success("Nouveau motif ajouté avec succès.");
            formikHelpers.resetForm();
        }

        if (response.meta.requestStatus === "rejected") {
            toast.error("Echec d'ajout du nouveau motif.");
        }

        formikHelpers.setSubmitting(false);
    };

    const handleSubmitSoin = async (
        values: SoinDto,
        formikHelpers: FormikHelpers<SoinDto>
        ) => {
        formikHelpers.setSubmitting(true);
        const response = await dispatch(createSoin(values));
        
        if (response.meta.requestStatus === "fulfilled") {
            toast.success("Nouveau soin ajouté avec succès.");
            formikHelpers.resetForm();
        }

        if (response.meta.requestStatus === "rejected") {
            toast.error("Echec d'ajout du nouveau soin.");
        }

        formikHelpers.setSubmitting(false);
    };

    return (
        <section className="flex flex-col gap-4 w-full h-full relative">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <button
                    type="button"
                    onClick={() => {setActiveAlert("second"); setOpenAlert(true)}}
                    className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer"
                >
                    <FaChevronCircleLeft />
                </button>
                <h1 className="font-medium text-xl text-center text-[#0caccc]">Enregistrement de consultation</h1>
                    <form className="flex flex-col p-8 gap-8 w-full mx-auto">
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-8 w-full">
                                <Card className="bg-[#f7f9fa] shadow-md p-8 w-1/3">
                                    <label htmlFor="dateHeure" className="font-medium text-sm">Date et heure de la consultation</label>
                                    <Input defaultValue={values.dateHeure} name="dateHeure" type="datetime-local" placeholder="Entrez la date et l'heure"/>
                                    <p className="text-sm text-red-500">{dateError}</p>
                                </Card>
                                <Card className="bg-[#f7f9fa] shadow-md p-8 w-2/3">
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <div className="flex justify-between gap-4">
                                            <div className="flex flex-col gap-2">
                                                <p className="font-semibold">Motifs de consultation</p>
                                                {selectedMotifs.length === 0 ? (
                                                    <p className="text-sm text-gray-500">Aucun motif sélectionné</p>
                                                ) : (
                                                    <ul>
                                                    {selectedMotifs.map((motif, index) => (
                                                        <li
                                                        key={motif.id}
                                                        className="flex text-sm font-medium items-center gap-2"
                                                        >
                                                        <p>{motif.nomMotif}</p>
                                                        <button
                                                            onClick={() =>
                                                            setSelectedMotifs(prev => prev.filter((_, i) => i !== index))
                                                            }
                                                            className="text-xs cursor-pointer text-red-500 hover:text-red-600"
                                                        >
                                                            Supprimer
                                                        </button>
                                                        </li>
                                                    ))}
                                                    </ul>
                                                )}
                                                <p className="text-sm text-red-500">{motifError}</p>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div className="flex gap-8">
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={open}
                                                            className="w-[200px] justify-between"
                                                        >
                                                            {value
                                                            ? motifs.find((motif) => motif.nomMotif === value)?.nomMotif
                                                            : "Sélectionner un motif..."}
                                                            <ChevronsUpDown className="opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <button
                                                        type="button" 
                                                        onClick={() => {
                                                            const motif = motifs.find(m => m.nomMotif === value);
                                                            if (motif && !selectedMotifs.some(m => m.id === motif.id)) {
                                                            setSelectedMotifs(prev => [...prev, { id: motif.id, nomMotif: motif.nomMotif }]);
                                                            }
                                                        }} 
                                                        className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full">
                                                        Sélectionner
                                                    </button>
                                                </div>
                                                <DialogTrigger onClick={() => { setActive("first"); setOpen(true); }} className="text-xs text-[#0DABCB] font-medium text-right cursor-pointer"><b className="text-xl">+</b> Ajouter un nouveau motif</DialogTrigger>
                                            </div>
                                            <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Rechercher un motif..." className="h-9" />
                                                <CommandList>
                                                <CommandEmpty>Motif non trouvé.</CommandEmpty>
                                                <CommandGroup>
                                                    {motifs.map((motif) => (
                                                    <CommandItem
                                                        key={motif.id}
                                                        value={motif.nomMotif}
                                                        onSelect={() => {
                                                        setValue(motif.nomMotif)
                                                        setOpen(false)
                                                        }}
                                                    >
                                                        {motif.nomMotif}
                                                        <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            value === motif.nomMotif ? "opacity-100" : "opacity-0"
                                                        )}
                                                        />
                                                    </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                                </CommandList>
                                            </Command>
                                            </PopoverContent>
                                        </div>
                                    </Popover>
                                </Card>
                            </div>
                            <div className="flex flex-col gap-4 w-full p-4 shadow-sm border rounded-xl bg-[#f7f9fa]">
                                <Tabs defaultValue="soins" className="w-full flex-col  gap-6">
                                    <div className="flex items-center justify-center px-4 lg:px-6 ">
                                        <Label htmlFor="view-selector" className="sr-only">
                                            View
                                        </Label>
                                        <Select defaultValue="soins">
                                        <SelectTrigger
                                            className="flex w-fit @4xl/main:hidden"
                                            size="sm"
                                            id="view-selector"
                                        >
                                            <SelectValue placeholder="Select a view" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="soins">Soins</SelectItem>
                                            <SelectItem value="motifs">Devis</SelectItem>
                                        </SelectContent>
                                        </Select>
                                        <TabsList className="bg-[#f7f9fa] border **:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
                                            <TabsTrigger className="px-8" value="soins">Enregistrer les soins</TabsTrigger>
                                            <TabsTrigger className="px-8" value="devis">Effectuer un devis</TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent value="soins" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                                        <Soins/>
                                        <div className="flex justify-between items-center">
                                            <DialogTrigger onClick={() => { setActive("second"); setOpen(true); }} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 text-sm py-1 px-2 rounded-md text-white font-medium text-right cursor-pointer">
                                                Enregistrer un nouveau soin
                                            </DialogTrigger>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="devis"className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                                        <Devis/>
                                    </TabsContent>
                                </Tabs>
                                
                            </div>
                            <div className="flex flex-col gap-4 w-full p-4 shadow-sm border rounded-xl bg-[#f7f9fa]">
                                <AddedPrescriptions/>
                            </div>
                        </div>
                        <Button className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer" type="button" onClick={verifierConsultation}>
                            Enregistrer la consultation
                        </Button>
                    </form>
                {active === "first" && (
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="font-medium text-[#0caccc]">
                    <DialogTitle className="text-xl text-center">Ajouter un nouveau motif</DialogTitle>
                    </DialogHeader>
                    <Formik initialValues={motifInitialValues} validationSchema={motifSchema} onSubmit={handleSubmitMotif}>
                    {(formik) => (
                    <Form className="flex flex-col gap-6 w-[80%] mx-auto">
                        <InputForm label="Motif" name="nomMotif" type="text" placeholder="Entrez le nouveau motif"/>
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
                    <DialogTitle className="text-xl text-center">Ajouter un nouveau soin</DialogTitle>
                    </DialogHeader>
                    <Formik initialValues={soinInitialValues} validationSchema={soinSchema} onSubmit={handleSubmitSoin}>
                    {(formik) => (
                    <Form className="flex flex-col gap-6 w-[80%] mx-auto">
                        <InputForm label="Soin" name="nom" type="text" placeholder="Entrez le nom du soin"/>
                        <InputForm label="Codification" name="codification" type="text" placeholder="Entrez la codification"/>
                        <InputForm label="Tarif" name="tarif" type="number" placeholder="Entrez le tarif"/>
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
                <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                    {activeAlert === "first" && (
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Confirmation de l'enregistrement</AlertDialogTitle>
                            <AlertDialogDescription>
                                Vous avez vérifier que tout est correct et 
                                vous confirmez l'enregistrement de cette consultation?
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel >Annuler</AlertDialogCancel>
                            <AlertDialogAction className="bg-green-500" onClick={handleSubmitConsultation} >Confirmer</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    )}
                    {activeAlert === "second" && (
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Quitter la consultation</AlertDialogTitle>
                            <AlertDialogDescription>
                                Les informations entrées ne seront pas enregistrées,
                                vous voulez vraiment quitter cette consultation?
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel >Annuler</AlertDialogCancel>
                            <AlertDialogAction className="bg-green-500" onClick={() => navigate(`${baseRoute}/detailspatient/${patientId}`)} >Quitter</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    )}
                </AlertDialog>
            </Dialog>
        </section>
    )
}

export default AddConsultation;
