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
import useAppSelector from "@/hooks/useAppSelector"
import type { RootState } from "@/store/store"
import { useNavigate } from "react-router-dom"
import useRoutePrefix from "@/hooks/useRoutePrefix"
import type { ConsultationDetails } from "@/types/consultationdatas"

export const columns: ColumnDef<ConsultationDetails>[] = [
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
    accessorKey: "dateHeure",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date et Heure
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "nomPatient",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom du patient
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "motif",
    header: "Motif de consultation",
  },
  {
    accessorKey: "nomResponsable",
    header: "Responsable de la consultation",
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const consultation = row.original
      const navigate = useNavigate();
      const baseRoute = useRoutePrefix();
      const consultations = useAppSelector((state: RootState) => state.consultation.items);
      
      const voirPatient = ( id: number) =>{
        const consultation = consultations?.find(c => c.id === id);
        navigate(`${baseRoute}/detailspatient/${consultation!.patient!.id}`);
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
              <DropdownMenuItem onClick={()=>{navigate(`${baseRoute}/detailsconsultation/${consultation.id}`)}}>Voir détails consultation</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=> voirPatient(consultation.id)}>Voir détails patient</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
