import { Formik, Form, type FormikHelpers } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";
import { FaChevronCircleLeft } from "react-icons/fa";
import Input from "../../../components/myComponents/input";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { toast } from "react-toastify";
import Select from "@/components/select";
import type { PatientDtoUpdate } from "@/types/patient";
import { updatePatient } from "@/store/patients/actions";
import useAppSelector from "@/hooks/useAppSelector";
import type { RootState } from "@/store/store";
import type { Sexe } from "@/types/user";

const UpdatePatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const patients = useAppSelector((state: RootState) => state.patient.items);
    const patientToUpdate = patients.find((patient) => patient.id === Number(id));
    
    const initialValues: PatientDtoUpdate = patientToUpdate || {
        id: Number(id),
        nom: "",
        prenom: "",
        adresse: "",
        dateNaissance: "",
        genre: "" as Sexe,
        tel: "",
        profession: "",
        nationalite: "",
    };

    const verifytel = /^\+?[1-9][0-9]{8,15}$/;

    const validationSchema = yup.object().shape({
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

    const handleSubmit = async (
        values: PatientDtoUpdate,
        formikHelpers: FormikHelpers<PatientDtoUpdate>
        ) => {
        formikHelpers.setSubmitting(true);
        const response = await dispatch(updatePatient(values));
    
        if (response.meta.requestStatus === "fulfilled") {
            toast.success("Patient mis a jour avec succès.");
            formikHelpers.resetForm();
            navigate(`/admin/detailspatient/${id}`);
        }
    
        if (response.meta.requestStatus === "rejected") {
            toast.error("Echec de mise à jour du Patient.");
        }
    
        formikHelpers.setSubmitting(false);
    };

    return(
        <section className="relative">
            <button 
                type="button"
                onClick={() => navigate(`/admin/detailspatient/${id}`)}
                className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer">
                <FaChevronCircleLeft/>
            </button>
            <div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {(formik) => (
                    <Form autoComplete="off" className="flex flex-col items-center pt-12 justify-center w-full h-full">
                        <div className="flex flex-col p-4 gap-3 w-[80%]">
                            <h2 className="font-semibold text-2xl text-center text-[#0caccc] mb-4">Modifier un patient</h2>
                            <div className="flex gap-8">
                                <div className="flex flex-col gap-4 w-1/2">
                                    <Input
                                        label="Nom"
                                        name="nom"
                                        placeholder="Entrez le nom"
                                        type="text"
                                    />
                                    <Input
                                        label="Prénom"
                                        name="prenom"
                                        placeholder="Entrez le prénom"
                                        type="text"
                                    />
                                    <Input
                                        label="Adresse"
                                        name="adresse"
                                        placeholder="Entrez l'adresse"
                                        type="text"
                                    />
                                    <Input
                                        label="Date de naissance"
                                        name="dateNaissance"
                                        placeholder="Entrez la date de naissance"
                                        type="date"
                                    />
                                </div>
                                <div className="flex flex-col gap-4 w-1/2">
                                    <Select
                                        label="Sexe"
                                        name="genre"
                                        options={[
                                            { value: "M", label: "Masculin" },
                                            { value: "F", label: "Féminin" },
                                        ]}
                                    />
                                    <Input
                                        label="Numéro de téléphone"
                                        name="tel"
                                        placeholder="Entrez le numéro de téléphone"
                                        type="text"
                                    /> 
                                    <Input
                                        label="Profession"
                                        name="profession"
                                        placeholder="Entrez la profession"
                                        type="text"
                                    />
                                    <Input
                                        label="Nationalité"
                                        name="nationalite"
                                        placeholder="Entrez la Nationalité"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center items-center pt-4">
                                <button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className="bg-[#0caccc] hover:bg-[#05c3e9] cursor-pointer shadow-lg font-medium rounded-full py-1 my-2 text-white w-1/2"
                                >
                                    Modifier
                                </button>
                            </div>
                        </div>
                    </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}

export default UpdatePatient;