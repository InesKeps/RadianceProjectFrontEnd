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
import type { Soin } from "@/types/consultationdatas"
import { useEffect, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, Formik, type FormikHelpers } from "formik"
import Input from "@/components/myComponents/input"
import * as yup from "yup"
import { toast } from "react-toastify"
import { updateSoin } from "@/store/soins/actions"
import useAppSelector from "@/hooks/useAppSelector"
import type { RootState } from "@/store/store"

export const columns: ColumnDef<Soin>[] = [
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
    accessorKey: "codification",
    header: "Codification",
  },
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Soin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "tarif",
    header: "Tarif du soin",
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const soin = row.original
      const dispatch = useAppDispatch();
      const soins = useAppSelector((state: RootState) => state.soin.items);
      const [soinId, setSoinId] = useState<number | null>(null);
      const [formUpdateSoin, setFormUpdateSoin] = useState({id: 0, codification: '', nom: '', tarif: 0});

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

      useEffect(() => {
        if (soinId !== 0) {
          const soin = soins.find(s => s.id === soinId);
          if (soin) setFormUpdateSoin({
            id: soin!.id, 
            codification: soin!.codification, 
            nom: soin!.nom, 
            tarif: soin!.tarif
          });
        }
      }, [soinId]);

      const formUpdateSoinInitialValues: Soin = formUpdateSoin!;

      const handleUpdateSoin = async (values: Soin,formikHelpers: FormikHelpers<Soin>)=>{
        console.log(values);
        
        formikHelpers.setSubmitting(true);
        const response = await dispatch(updateSoin(values));

        if (response.meta.requestStatus === "fulfilled") {
        toast.success("Soin modifié avec succès.");
        }

        if (response.meta.requestStatus === "rejected") {
        toast.error("Echec de modification du soin.");
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
                  <DialogTrigger onClick={()=>{setSoinId(soin.id);}}>Modifier</DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="font-medium text-[#0caccc]">
              <DialogTitle className="text-xl text-center">Modifier le soin</DialogTitle>
              </DialogHeader>
              <Formik initialValues={formUpdateSoinInitialValues} validationSchema={soinSchema} onSubmit={handleUpdateSoin}>
              {(formik) => (
              <Form className="flex flex-col gap-6 w-[80%] mx-auto">
                  <Input label="Soin" name="nom" type="text" placeholder="Entrez le nom du soin"/>
                  <Input label="Codification" name="codification" type="text" placeholder="Entrez la codification"/>
                  <Input label="Tarif" name="tarif" type="number" placeholder="Entrez le tarif"/>
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