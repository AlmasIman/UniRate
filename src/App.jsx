import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPages/Login.jsx";
import SignUp from "./pages/LoginPages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Universities from  "./pages/Universities.jsx";
import University from "./pages/University.jsx";
import Speciality from "./pages/Universityspeciality.jsx";
import FinanceCalculator from "./pages/FinanceCalculator.jsx"
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
import Confirm from "./pages/LoginPages/Confirm.jsx"
import ExThread from "./pages/exThread.jsx"

import FavuniExample from "./pages/favuniExample.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirm" element={<Confirm />} />
        
        <Route path="/" element={<Home />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/university/:id" element={<University />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/university/speciality" element={<Speciality />} />
        <Route path="/calculator" element={<FinanceCalculator />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/thread/:forumId" element={<Thread />} /> {/* Thread page */}
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/favouriteuniversities" element={<FavouriteUniversities />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        
        <Route path="/te" element={<ExThread />} />
        <Route path="/favunasd" element={<FavuniExample />} />

      </Routes>
    </Router>
  );
}

export default App;
