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
import { removeSoin } from "@/store/devis/creerdevisSlice";
import type { SoinDevis } from "@/store/devis/creerdevisSlice"

export const columns: ColumnDef<SoinDevis>[] = [
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
              <DropdownMenuItem onClick={() => dispatch(removeSoin({ idSoin: soin.idSoin, idDent: soin.idDent }))} className="text-red-500">
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]