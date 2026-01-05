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
import { deleteUser } from "@/store/users/actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router"
import type { User } from "@/types/user"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Nº",
  },
  {
    accessorKey: "dateTime",
    header: "Date et Heure",
  },
  {
    accessorKey: "nomPatient",
    header: "Nom du patient",
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
      const user = row.original
      const dispatch = useAppDispatch();
      const navigate = useNavigate();

      return (
        <div>
          <AlertDialog>
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
                <DropdownMenuItem onClick={() => navigate(`/admin/updateuser-form/${user.id}`)}>Modifier</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <AlertDialogTrigger className="text-red-500">Supprimer</AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Attention</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Ce patient et toutes les informations 
                  le concernant seront supprimés définitivement de votre base de données. 
                  C'est bien ce que vous voulez?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction className="bg-red-300">Oui, Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
]