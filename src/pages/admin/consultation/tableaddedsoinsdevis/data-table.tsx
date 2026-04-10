"use client"
import * as React from "react"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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
import { getAllSoins } from "@/store/soins/actions";
import { getAllDents } from "@/store/dents/actions";
import { addSoin } from "@/store/devis/creerdevisSlice";

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
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<"first" | "second" | null>(null);
  const [valuesoin, setValuesoin] = useState("");
  const [valuedent, setValuedent] = useState("");
  const [openD, setOpenD] = useState(false);
  const [formError, setFormError] = useState("");
  const soinsDevis = useAppSelector((state: RootState) => state.devisSoins.items);
  const soins = useAppSelector((state: RootState) => state.soin.items);
  const dents = useAppSelector((state: RootState) => state.dent.items);
  
  useEffect(() => {
      dispatch(getAllSoins());
      dispatch(getAllDents());
  }, [dispatch]);

  let errormessage = "";

  const handleSubmitSoin = () => {
    if (!valuesoin) {
        setFormError("Veuillez sélectionner un soin");
    }
    if (!valuedent) {
        setFormError("Veuillez sélectionner une dent");
    }
    const soin = soins.find(s => s.nom === valuesoin);
    const dent = dents.find(d => d.nom === valuedent);
    if (soin && dent && !soinsDevis.some(s => s.idSoin === soin.id && s.idDent === dent.id)) {
      dispatch(addSoin({ 
        idSoin: soin.id, 
        codification: soin.codification, 
        nomSoin: soin.nom, 
        tarif: soin.tarif,
        idDent: dent.id, 
        numero: dent.numero, 
        nomDent: dent.nom, 
      }));
      setOpenD(false);
    }else{
      errormessage = "Vous avez déja ajouté ce soin.";
      console.log(errormessage); 
    }
  };

  return (
    <section className="relative">
      <Dialog open={openD} onOpenChange={setOpenD}>
        <Card className="bg-white shadow-none">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Devis de soins</CardTitle>
            <CardAction>
              <DialogTrigger className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-md">
                  Ajouter un soin
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
                            Aucun soin ajouté.
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
                  <p className="font-medium">Nombre total de soins:</p>
                  <b>{data.length}</b>
                </div>
            </div>
            <div>
              <p className="text-red-500">{errormessage}</p>
            </div>
          </CardFooter>
        </Card>
          <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="font-medium text-[#0caccc] pb-4">
            <DialogTitle className="text-xl text-center">Ajouter un soin</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-6 w-[80%] mx-auto">  
              <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger onClick={() => { setActive("first"); setOpen(true); }} asChild>
                  <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                  >
                      {valuesoin
                      ? soins.find((soin) => soin.nom === valuesoin)?.nom
                      : "Sélectionner un soin..."}
                      <ChevronsUpDown className="opacity-50" />
                  </Button>
                  </PopoverTrigger>
                  {active === "first" && (
                    <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput placeholder="Rechercher un soin..." className="h-9" />
                        <CommandList className="max-h-60 overflow-y-auto">
                        <CommandEmpty>Soin non trouvé.</CommandEmpty>
                        <CommandGroup>
                            {soins.map((soin) => (
                            <CommandItem
                                key={soin.id}
                                value={soin.nom}
                                onSelect={() => {
                                setValuesoin(soin.nom)
                                setOpen(false)
                                }}
                            >
                                {soin.nom}
                                <Check
                                className={cn(
                                    "ml-auto",
                                    valuesoin === soin.nom ? "opacity-100" : "opacity-0"
                                )}
                                />
                            </CommandItem>
                            ))}
                        </CommandGroup>
                        </CommandList>
                    </Command>
                    </PopoverContent>
                  )}
                  <PopoverTrigger onClick={() => { setActive("second"); setOpen(true); }} asChild>
                  <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                  >
                      {valuedent
                      ? dents.find((dent) => dent.nom === valuedent)?.nom
                      : "Sélectionner une dent..."}
                      <ChevronsUpDown className="opacity-50" />
                  </Button>
                  </PopoverTrigger> 
                  {active === "second" && (
                    <PopoverContent className="w-[300px] p-0 max-h-60 overflow-y-auto">
                    <Command>
                        <CommandInput placeholder="Rechercher une dent..." className="h-9" />
                        <CommandList className="max-h-60 overflow-y-auto">
                        <CommandEmpty>Dent non trouvé.</CommandEmpty>
                        <CommandGroup>
                            {dents.map((dent) => (
                            <CommandItem
                                key={dent.id}
                                value={dent.nom}
                                onSelect={() => {
                                setValuedent(dent.nom)
                                setOpen(false)
                                }}
                            >
                                {dent.nom}
                                <Check
                                className={cn(
                                    "ml-auto",
                                    valuedent === dent.nom ? "opacity-100" : "opacity-0"
                                )}
                                />
                            </CommandItem>
                            ))}
                        </CommandGroup>
                        </CommandList>
                    </Command>
                    </PopoverContent>
                  )}
              </Popover>  
              <p className="text-red-500 text-sm">{formError}</p>  
              <DialogFooter className="flex gap-4 items-center justify-center py-4">
                <DialogClose asChild className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                <Button variant="outline">Annuler</Button>
                </DialogClose>
                <Button type="button" onClick={handleSubmitSoin} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 hover:text-black cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                    Enregistrer
                </Button>
              </DialogFooter>
          </form>
          </DialogContent>
      </Dialog>
  </section>
  )
}