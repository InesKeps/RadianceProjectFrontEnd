"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAppDispatch from "@/hooks/useAppDispatch";
import type { PrescriptionDtoUpdate } from "@/types/consultationdatas"
import { deletePrescription, updatePrescription } from "@/store/prescriptions/actions"
import { toast } from "react-toastify"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, Formik, type FormikHelpers } from "formik"
import * as yup from "yup";
import Input from "@/components/myComponents/input"
import { useEffect, useState } from "react"
import useAppSelector from "@/hooks/useAppSelector"
import type { RootState } from "@/store/store"

export const columns: ColumnDef<PrescriptionDtoUpdate>[] = [
  {
    accessorKey: "id",
    header: "Nº",
  },
  {
    accessorKey: "nomMedicament",
    header: "Médicament",
  },
  {
    accessorKey: "grammage",
    header: "Grammage",
  },
  {
    accessorKey: "forme",
    header: "Forme",
  },
  {
    accessorKey: "posologie",
    header: "Posologie",
  },
  {
    accessorKey: "duree",
    header: "Durée",
  },
  {
    accessorKey: "quantite",
    header: "Quantité",
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const prescription = row.original
      const dispatch = useAppDispatch();
      const Prescriptions = useAppSelector((state: RootState) => state.prescription.items);
      const [open, setOpen] = useState(false);
      const [prescriptionId, setPrescriptionId] = useState(0);
      const [formUpdate, setFormUpdate] = useState({
        id: 0,
        nomMedicament: '', 
        grammage: '', 
        forme: '', 
        posologie: "", 
        duree: "",
        quantite: "",
      });

      useEffect(() => {
          if (prescriptionId !== 0) {
            const prescription = Prescriptions?.find(p => p.id === prescriptionId);
            if (prescription) setFormUpdate({
              id: prescription.id,
              nomMedicament: prescription.nomMedicament, 
              grammage: prescription.grammage, 
              forme: prescription.forme, 
              posologie: prescription.posologie, 
              duree: prescription.duree,
              quantite: prescription.quantite,
            });
          }
        }, [prescriptionId]);

      const prescriptionInitialValues : PrescriptionDtoUpdate = formUpdate;

      const prescriptionSchema = yup.object().shape({
        nomMedicament: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "Le nom ne doit pas dépasser 50 caractères")
            .required("Nom requis"),
        grammage: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "Le grammage ne doit pas dépasser 50 caractères")
            .required("Grammage requis"),
        forme: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "La formee ne doit pas dépasser 50 caractères")
            .required("Forme requise"),
        posologie: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "La formee ne doit pas dépasser 50 caractères")
            .required("Posologie requise"),
        duree: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "La formee ne doit pas dépasser 50 caractères")
            .required("Durée requise"),
        quantite: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "La formee ne doit pas dépasser 50 caractères")
            .required("Quantité requise"),
      }).optional();

      const handleUpdatePrescription = async (values: PrescriptionDtoUpdate,formikHelpers: FormikHelpers<PrescriptionDtoUpdate>)=>{
        formikHelpers.setSubmitting(true);
        const response = await dispatch(updatePrescription(values));
    
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Prescription modifiée avec succès.");
        }
    
        if (response.meta.requestStatus === "rejected") {
          toast.error("Echec de modification de la prescription.");
        }
      };

      const handleDeletePrescription = async (id:number)=>{

        const response = await dispatch(deletePrescription(id));
    
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Prescription supprimée avec succès.");
        }
    
        if (response.meta.requestStatus === "rejected") {
          toast.error("Echec de suppression de la prescription.");
        }
      };

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {setPrescriptionId(prescription.id); setOpen(true)}}>
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {handleDeletePrescription(prescription.id)}} className="text-red-500">
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader className="font-medium text-[#0caccc]">
            <DialogTitle className="text-xl text-center">Modifier une prescription</DialogTitle>
            </DialogHeader>
            <Formik initialValues={prescriptionInitialValues} validationSchema={prescriptionSchema} onSubmit={handleUpdatePrescription}>
            {(formik) => (
            <Form className="flex flex-col gap-6 w-[80%] mx-auto">
                <div className="flex gap-8 w-full">
                  <div className="flex flex-col gap-4 w-1/2">
                    <Input label="Médicament" name="nomMedicament" type="text" placeholder="Entrez le nom du médicament"/>
                    <Input label="Grammage" name="grammage" type="text" placeholder="Entrez le grammage" />
                    <Input label="Forme" name="forme" type="text" placeholder="Entrez la forme"/>
                  </div>
                  <div className="flex flex-col gap-4 w-1/2">
                    <Input label="Posologie" name="posologie" type="text" placeholder="Entrez la posologie"/>
                    <Input label="Durée" name="duree" type="text" placeholder="Entrez la durée"/>
                    <Input label="Quantité" name="quantite" type="text" placeholder="Entrez la quantité"/>
                  </div>
                </div>
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
        </Dialog>
      )
    },
  },
]