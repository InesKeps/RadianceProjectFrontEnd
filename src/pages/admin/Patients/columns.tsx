"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router";
import type { Patient } from "@/types/patient";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          id
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
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "prenom",
    header: "Prénom",
  },
  {
    accessorKey: "adresse",
    header: "Adresse",
  },
  {
    accessorKey: "dateNaissance",
    header: "Date de naissance",
    cell: ({ row }) => {
      const rawDate = row.getValue("dateNaissance") as string;
      return rawDate
        ? format(new Date(rawDate), "dd/MM/yyyy", { locale: fr })
        : "";
    },
  },
  {
    accessorKey: "genre",
    header: "Sexe",
  },
  {
    accessorKey: "nationalite",
    header: "Nationalité",
  },
  {
    accessorKey: "tel",
    header: "Téléphone",
  },
  {
    accessorKey: "profession",
    header: "Profession",
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original
      const navigate = useNavigate();

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
                <DropdownMenuItem onClick={() => navigate(`/admin/detailspatient/${patient.id}`)}>Voir détails</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
]