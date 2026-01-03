import { Formik, Form, FieldArray, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router"
import { FaChevronCircleLeft } from "react-icons/fa";
import Input from "@/components/myComponents/input";
import Select from "@/components/select";
import type { PatientDto, Sexe } from "@/types/patient";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { createPatientwithdetails } from "@/store/patients/actions";
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
import { undefined } from "zod";

type Step = "patient" | "antecedent" | "allergie" | "assurance" | "resume";

export const assuranceSchema = yup.object().shape({
        type: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "Le type ne doit pas dépasser 50 caractères")
            .required("Type requis"),
        matricule: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "Le matricule ne doit pas dépasser 50 caractères")
            .required("Matricule requis"),
        adresse: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "L'adresse ne doit pas dépasser 50 caractères")
            .required("Adresse requise"),
}).optional();

export const antecedentSchema = yup.object().shape({
    nomAntecedent: yup
    .string()
    .trim()
    .min(2, "trop court")
    .max(50, "Le nom de l'antecedent ne doit pas dépasser 50 caractères"),
});

export const allergieSchema = yup.object().shape({
    nomAllergie: yup
        .string()
        .trim()
        .min(2, "trop court")
        .max(50, "Le nom de l'allergie ne doit pas dépasser 50 caractères"),
});  

const AddPatient = () =>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAuth();
    const id = user?.userInfo?.userToLogin?.id!;
    const [step, setStep] = useState<Step>("patient");

    const [patientData, setPatientData] = useState<any>({
        details: {
            nom: "",
            prenom: "",
            adresse: "",
            dateNaissance: "",
            genre: "" as Sexe,
            tel: "",
            profession: "",
            nationalite: "",
            userId: id,
        },
        antecedents: [""],
        allergies: [""],
        assurance: {
            type: "",
            matricule: "",
            adresse: "",
        },
    });

    const patientInitialValues: PatientDto = {
        nom: patientData.details.nom,
        prenom: patientData.details.prenom,
        adresse: patientData.details.adresse,
        dateNaissance: patientData.details.dateNaissance,
        genre: patientData.details.genre,
        tel: patientData.details.tel,
        profession: patientData.details.profession,
        nationalite: patientData.details.nationalite,
        userId: id,
    };

    const antecedentInitialValues = {
        antecedents: patientData.antecedents,
    };

    const allergieInitialValues = {
        allergies: patientData.allergies,
    };

    const assuranceInitialValues = {
        type: patientData.assurance.type,
        matricule: patientData.assurance.matricule,
        adresse: patientData.assurance.adresse,
    };

    const verifytel = /^\+?[1-9][0-9]{8,15}$/;

    const patientSchema = yup.object().shape({
    nom: yup
        .string()
        .trim()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(50, "Le nom ne doit pas dépasser 50 caractères")
        .required("Le nom est obligatoire"),

    prenom: yup
        .string()
        .trim()
        .min(2, "Le prenom doit contenir au moins 2 caractères")
        .max(50, "Le prenom ne doit pas dépasser 50 caractères")
        .required("Le nom est obligatoire"),

    adresse: yup
        .string()
        .trim()
        .min(5, "L'adresse doit contenir au moins 5 caractères")
        .max(100, "L'adresse ne doit pas dépasser 100 caractères")
        .required("L'adresse est obligatoire"),

    dateNaissance: yup
        .string()
        .required("Entrez La date de naissance")
        .test("is-date", "Date invalide", (value) => {
        return !isNaN(Date.parse(value));
        })
        .test("max-date", "La date ne peut pas dépasser celle d'aujourd'hui", (value) => {
        return new Date(value) <= new Date();
        }),

    genre: yup
        .string()
        .required("Entrez Le genre"),

    tel: yup
        .string()
        .matches(verifytel, "trop court min 8")
        .matches(verifytel, "Le numéro de téléphone doit contenir entre 8 et 15 chiffres"),

    profession: yup
        .string()
        .min(2, "trop court"),

    nationalite: yup
        .string()
        .required("Entrez La nationalité")
        .min(2, "trop court"),
    });

    const allergieSchema = yup.object().shape({
        nomAllergie: yup
            .string()
            .trim()
            .min(2, "trop court")
            .max(50, "Le nom de l'allergie ne doit pas dépasser 50 caractères"),
    });   

    const handleSubmitPatient = (values: PatientDto) => {
        setPatientData((prev: any) => ({ ...prev, details: { ...values } }));
        setStep("antecedent");
    };
    
    const handleSubmitAntecedent = (values: { antecedents: string[] }) => {
        setPatientData((prev: any) => ({ ...prev, antecedents: values.antecedents}));
        if (values.antecedents.length > 0) {
            setPatientData((prev: any) => ({ ...prev, antecedents: values.antecedents }));
        }
        setStep("allergie");
    };

    const handleSubmitAllergie = (values: { allergies: string[] }) => {
        setPatientData((prev: any) => ({ ...prev, allergies: values.allergies}));
        if (values.allergies.length > 0) {
            setPatientData((prev: any) => ({ ...prev, allergies: values.allergies }));
        }
        setStep("assurance");
    };

    const handleSubmitAssurance = (values: { type: string; matricule: string; adresse: string }) => {
        if (values.type || values.matricule || values.adresse) {
            setPatientData((prev: any) => ({ ...prev, assurance: { ...values } }));
            setStep("resume");
        }
    };

    const skipAssurance = () =>{
        setPatientData((prev: any) => ({ ...prev, assurance: {type: "", matricule: "", adresse:""}}));
        setStep("resume");
    }

    const handleSubmitInfos = async ()=>{

        if (patientData.antecedents[0] === "") {
            patientData.antecedents = undefined;
        }

        if (patientData.allergies[0] === "") {
            patientData.allergies = undefined;
        }

        if (patientData.assurance.type === "") {
            patientData.assurance = undefined;
        }
        
        const response = await dispatch(createPatientwithdetails(patientData));

        if (response.meta.requestStatus === "fulfilled") {
            toast.success("Patient et détails créés avec succès.");
            navigate("/admin/patients");
        }
        if (response.meta.requestStatus === "rejected") {
            toast.error("Echec de création du membre.");
        }
    };


    return(
        <section className="relative flex justify-center items-center py-12">
            <Card className="w-[70%] bg-[#f7f9fa]">
                {step === "patient" && (
                    <Formik initialValues={patientInitialValues} validationSchema={patientSchema} onSubmit={handleSubmitPatient}>
                    {(formik) => (
                        <Form className="flex flex-col gap-4 w-full mx-auto">
                            <button 
                                type="button"
                                onClick={() => navigate("/admin/patients")}
                                className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer">
                                <FaChevronCircleLeft/>
                            </button>
                            <CardHeader className="font-medium text-center text-[#0caccc]">
                                Enregistrer un patient
                            </CardHeader>
                            <CardContent className="flex gap-4">
                                <div className="flex flex-col gap-4 w-1/2">
                                    <Input label="Nom" name="nom" type="text" placeholder="Entrez le nom"/>
                                    <Input label="Prénom" name="prenom" type="text" placeholder="Entrez le prénom"/>
                                    <Input label="Adresse" name="adresse" type="text" placeholder="Entrez l'adresse"/>
                                    <Input label="Date de naissance" name="dateNaissance" type="date" placeholder="Entrez la date naissance"/>
                                </div>
                                <div className="flex flex-col gap-4 w-1/2">
                                    <Select label="Sexe" name="genre" options={[{ value: "M", label: "Masculin" }, { value: "F", label: "Féminin" }]} />
                                    <Input label="Téléphone" name="tel" type="text" placeholder="Entrez le numéro de téléphone"/>
                                    <Input label="Profession" name="profession" type="text" placeholder="Entrez la profession"/>
                                    <Input label="Nationalité" name="nationalite" type="text" placeholder="Entrez la nationalité"/>
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-center">
                                <button type="submit" disabled={formik.isSubmitting} 
                                        className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                    Suivant
                                </button>
                            </CardFooter>
                        </Form>
                    )}
                    </Formik>
                )}

                {step === "antecedent" && (
                <Formik initialValues={antecedentInitialValues} validationSchema={antecedentSchema} onSubmit={handleSubmitAntecedent}>
                    {(formik) => (
                    <Form className="flex flex-col gap-6 w-[60%] mx-auto">
                        <button 
                            type="button"
                            onClick={() =>  navigate("/admin/patients")}
                            className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer">
                            <FaChevronCircleLeft/>
                        </button>
                        <CardHeader className="font-medium text-xl text-center text-[#0caccc]">Enregistrement des antécédents</CardHeader>
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
                        <div className="flex gap-4">
                            <button type="button" onClick={()=>{setStep("patient")}} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                Précédent
                            </button>
                            <button type="submit" disabled={formik.isSubmitting} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                Suivant
                            </button>
                        </div>
                        </CardFooter>
                    </Form>
                    )}
                </Formik>
                )}

                
                {step === "allergie" && (
                <Formik initialValues={allergieInitialValues} onSubmit={handleSubmitAllergie}  validationSchema={allergieSchema} >
                    {(formik) => (
                    <Form className="flex flex-col gap-6 w-[60%] mx-auto">
                        <button 
                            type="button"
                            onClick={()=>  navigate("/admin/patients")}
                            className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer">
                            <FaChevronCircleLeft/>
                        </button>
                        <CardHeader className="font-medium text-xl text-center text-[#0caccc]">Enregistrement des allergies</CardHeader>
                        <CardContent>
                            <FieldArray name="allergies">
                                {({ push, remove }) => (
                                <div className="flex flex-col gap-3">
                                {formik.values.allergies.map((_: any, index: any) => (
                                <div className="flex gap-2" key={index}>
                                <Field
                                className="w-full outline-none py-1 px-3 shadow-sm bg-white rounded-full placeholder:text-xs"
                                name={`allergies[${index}]`}
                                placeholder="Entrer l'allergie"
                                />
                                <button type="button"  onClick={() => remove(index)} className="cursor-pointer hover:text-red-500">Supprimer</button>
                                </div>
                                ))}
                                <button type="button" onClick={() => push("")} className="text-[#0DABCB] hover:text-[#00cff8] font-medium cursor-pointer">Ajouter une allergie</button>
                                </div>
                                )}
                            </FieldArray>
                        </CardContent>
                        <CardFooter className="flex gap-4 items-center justify-center py-4">
                        <div className="flex gap-4">
                            <button type="button" onClick={()=>{setStep("antecedent")}} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                Précédent
                            </button>
                            <button type="submit" disabled={formik.isSubmitting} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                Suivant
                            </button>
                        </div>
                        </CardFooter>
                    </Form>
                    )}
                </Formik>
                )}

                {step === "assurance" && (
                    <Formik initialValues={assuranceInitialValues} validationSchema={assuranceSchema} onSubmit={handleSubmitAssurance}>
                        {(formik) => (
                        <Form className="flex flex-col gap-6 w-[70%] mx-auto">
                            <button 
                                type="button"
                                onClick={() => setStep("allergie")}
                                className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer">
                                <FaChevronCircleLeft/>
                            </button>
                            <CardHeader className="font-medium text-xl text-center text-[#0caccc]">Ajouter une assurance</CardHeader>
                            <CardContent className="flex flex-col gap-4">
                            <Input label="Type" name="type" type="text" placeholder="Entrez le type d'assurance"/>
                            <Input label="Matricule" name="matricule" type="text" placeholder="Entrez le matricule d'assuré" />
                            <Input label="Adresse" name="adresse" type="text" placeholder="Entrez l'adresse"/>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-4 items-center justify-center py-4">
                            <div className="flex gap-4">
                                <button type="button" onClick={()=>{setStep("allergie")}} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                    Précédent
                                </button>
                                <button type="submit" disabled={formik.isSubmitting} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                    Suivant
                                </button>
                            </div>
                            <div>
                                <p>Ce patient n'a pas d'assurance?
                                    <b onClick={skipAssurance} className="text-[#0DABCB] hover:text-[#086d81] cursor-pointer font-medium ml-2">
                                         Passer au Résumé
                                    </b>
                                </p>
                            </div>
                            </CardFooter>
                        </Form>
                        )}
                    </Formik>
                )}

                {step === "resume" && (
                    <section>
                        <button 
                            type="button"
                            onClick={() => setStep("assurance")}
                            className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer">
                            <FaChevronCircleLeft/>
                        </button>
                        <CardHeader className="font-medium text-xl text-center text-[#0caccc]">Récapitulatif des données du patient</CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="bg-white shadow rounded p-4">
                                <h3 className="font-semibold text-[#0DABCB]">Informations Patient</h3>
                                <p><strong>Nom :</strong> {patientData.details.nom}</p>
                                <p><strong>Prénom :</strong> {patientData.details.prenom}</p>
                                <p><strong>Adresse :</strong> {patientData.details.adresse}</p>
                                <p><strong>Date de naissance :</strong> {patientData.details.dateNaissance}</p>
                                <p><strong>Genre :</strong> {patientData.details.genre}</p>
                                <p><strong>Téléphone :</strong> {patientData.details.tel}</p>
                                <p><strong>Profession :</strong> {patientData.details.profession}</p>
                                <p><strong>Nationalité :</strong> {patientData.details.nationalite}</p>
                            </div>

                            {patientData.allergies?.length > 0 && (
                                <div className="bg-white shadow rounded p-4">
                                <h3 className="font-semibold text-[#0DABCB]">Allergies</h3>
                                <ul className="list-disc list-inside">
                                    {patientData.allergies.map((all: string, id: number) => (
                                    <li key={id}>{all}</li>
                                    ))}
                                </ul>
                                </div>
                            )}

                            {patientData.antecedents?.length > 0 && (
                                <div className="bg-white shadow rounded p-4">
                                <h3 className="font-semibold text-[#0DABCB]">Antécédents</h3>
                                <ul className="list-disc list-inside">
                                    {patientData.antecedents.map((ant: string, id: number) => (
                                    <li key={id}>{ant}</li>
                                    ))}
                                </ul>
                                </div>
                            )}

                            {patientData.assurance && (
                                <div className="bg-white shadow rounded p-4">
                                    <h3 className="font-semibold text-[#0DABCB]">Assurance</h3>
                                    <p><strong>Type :</strong> {patientData.assurance.type}</p>
                                    <p><strong>Matricule :</strong> {patientData.assurance.matricule}</p>
                                    <p><strong>Adresse :</strong> {patientData.assurance.adresse}</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex gap-4 items-center justify-center py-4">
                            <button type="button" onClick={()=>{setStep("assurance")}} className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                Précédent
                            </button>
                            <AlertDialog>
                            <AlertDialogTrigger className="bg-[#0DABCB] hover:bg-[#0DABCB]/80 cursor-pointer text-white font-medium px-3 py-1 rounded-full w-1/2">
                                Enregistrer
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Confirmation de l'enregistrement</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Vous avez vérifier que tout est correct et 
                                    vous confirmez l'enregistrement des données de ce patient?
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel >Annuler</AlertDialogCancel>
                                <AlertDialogAction className="bg-green-500" onClick={handleSubmitInfos} >Confirmer</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </section>
                )}
            </Card>
        </section>
    )
}

export default AddPatient;