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
import { useNavigate } from "react-router"
import useRoutePrefix from "@/hooks/useRoutePrefix"
import type { ConsultationDetails } from "@/types/consultationdatas"

export const columns: ColumnDef<ConsultationDetails>[] = [
  {
    accessorKey: "id",
    header: "Nº",
  },
  {
    accessorKey: "dateHeure",
    header: "Date et Heure",
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
