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
import useAppDispatch from "@/hooks/useAppDispatch"
import { deleteConsultation, getPatientConsultations } from "@/store/consultations/actions"
import { toast } from "react-toastify"
import useAppSelector from "@/hooks/useAppSelector"
import type { RootState } from "@/store/store"
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
import { useState } from "react"
import useAuth from "@/hooks/useAuth"

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
      const dispatch = useAppDispatch();
      const [soinId, setSoinId] = useState<number>(0);
      const patientDetails = useAppSelector((state: RootState) => state.patient.selectedPatient);
      const auth = useAuth();
      const role = auth?.userInfo?.userToLogin?.role;

      const handleDeleteConsultation = async () => {

        const response = await dispatch(deleteConsultation(soinId));
          
          if (response.meta.requestStatus === "fulfilled") {
            toast.success("Consultation supprimée avec succès.");
            dispatch(getPatientConsultations(patientDetails!.id));
          }
      
          if (response.meta.requestStatus === "rejected") {
            toast.error("Echec de suppression de la consultation.");
          }
        }

      return (
        <AlertDialog>
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
              <DropdownMenuSeparator/>
              {/* Affiche Supprimer seulement si role = MEDECIN */}
              {role === "MEDECIN" && (
                <DropdownMenuItem>
                  <AlertDialogTrigger
                    className="text-red-500"
                    onClick={() => {
                      setSoinId(consultation.id);
                    }}
                  >
                    Supprimer
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Attention</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Cette consultation et toutes les informations 
              la concernant seront supprimés définitivement de votre base de données. 
              C'est bien ce que vous voulez?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={()=>{handleDeleteConsultation()}} className="bg-red-300">Oui, Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      )
    },
  },
]
