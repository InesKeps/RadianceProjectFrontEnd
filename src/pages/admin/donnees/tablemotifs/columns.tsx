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
import type { Motif } from "@/types/consultationdatas"
import { useEffect, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, Formik, type FormikHelpers } from "formik"
import Input from "@/components/myComponents/input"
import * as yup from "yup"
import { toast } from "react-toastify"
import useAppSelector from "@/hooks/useAppSelector"
import type { RootState } from "@/store/store"
import { updateMotif } from "@/store/motifs/actions"

export const columns: ColumnDef<Motif>[] = [
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
    accessorKey: "nomMotif",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Motifs de consultation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const motif = row.original
      const dispatch = useAppDispatch();
      const motifs = useAppSelector((state: RootState) => state.motif.items);
      const [motifId, setMotifId] = useState<number | null>(null);
      const [formUpdateMotif, setFormUpdateMotif] = useState({id: 0, nomMotif: ''});

      const motifSchema = yup.object().shape({
        nomMotif: yup
          .string()
          .trim()
          .min(2, "trop court")
          .max(50, "le motif ne doit pas dépasser 50 caractères")
          .required("Motif requis"),
      });

      useEffect(() => {
        if (motifId !== 0) {
          const motif = motifs.find(m => m.id === motifId);
          if (motif) setFormUpdateMotif({
            id: motif!.id, 
            nomMotif: motif!.nomMotif, 
          });
        }
      }, [motifId]);

      const formUpdateMotifInitialValues: Motif = formUpdateMotif!;

      const handleUpdateMotif = async (values: Motif,formikHelpers: FormikHelpers<Motif>)=>{
        console.log(values);
        
        formikHelpers.setSubmitting(true);
        const response = await dispatch(updateMotif(values));

        if (response.meta.requestStatus === "fulfilled") {
        toast.success("Motif modifié avec succès.");
        }

        if (response.meta.requestStatus === "rejected") {
        toast.error("Echec de modification du motif.");
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
                  <DialogTrigger onClick={()=>{setMotifId(motif.id);}}>Modifier</DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="font-medium text-[#0caccc]">
              <DialogTitle className="text-xl text-center">Modifier le motif</DialogTitle>
              </DialogHeader>
              <Formik initialValues={formUpdateMotifInitialValues} validationSchema={motifSchema} onSubmit={handleUpdateMotif}>
              {(formik) => (
              <Form className="flex flex-col gap-6 w-[80%] mx-auto">
                <Input label="Motif" name="nomMotif" type="text" placeholder="Entrez le nouveau motif"/>
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