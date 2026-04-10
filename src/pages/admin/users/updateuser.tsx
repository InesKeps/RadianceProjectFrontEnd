import { Formik, Form, type FormikHelpers } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/myComponents/input";
import Password from "../../../components/myComponents/password";
import type { Role, Sexe, UserDtoUpdate } from "../../../types/user";
import { updateUser } from "../../../store/users/actions";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import { toast } from "react-toastify";
import Select from "@/components/select";
import type { RootState } from "@/store/store";
import { FaChevronCircleLeft } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const users = useAppSelector((state: RootState) => state.user.items);
    const userToUpdate = users.find((user) => user.id === Number(id));

    const initialValues: UserDtoUpdate = userToUpdate || {
        id: Number(id),
        nom: "",
        tel: "",
        adresse: "",
        role: "" as Role,
        sexe: "" as Sexe,
        password: "",
    };

    const verifytel = /^\+?[1-9][0-9]{6,14}$/;

    const validationSchema = yup.object().shape({
        nom: yup
        .string()
        .trim()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(50, "Le nom ne doit pas dépasser 50 caractères")
        .required("Le nom est obligatoire"),

        sexe: yup
        .string()
        .required("Le sexe est obligatoire"),

        tel: yup
        .string()
        .matches(verifytel, "Le numéro de téléphone doit contenir entre 8 et 15 chiffres")
        .required("Le téléphone est obligatoire"),

        adresse: yup
        .string()
        .trim()
        .min(5, "L'adresse doit contenir au moins 5 caractères")
        .max(100, "L'adresse ne doit pas dépasser 100 caractères")
        .required("L'adresse est obligatoire"),

        password: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
        .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
        .matches(/[@$!%*?&]/, "Le mot de passe doit contenir au moins un caractère spécial"),
        // .required("Le mot de passe est obligatoire"),

        role: yup
        .string()
        .required("Le role est obligatoire"),
    });


    const handleSubmit = async (
        values: UserDtoUpdate,
        formikHelpers: FormikHelpers<UserDtoUpdate>
        ) => {
        formikHelpers.setSubmitting(true);
        const response = await dispatch(updateUser(values));
    
        if (response.meta.requestStatus === "fulfilled") {
            toast.success("Membre modifié avec succès.");
            formikHelpers.resetForm();
            navigate("/admin/personnel");
        }
    
        if (response.meta.requestStatus === "rejected") {
            toast.error("Echec de modification du membre.");
        }
    
        formikHelpers.setSubmitting(false);
    };

    return(
        <section className="relative flex flex-col items-center justify-center">
            <button 
                type="button"
                onClick={() => navigate("/admin/personnel")}
                className="absolute top-4 left-4 text-[#0DABCB] text-2xl cursor-pointer">
                <FaChevronCircleLeft/>
            </button>
            <Card className="w-[50%] bg-[#f7f9fa]">
                <CardHeader className="text-center text-lg text-[#0DABCB]">
                    <CardTitle>Formulaire de Modification</CardTitle>
                </CardHeader>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {(formik) => (
                    <Form autoComplete="off" className="w-full h-full">
                        <div className="flex flex-col p-4 gap-3">
                            <CardContent>
                                <Input
                                    label="Nom"
                                    name="nom"
                                    placeholder="Entrez le nom"
                                    type="text"
                                />
                                <Input
                                    label="Numéro de téléphone"
                                    name="tel"
                                    placeholder="Entrez le numéro de téléphone"
                                    type="text"
                                />
                                <Input
                                    label="Adresse"
                                    name="adresse"
                                    placeholder="Entrez l'adresse"
                                    type="text"
                                />
                                <Select
                                    label="Sexe"
                                    name="sexe"
                                    options={[
                                        { value: "M", label: "Masculin" },
                                        { value: "F", label: "Féminin" },
                                    ]}
                                    />
                                <Select
                                    label="Rôle"
                                    name="role"
                                    options={[
                                        { value: "ASSISTANT", label: "Assistant" },
                                    ]}
                                    />
                                <Password
                                    label="Mot de passe"
                                    name="password"
                                    placeholder="Entrez un mot de passe si vous voulez le modifier"
                                />
                            </CardContent>
                            <CardFooter>
                                <button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className="bg-[#0caccc] hover:bg-[#05c3e9] cursor-pointer shadow-lg font-medium rounded-full py-1 my-2 text-white w-full"
                                >
                                    Modifier
                                </button>
                            </CardFooter>
                        </div>
                    </Form>
                    )}
                </Formik>
            </Card>
        </section>
    )
}

export default UpdateUser;
