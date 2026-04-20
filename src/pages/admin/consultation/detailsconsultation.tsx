import { FaChevronCircleLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import {
  Card,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getDetailsConsultation } from "@/store/consultations/actions";
import SoinsConsultation from "@/pages/admin/consultation/tablesoinsconsultation/soinsconsultation";
import Prescriptions from "./tablePrescriptions/prescriptions";
import DevisSoins from "./tablesoinsdevis/devisSoins";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { createMotifConsultation, deleteMotifConsultation} from "@/store/motifsconsultations/actions";
import useRoutePrefix from "@/hooks/useRoutePrefix"

const DetailsConsultation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const baseRoute = useRoutePrefix();
    const dispatch = useAppDispatch();
    const selectedConsultation = useAppSelector((state: RootState) => state.consultation.ConsultationDetails);
    const [selectedMotifs, setSelectedMotifs] = useState<{ id: number; nomMotif: string }[]>([]);
    const motifs = useAppSelector((state: RootState) => state.motif.items);
    const [open, setOpen] = useState(false);
    const [motifError, setMotifError] = useState("");
    const [value, setValue] = useState("");
    const [motifId, setMotifId] = useState(0);

    useEffect(() => {
        if (id) {
            dispatch(getDetailsConsultation(Number(id)));
        }
    }, [dispatch, id]);

    let dateHeureFormat;

    if (selectedConsultation?.dateHeure) {
        dateHeureFormat = format(new Date(selectedConsultation.dateHeure), "dd/MM/yyyy hh:mm", { locale: fr });
    }

    const handleSubmitMotif = async() => {
        if(selectedConsultation?.id && selectedMotifs.length > 0){
            for (let i = 0; i < selectedMotifs.length; i++) {
                const response = await dispatch(createMotifConsultation({
                    consultationId: Number(id),
                    motifId: selectedMotifs[i].id,
                }));
                if (response.meta.requestStatus === "fulfilled") {
                    toast.success("Motif(s) ajouté(s) avec succès.");
                    dispatch(getDetailsConsultation(Number(id)));
                }
                if (response.meta.requestStatus === "rejected") {
                    toast.error("Echec d'enregistrement des motifs");
                }
            }
        }else{
            setMotifError("Sélectionnew un motif");
        }
    }

    const handleDeleteMotifConsultation = async() =>{
        const response = await dispatch(deleteMotifConsultation({
            consultationId: Number(id),
            motifId: motifId,
        }));
        
        if (response.meta.requestStatus === "fulfilled") {
            toast.success("Motif supprimé de la consultation.");
            dispatch(getDetailsConsultation(Number(id)));
        }
    
        if (response.meta.requestStatus === "rejected") {
            toast.error("Echec de suppression du motif.");
        }
    }

  return (
    <section className="flex flex-col gap-4 p-4 w-full h-full relative">
        <Dialog>
            <AlertDialog>
                <button
                    type="button"
                    onClick={() => navigate(`${baseRoute}/detailspatient/${selectedConsultation?.patient.id}`)}
                    className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer"
                >
                    <FaChevronCircleLeft />
                </button>
                <h1 className="font-bold text-center text-xl">Détails de la consultation</h1>
                <section className="flex flex-col w-full h-full gap-4 px-8 text-sm">
                    <div className="grid grid-cols-3 gap-8">
                        <Card className="flex flex-col gap-3 shadow-md bg-[#f7f9fa] p-4">
                            <p><b>Date et Heure: </b> {dateHeureFormat}</p>
                            <span className="flex justify-between items-center">
                                <h1 className="font-medium text-[#0caccc]">Motifs de consultation</h1>
                                <DialogTrigger><IoMdAdd className="text-[#0caccc] hover:text-[#0caccc]/80 cursor-pointer text-lg"/></DialogTrigger>
                            </span>
                            {selectedConsultation?.motifs?.length === 0 ? (
                                <p className="text-sm text-gray-500 py-2">Aucun motif.</p>
                            ) : (
                                <ul>
                                {selectedConsultation?.motifs?.map((Motif) => (
                                    <li
                                    key={Motif.Motif.id}
                                    className="flex justify-between text-sm font-medium items-center gap-2"
                                    >
                                    <p>{Motif.Motif.nomMotif}</p><AlertDialogTrigger onClick={()=>setMotifId(Motif.Motif.id)}><MdOutlineDeleteOutline className="text-red-500 text-lg hover:text-red-300 cursor-pointer" /></AlertDialogTrigger>
                                    </li>
                                ))}
                                </ul>
                            )}
                        </Card>
                        <Card className="flex flex-col gap-2 shadow-md bg-[#f7f9fa] p-4">
                            <h1 className="font-medium text-[#0caccc]">Patient concerné</h1>
                            <p><b>Nom: </b> {selectedConsultation?.patient.nom}</p>
                            <p><b>Prénom: </b> {selectedConsultation?.patient.prenom}</p>
                            <p><b>Contact: </b> {selectedConsultation?.patient.tel}</p>
                        </Card>
                        <Card className="flex flex-col gap-2 shadow-md bg-[#f7f9fa] p-4">
                            <h1 className="font-medium text-[#0caccc]">Responsable de la consultation</h1>
                            <p><b>Nom: </b> {selectedConsultation?.user?.nom}</p>
                            <p><b>Contact: </b> {selectedConsultation?.user?.tel}</p>
                        </Card>
                    </div>
                    <div className="flex flex-col gap-4 overflow-y-auto">
                        <SoinsConsultation/>
                        <Prescriptions id={Number(id)}/>
                        <DevisSoins/>
                    </div>
                    <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader className="font-medium text-[#0caccc] pb-4">
                        <DialogTitle className="text-xl text-center">Ajouter des motifs</DialogTitle>
                    </DialogHeader>
                    <form className="flex flex-col gap-6 w-[80%] mx-auto">  
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
                        <DialogFooter className="flex gap-4 items-center justify-center py-4">
                            <DialogClose asChild className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                            <Button variant="outline">Annuler</Button>
                            </DialogClose>
                            <DialogClose onClick={handleSubmitMotif} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 hover:text-black cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                Enregistrer
                            </DialogClose>
                        </DialogFooter>
                    </form>
                    </DialogContent>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Attention</AlertDialogTitle>
                    <AlertDialogDescription>
                        Vous voulez vraiment supprimer ce motif?
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteMotifConsultation} className="bg-red-300">Oui, Supprimer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </section>
            </AlertDialog>
        </Dialog>
    </section>
  );
};

export default DetailsConsultation;
