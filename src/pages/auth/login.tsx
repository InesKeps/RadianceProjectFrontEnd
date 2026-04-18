import { Formik, Form, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import Input from "../../components/myComponents/input";
import Password from "../../components/myComponents/password";
import type { ApiResponse } from "../../types/base";
import type { AuthInfo, LoginDto } from "../../types/user";
import { loginAction } from "../../store/auth/actions";
import useAppDispatch from "../../hooks/useAppDispatch";
import { toast } from "react-toastify";


const Login =()=>{
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const verifytel = /^\+?[1-9][0-9]{6,14}$/;

  const initialValues = {
    tel: "",
    password: "",
  };

  const validationSchema = Yup.object({
      tel: Yup
        .string()
        .matches(verifytel, "Le numéro de téléphone doit contenir entre 8 et 15 chiffres")
        .required("Le téléphone est obligatoire"),
      password: Yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .matches(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .matches(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
        .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
        .matches(/[@$!%*?&]/, "Le mot de passe doit contenir au moins un caractère spécial")
        .required("Le mot de passe est obligatoire"),
  });

  const handleSubmit = async (
    values: LoginDto,
    formikHelpers: FormikHelpers<LoginDto>
  ) => {
    formikHelpers.setSubmitting(true);
    const response = await dispatch(loginAction(values));

    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Utilisateur connecté avec succès.");
      const payload = response.payload as ApiResponse<AuthInfo> | undefined;
      const userRole = payload?.data?.userToLogin?.role;
      if (userRole === "MEDECIN") {
        navigate("/admin/dashboard");
      } else if (userRole === "ASSISTANT") {
        navigate("/user/patients");
      } else {
        navigate("/forbidden");
      }
    }

    if (response.meta.requestStatus === "rejected") {
      toast.error("Echec Informations incorrectes");
    }

    formikHelpers.setSubmitting(false);
  };

 return(
    <section className="flex justify-center items-center bg-white h-dvh overflow-hidden">
        <div className="flex w-3/5 h-2/3 bg-white shadow-xl rounded-xl border border-[#f5f5f5]">
            <div className="w-1/2 flex p-16 justify-center items-center">
                <img src="/logorad.png" alt="Logo du cabinet" />
            </div>
            <div className="w-1/2 bg-[#edf8fa] rounded-r-xl">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {(formik) => (
                    <Form autoComplete="off" className="flex flex-col items-center justify-center w-full h-full">
                        <div className="flex flex-col p-4 gap-3 w-[80%]">
                            <h2 className="font-semibold text-2xl text-center text-[#0caccc] mb-2">Connexion</h2>
                            <Input
                                label="Numéro de téléphone"
                                name="tel"
                                placeholder="Entrez votre numéro de téléphone"
                                type="text"
                            />
                            <Password
                                label="Mot de passe"
                                name="password"
                                placeholder="Entrez votre mot de passe"
                            />
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="bg-[#0caccc] hover:bg-[#05c3e9] cursor-pointer shadow-lg font-medium rounded-full py-1 my-2 text-white w-full"
                            >
                                Se connecter
                            </button>
                        </div>
                    </Form>
                    )}
                </Formik>
            </div>
        </div>
    </section>
 );
}

export default Login;
