import { Navigate, Route, Routes } from "react-router";
import AdminLayout from "./layouts/adminlayouts/AdminDashboardLayouts";
import Dashboard from "./pages/admin/dashboard/dashboard";
import PatientList from "./pages/admin/Patients/patientList";
import Statistiques from "./pages/admin/Statistiques/statistiques";
import PatientForm from "./pages/admin/Patients/addpatient";
import Login from "./pages/auth/login";
import ForbiddenPage from "./pages/forbidden";
import Missing from "./pages/missing";
import RequireAuth from "./pages/auth/RequireAuth";
import useAuth from "./hooks/useAuth";
import UserLayout from "./layouts/userlayouts/userDashboardLayouts";
import Personnel from "./pages/admin/users/personnel";
import AddUser from "./pages/admin/users/adduser";
import UpdateUser from "./pages/admin/users/updateuser";
import { ToastContainer } from "react-toastify";
import AddPatient from "./pages/admin/Patients/addpatient";
import UpdatePatient from "./pages/admin/Patients/updatepatient";
import DetailsPatient from "./pages/admin/Patients/detailspatient";
import Consultation from "./pages/admin/consultation/consultationlist";

const getUserRole = () => {
  const user = useAuth();
  const role = user?.userInfo?.userToLogin?.role;
  return role;
};

const App = () => {
  const role = getUserRole();
  return (
    <>
      <Routes>
        <Route path="/"
          element={ 
            role 
              ? role === "MEDECIN"
              ? <Navigate to="/admin/dashboard" />
              : role === "ASSISTANT"
              ? <Navigate to="/admin/patients" />
              : <Navigate to="/forbidden" />
            : <Navigate to="/login" />
          }
        />

        {/* public routes */}
        <Route path="login" element={<Login/>}/>
        <Route path="forbidden" element={<ForbiddenPage />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={['MEDECIN']}/>}>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="addpatient-form" element={<AddPatient />} />
            <Route path="updatepatient-form/:id" element={<UpdatePatient />} />
            <Route path="detailspatient/:id" element={<DetailsPatient />} />
            <Route path="consultation" element={<Consultation />} />
            <Route path="statistiques" element={<Statistiques />} />
            <Route path="personnel" element={<Personnel />} />
            <Route path="adduser-form" element={<AddUser />} />
            <Route path="updateuser-form/:id" element={<UpdateUser />} />
          </Route>
        </Route> 

        <Route element={<RequireAuth allowedRoles={['ASSISTANT']}/>}>
          <Route path="user" element={<UserLayout />}>
            <Route path="patients" element={<PatientList />} />
            <Route path="patient-form" element={<PatientForm />} />
            <Route path="consultation" element={<Consultation />} />
          </Route>
        </Route> 

        {/* catch all */}
        <Route path="*" element={<Missing/>}/>
      </Routes>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App;
