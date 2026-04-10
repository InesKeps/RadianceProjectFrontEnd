"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
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
import type { Dent } from "@/types/consultationdatas"
import { useEffect, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, Formik, type FormikHelpers } from "formik"
import Input from "@/components/myComponents/input"
import * as yup from "yup"
import { toast } from "react-toastify"
import useAppSelector from "@/hooks/useAppSelector"
import type { RootState } from "@/store/store"
import { updateDent } from "@/store/dents/actions"

export const columns: ColumnDef<Dent>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nº
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "numero",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Numéro de la dent
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom de la dent
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const dent = row.original
      const dispatch = useAppDispatch();
      const dents = useAppSelector((state: RootState) => state.dent.items);
      const [dentId, setDentId] = useState<number | null>(null);
      const [formUpdateDent, setFormUpdateDent] = useState({id: 0, numero: 0, nom: ''});

      const dentSchema = yup.object().shape({
        nom: yup
          .string()
          .trim()
          .min(2, "trop court")
          .max(50, "le nom ne doit pas dépasser 50 caractères")
          .required("Motif requis"),
        numero: yup
            .number()
            .required("Numéro requis")
      });

      useEffect(() => {
        if (dentId !== 0) {
          const dent = dents.find(d => d.id === dentId);
          if (dent) setFormUpdateDent({
            id: dent!.id, 
            numero: dent!.numero,
            nom: dent!.nom, 
          });
        }
      }, [dentId]);

      const formUpdateDentInitialValues: Dent = formUpdateDent!;

      const handleUpdateDent = async (values: Dent,formikHelpers: FormikHelpers<Dent>)=>{
        console.log(values);
        
        formikHelpers.setSubmitting(true);
        const response = await dispatch(updateDent(values));

        if (response.meta.requestStatus === "fulfilled") {
        toast.success("Dent modifiée avec succès.");
        }

        if (response.meta.requestStatus === "rejected") {
        toast.error("Echec de modification de la dent.");
        }
      };

      return (
        <div>
          <Dialog>
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
                <DropdownMenuItem>
                  <DialogTrigger onClick={()=>{setDentId(dent.id);}}>Modifier</DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="font-medium text-[#0caccc]">
              <DialogTitle className="text-xl text-center">Modifier la dent</DialogTitle>
              </DialogHeader>
              <Formik initialValues={formUpdateDentInitialValues} validationSchema={dentSchema} onSubmit={handleUpdateDent}>
              {(formik) => (
              <Form className="flex flex-col gap-6 w-[80%] mx-auto">
                <Input label="Numéro de la dent" name="numero" type="text" placeholder="Entrez le numéro de la dent"/>
                <Input label="Nom de la dent" name="nom" type="text" placeholder="Entrez le nom de la dent"/>
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
        </div>
      )
    },
  },
]