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
import useAppDispatch from "../../../hooks/useAppDispatch";
import { deleteUser } from "../../../store/users/actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
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
import { logoutAction } from "@/store/auth/actions"

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "tel",
    header: "Téléphone",
  },
  {
    accessorKey: "adresse",
    header: "Adresse",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "sexe",
    header: "Sexe",
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      const dispatch = useAppDispatch();
      const navigate = useNavigate();
 
      const handleDelete = async ()=>{
        const response = await dispatch(logoutAction());

        if (response.meta.requestStatus === "fulfilled") {
        toast.success("Déconnexion reussie.");
        }

        if (response.meta.requestStatus === "rejected") {
        toast.error("Echec de suppression du membre.");
        }
      };

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
                  {/* <AlertDialogTrigger className="text-red-500">Supprimer</AlertDialogTrigger> */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Attention</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Cet utilisateur et toutes les informations 
                  le concernant seront supprimés définitivement de votre base de données. 
                  C'est bien ce que vous voulez?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={()=>handleDelete()} className="bg-red-300">Oui, Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )
    },
  },
]
