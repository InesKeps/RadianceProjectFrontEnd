import useAppSelector from "@/hooks/useAppSelector";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
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
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import Input from "@/components/myComponents/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns} from "./columns";

const Consultation = () => {
    const dispatch = useAppDispatch();
    const patientDetails = useAppSelector((state: RootState) => state.patient.selectedPatient);


      const data = useAppSelector((state: RootState) => state.user.items);


  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <AlertDialog>
            <Dialog>  
                <DataTable columns={columns} data={data}/>
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
                <AlertDialogAction className="bg-red-300">Oui, Supprimer</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </section>
  );
};

export default Consultation;
