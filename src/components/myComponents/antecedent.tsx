import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Formik, Form, type FormikHelpers, Field, FieldArray } from "formik";
import {
  Card,
  CardContent,
  CardFooter,
  CardAction,
  CardTitle
} from "@/components/ui/card";
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
import { toast } from "sonner";
import useAppDispatch from "@/hooks/useAppDispatch";
import { antecedentSchema } from "@/pages/admin/Patients/addpatient";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import Input from "@/components/myComponents/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Antecedent = () => {
    const dispatch = useAppDispatch();

    const patientDetails = useAppSelector((state: RootState) => state.patient.selectedPatient);

    const antecedentInitialValues = {
        antecedents: [""],
    };

    const handleSubmitAntecedent = (values: { antecedents: string[] }) => {

    };

  return (
    <section className="flex flex-col gap-4 w-full h-full relative">
        <AlertDialog>
            <Dialog>  
                <Card className="bg-[#f7f9fa] p-4 ">
                    <CardAction className="flex absolute right-4 top-4 gap-2">
                        <DialogTrigger asChild>
                        <button className="text-[#0DABCB] text-xl hover:text-[#07c6ec] cursor-pointer"><IoAdd /></button>
                        </DialogTrigger>
                    </CardAction>
                    <CardTitle className="flex items-center justify-between px-2">Antécédents</CardTitle>
                    <CardContent>
                        {patientDetails?.antecedent?.length ? (
                        patientDetails.antecedent.map((ant) => (
                            <div className="flex justify-between border-b py-2">
                            <p key={ant.id}>{ant.nomAntecedent}</p>
                            <div className="flex gap-2">
                                <button className="text-[#0DABCB] hover:text-[#07c6ec] cursor-pointer"><FaRegEdit /></button>
                                <button className="text-red-500 hover:text-red-600 cursor-pointer"><MdDeleteOutline /></button>
                            </div>
                            </div>
                        ))
                        ) : (
                        <p className="text-gray-500">Aucun antécédent</p>
                        )}
                        </CardContent>
                    </Card>
                <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="font-medium text-[#0caccc]">
                    <DialogTitle className="text-xl text-center">Enregistrement des antécédents</DialogTitle>
                    </DialogHeader>
                    <Formik initialValues={antecedentInitialValues} validationSchema={antecedentSchema} onSubmit={handleSubmitAntecedent}>
                        {(formik) => (
                        <Form className="flex flex-col gap-6 w-[90%] mx-auto">
                            <CardContent>
                                <FieldArray name="antecedents">
                                    {({ push, remove }) => (
                                    <div className="flex flex-col gap-3">
                                    {formik.values.antecedents.map((_: any, index: any) => (
                                    <div className="flex gap-2" key={index}>
                                    <Field
                                    className="w-full outline-none py-1 px-3 shadow-sm bg-white rounded-full placeholder:text-xs"
                                    name={`antecedents[${index}]`}
                                    placeholder="Entrer l'antécédent"
                                    />
                                    <button type="button"  onClick={() => remove(index)} className="cursor-pointer hover:text-red-500">Supprimer</button>
                                    </div>
                                    ))}
                                    <button type="button" onClick={() => push("")} className="text-[#0DABCB] hover:text-[#00cff8] font-medium cursor-pointer">Ajouter un antécédent</button>
                                    </div>
                                    )}
                                </FieldArray>
                            </CardContent>
                            <CardFooter className="flex gap-4 items-center justify-center py-4">
                                <button type="submit" disabled={formik.isSubmitting} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-full">
                                    Enregistrer
                                </button>
                            </CardFooter>
                        </Form>
                        )}
                    </Formik>
                </DialogContent>
                </form>
            </Dialog>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Attention</AlertDialogTitle>
                <AlertDialogDescription>
                Vous voulez vraiment supprimer cet antecedent?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                {/* <AlertDialogAction onClick={()=>handleDeleteAssurance()} className="bg-red-300">Oui, Supprimer</AlertDialogAction> */}
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </section>
  );
};

export default Antecedent;