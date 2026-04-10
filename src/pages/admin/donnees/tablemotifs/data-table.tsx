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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import InputForm from "@/components/myComponents/input"
import { Form, Formik, type FormikHelpers } from "formik"
import type { MotifDto } from "@/types/consultationdatas"
import { toast } from "react-toastify"
import * as yup from "yup"
import useAppDispatch from "@/hooks/useAppDispatch"
import { createMotif } from "@/store/motifs/actions"

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

  const motifInitialValues : MotifDto = {
      nomMotif: "",
  };

  const motifSchema = yup.object().shape({
    nomMotif: yup
      .string()
      .trim()
      .min(2, "trop court")
      .max(50, "le motif ne doit pas dépasser 50 caractères")
      .required("Motif requis"),
  });

  const handleSubmitMotif = async (
    values: MotifDto,
    formikHelpers: FormikHelpers<MotifDto>
    ) => {
    formikHelpers.setSubmitting(true);
    const response = await dispatch(createMotif(values));
    console.log("error?");    

    if (response.meta.requestStatus === "fulfilled") {
        toast.success("Nouveau motif ajouté avec succès.");
        formikHelpers.resetForm();
    }

    if (response.meta.requestStatus === "rejected") {
        toast.error("Echec d'ajout du nouveau motif.");
    }

    formikHelpers.setSubmitting(false);
  };

  return (
    <section className="relative">
      <Dialog>
        <Card className="bg-[#f7f9fa]">
          <CardHeader>
            <CardTitle>Liste des motifs de consultation du cabinet</CardTitle>
            <CardDescription>
              <Input
                placeholder="Rechercher un motif..."
                value={(table.getColumn("nomMotif")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                table.getColumn("nomMotif")?.setFilterValue(event.target.value)
                }
                className="max-w-sm bg-white"
              />
            </CardDescription>
            <CardAction>
              <DialogTrigger 
                className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-md">
                Ajouter un Motif
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
                            Aucun motif enregistré.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between items-center w-full gap-4 px-2">
              <div className="flex gap-2 text-sm">
                <p className="font-medium">Nombre total de motifs:</p>
                <b>{data.length}</b>
              </div>
              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">lignes par page</p>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                      table.setPageSize(Number(value))
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {table.getState().pagination.pageIndex + 1} sur{" "}
                  {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hidden size-8 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hidden size-8 lg:flex"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight />
                  </Button>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="font-medium text-[#0caccc]">
          <DialogTitle className="text-xl text-center">Ajouter un nouveau motif</DialogTitle>
          </DialogHeader>
          <Formik initialValues={motifInitialValues} validationSchema={motifSchema} onSubmit={handleSubmitMotif}>
          {(formik) => (
          <Form className="flex flex-col gap-6 w-[80%] mx-auto">
            <InputForm label="Motif" name="nomMotif" type="text" placeholder="Entrez le nouveau motif"/>
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