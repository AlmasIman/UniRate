import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPages/Login.jsx";
import SignUp from "./pages/LoginPages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Universities from "./pages/Universities.jsx";
import University from "./pages/University.jsx";
import Speciality from "./pages/Universityspeciality.jsx";
import FinanceCalculator from "./pages/FinanceCalculator.jsx";
import Forum from "./pages/Forum.jsx";
import Thread from "./pages/Thread.jsx";
import Contacts from "./pages/ContactUs.jsx";
import FavouriteUniversities from "./pages/FavouriteUniversities.jsx";
import "@fontsource/mulish"; // Использует стандартный вес 400
import "@fontsource/mulish/700.css"; // Если нужен жирный текст
import "@fontsource/poppins"; // Стандартный вес (400)
import "@fontsource/poppins/700.css"; // Жирный текст
import "@fontsource/inter"; // Подключает Inter с весом 400 (обычный)
import "@fontsource/inter/700.css"; // Если нужен жирный шрифт
import "@fontsource/dm-sans"; // Defaults to weight 400
import "@fontsource/dm-sans/500.css"; // Specific weight
import "@fontsource/rubik"; // Defaults to weight 400
import "@fontsource/rubik/500.css"; // Specific weight
import "bootstrap/dist/css/bootstrap.min.css";

import Profile from "./pages/Profile.jsx";
import Notifications from "./pages/Notifications.jsx";
import FAQ from "./pages/FAQ.jsx";
import Terms from "./pages/TermsAndConditions.jsx";
import Confirm from "./pages/LoginPages/Confirm.jsx";
import EnterOTP from "./pages/LoginPages/EnterOTP.jsx";
import ForgotPassword from "./pages/LoginPages/ForgotPassword.jsx";
import SetNewPass from "./pages/LoginPages/SetNewPassword.jsx";
import SuccessResetPass from "./pages/LoginPages/SuccessResetPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import WrongPlace from "./pages/WronPlaceBuddyPage.jsx";
import UniversityModule from "./pages/admin/UniversityModule.jsx";
import CreateUniversity from "./pages/admin/CreateUniversity.jsx";
import ViewUniversity from "./pages/admin/ViewUniverisity.jsx";
import CreateProgram from "./pages/admin/CreateProgram.jsx";
import ForumModule from "./pages/admin/ForumModule.jsx";
import CreateFaculty from "./pages/admin/CreateFaculty.jsx";
import ViewProgram from "./pages/admin/ViewPrograms.jsx";
import ViewForum from "./pages/admin/ViewForum.jsx";
import CreateForum from "./pages/admin/CreateForum.jsx";


function App() {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = isAuthenticated && user?.role === "ADMIN";

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/confirm"
          element={
            <ProtectedRoute
              condition={
                sessionStorage.getItem("isRegisterInfoSended") === "true"
              }
              redirectTo="/signup"
            >
              <Confirm />
            </ProtectedRoute>
          }
        />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route
          path="/otp"
          element={
            <ProtectedRoute
              condition={sessionStorage.getItem("isEmailProvided") === "true"}
              redirectTo="/forgotPassword"
            >
              <EnterOTP />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setNewPassword"
          element={
            <ProtectedRoute
              condition={sessionStorage.getItem("otpVerified") === "true"}
              redirectTo="/forgotPassword"
            >
              <SetNewPass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success-reset-password"
          element={
            <ProtectedRoute
              condition={
                sessionStorage.getItem("isPasswordResetted") === "true"
              }
              redirectTo="/forgotPassword"
            >
              <SuccessResetPass />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/view-university/:id" element={<University />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute condition={isAuthenticated} redirectTo="/">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-university/speciality/:id"
          element={<Speciality />}
        />
        <Route path="/calculator" element={<FinanceCalculator />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/thread/:forumId" element={<Thread />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route
          path="/favouriteuniversities"
          element={
            <ProtectedRoute condition={isAuthenticated} redirectTo="/">
              <FavouriteUniversities />
            </ProtectedRoute>
          }
        />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />

        {/* admin side */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute condition={isAdmin} redirectTo="/error">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/university-module"
          element={
            <ProtectedRoute condition={isAdmin} redirectTo="/error">
              <UniversityModule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/university-create"
          element={
            <ProtectedRoute condition={isAdmin} redirectTo="/error">
              <CreateUniversity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/university-view/:id"
          element={
            <ProtectedRoute condition={isAdmin} redirectTo="/error">
              <ViewUniversity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/university-view/program/:id"
          element={
            <ProtectedRoute condition={isAdmin} redirectTo="/error">
              <ViewProgram />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/forum-view/:id"
          element={
            <ProtectedRoute condition={isAdmin} redirectTo="/error">
              <ViewForum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/university-create-program"
          element={
            <ProtectedRoute condition={isAdmin} redirectTo="/error">
              <CreateProgram />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/university-create-faculty"
          element={
            <ProtectedRoute condition={isAdmin} redirectTo="/error">
              <CreateFaculty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/forum-create"
          element={
            <ProtectedRoute condition={isAdmin} redirectTo="/error">
              <CreateForum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/forum"
          element={
            <ProtectedRoute condition={isAdmin} redirectTo="/error">
              <ForumModule />
            </ProtectedRoute>
          }
        />
        <Route path="/error" element={<WrongPlace />} />
        
      </Routes>
    </Router>
  );
}

export default App;
