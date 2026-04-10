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
import type { SoinsConsultation } from "@/types/consultationdatas";
import { deleteSoinConsultation } from "@/store/soinsconsultations/actions"
import { toast } from "react-toastify"

export const columns: ColumnDef<SoinsConsultation>[] = [
  {
    accessorKey: "codification",
    header: "Codification",
  },
  {
    accessorKey: "nomSoin",
    header: "Soin",
  },
  {
    accessorKey: "tarif",
    header: "Tarif du soin",
  },
  {
    accessorKey: "numero",
    header: "Numero de la dent",
  },
  {
    accessorKey: "nomDent",
    header: "Nom de la dent",
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const soin = row.original
      const dispatch = useAppDispatch();

      const handleDeleteSoin = async (id:number) =>{
        const response = await dispatch(deleteSoinConsultation(id));
        
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Soin supprimé avec succès.");
        }
    
        if (response.meta.requestStatus === "rejected") {
          toast.error("Echec de suppression du soin.");
        }
      }

      return (
        <div>
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
              <DropdownMenuItem onClick={()=>{handleDeleteSoin(soin.id)}} className="text-red-500">
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]