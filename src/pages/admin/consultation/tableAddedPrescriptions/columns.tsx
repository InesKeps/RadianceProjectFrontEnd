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
import { removePrescription, type AddedPrescription } from "@/store/prescriptions/addedPrescriptionSlice"

export const columns: ColumnDef<AddedPrescription>[] = [
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
              <DropdownMenuItem onClick={() => dispatch(removePrescription({ nomMedicament: prescription.nomMedicament }))} className="text-red-500">
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]