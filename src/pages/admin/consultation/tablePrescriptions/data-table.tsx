"use client"
import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type SortingState,
  type ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import useAppSelector from "@/hooks/useAppSelector"
import type { RootState } from "@/store/store"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useAppDispatch from "@/hooks/useAppDispatch";
import { Form, Formik, type FormikHelpers } from "formik";
import * as yup from "yup";
import Input from "@/components/myComponents/input";
import { createPrescription } from "@/store/prescriptions/actions";
import type { PrescriptionDto } from "@/types/consultationdatas";
import { toast } from "react-toastify";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  })

  const dispatch = useAppDispatch();
  // const [consultationId, setConsultationId] = useState(0);
  const selectedConsultation = useAppSelector((state: RootState) => state.consultation.ConsultationDetails);

  // if(selectedConsultation?.id){
  //    setConsultationId(selectedConsultation.id)
  // }

  const prescriptionInitialValues : PrescriptionDto = {
    nomMedicament: '', 
    grammage: '', 
    forme: '', 
    posologie: "", 
    duree: "",
    quantite: "",
    consultationId: selectedConsultation?.id || 0,
  };

  const prescriptionSchema = yup.object().shape({
      nomMedicament: yup
          .string()
          .trim()
          .min(2, "trop court")
          .max(50, "Le nom ne doit pas dépasser 50 caractères")
          .required("Nom requis"),
      grammage: yup
          .string()
          .trim()
          .min(2, "trop court")
          .max(50, "Le grammage ne doit pas dépasser 50 caractères")
          .required("Grammage requis"),
      forme: yup
          .string()
          .trim()
          .min(2, "trop court")
          .max(50, "La formee ne doit pas dépasser 50 caractères")
          .required("Forme requise"),
      posologie: yup
          .string()
          .trim()
          .min(2, "trop court")
          .max(50, "La formee ne doit pas dépasser 50 caractères")
          .required("Posologie requise"),
      duree: yup
          .string()
          .trim()
          .min(2, "trop court")
          .max(50, "La formee ne doit pas dépasser 50 caractères")
          .required("Durée requise"),
      quantite: yup
          .string()
          .trim()
          .min(2, "trop court")
          .max(50, "La formee ne doit pas dépasser 50 caractères")
          .required("Quantité requise"),
  }).optional();

  const handleSubmitPrescription = async (
        values: PrescriptionDto,
        formikHelpers: FormikHelpers<PrescriptionDto>
        ) => {
        formikHelpers.setSubmitting(true);
        const response = await dispatch(createPrescription(values));
  
        if (response.meta.requestStatus === "fulfilled") {
            toast.success("Prescription ajoutée avec succès.");
            formikHelpers.resetForm();
        }
  
        if (response.meta.requestStatus === "rejected") {
            toast.error("Echec d'ajout de la prescription.");
        }
  
        formikHelpers.setSubmitting(false);
    };

  return (
    <section className="relative">
      <Dialog>
        <Card className="bg-[#f7f9fa]">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Prescriptions</CardTitle>
            <CardAction>
              <DialogTrigger className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-md">
                  Ajouter une prescription
              </DialogTrigger>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden bg-white rounded-md border">
                <Table>
                    <TableHeader className="bg-[#f7f9fa]">
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            )
                            })}
                        </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            </TableRow>
                        ))
                        ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                            Aucune prescription.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between px-2">
                <div className="flex gap-2 text-sm">
                  <p className="font-medium">Nombre total de prescriptions:</p>
                  <b>{data.length}</b>
                </div>
            </div>
          </CardFooter>
        </Card>
        {/* Dialog + form pour ajouter une prescription */}
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader className="font-medium text-[#0caccc]">
          <DialogTitle className="text-xl text-center">Ajouter une prescription</DialogTitle>
          </DialogHeader>
          <Formik initialValues={prescriptionInitialValues} validationSchema={prescriptionSchema} onSubmit={handleSubmitPrescription}>
          {(formik) => (
          <Form className="flex flex-col gap-6 w-[80%] mx-auto">
              <div className="flex gap-8 w-full">
                <div className="flex flex-col gap-4 w-1/2">
                  <Input label="Médicament" name="nomMedicament" type="text" placeholder="Entrez le nom du médicament"/>
                  <Input label="Grammage" name="grammage" type="text" placeholder="Entrez le grammage" />
                  <Input label="Forme" name="forme" type="text" placeholder="Entrez la forme"/>
                </div>
                <div className="flex flex-col gap-4 w-1/2">
                  <Input label="Posologie" name="posologie" type="text" placeholder="Entrez la posologie"/>
                  <Input label="Durée" name="duree" type="text" placeholder="Entrez la durée"/>
                  <Input label="Quantité" name="quantite" type="text" placeholder="Entrez la quantité"/>
                </div>
              </div>
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
  </section>
  )
}