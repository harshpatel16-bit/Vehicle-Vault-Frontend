//import './App.css'
import { Route, Routes } from "react-router-dom";
import "./assets/adminlte.css";
import "./assets/adminlte.min.css";
import { Login } from "./components/common/Login";
import { Signup } from "./components/common/Signup";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./components/layout/Home";
import { Footer } from "./components/layout/Footer";
import { Welcome } from "./components/layout/Welcome";
import axios from "axios";
import { UserSidebar } from "./components/layout/UserSidebar";
import { UserProfile } from "./components/user/UserProfile";
import { SellCarForm } from "./components/user/SellCarForm";
import { ViewMyCars } from "./components/user/ViewMyCars";
import { UpdateMyCar } from "./components/user/UpdateMyCar";
import { ResetPassword } from "./components/common/ResetPassword";
import ForgotPassword from "./components/common/ForgotPassword";
import AboutUs from "./components/layout/AboutUs";
import CarProfile from "./components/layout/CarProfile";
import CompareCars from "./components/user/CompareCars";
import { ContactUs } from "./components/layout/ContactUs";
import { AdminSidebar } from "./components/admin/AdminSidebar";
import AdminWelcome from "./components/admin/AdminWelcome";
import AdminDashboard from "./components/admin/AdminDashboard";
import CarTable from "./components/admin/CarTable";
import AddStatePage from "./components/admin/AddStatePage";
import AddCityPage from "./components/admin/AddCityPage";
import AddAreaPage from "./components/admin/AddAreaPage";
import AdminUserManagement from "./components/admin/AdminUserManagement";
import AdminQueries from "./components/admin/AdminQuery";
import MessagePage from "./components/user/MessagePage";
import MyWishlist from "./components/user/MyWishlist";

function App() {
  axios.defaults.baseURL = "http://49.34.214.25:3011";

  return (
    <body className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
      <div className="app-wrapper">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/navbar" element={<Navbar />}></Route>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/aboutus" element={<AboutUs/>}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
          <Route path="/resetpassword/:token" element={<ResetPassword/>}></Route>
          <Route path="/contactus" element={<ContactUs/>}></Route>
          

          <Route path="/usersidebar" element={<UserSidebar />}>
            <Route path="profile" element={<UserProfile />}></Route>
            <Route path="sellcar" element={<SellCarForm />}></Route>
            <Route path="mycars" element={<ViewMyCars/>}></Route>
            <Route path="updatemycar/:id" element={<UpdateMyCar/>}></Route>
            <Route path="carprofile/:id" element={<CarProfile/>}></Route>
            <Route path="comparecars" element={<CompareCars/>}></Route>
            <Route path="message" element={<MessagePage/>}></Route>
            <Route path="message/:receiverId" element={<MessagePage/>}></Route>
            <Route path="mywishlist" element={<MyWishlist/>}></Route>


          </Route>

          <Route path="footer" element={<Footer />}></Route>

           {/* Admin Routes */}

           <Route path="/adminsidebar" element={<AdminSidebar />}>
           <Route path="welcome" element={<AdminWelcome />}></Route>
           <Route path="dashboard" element={<AdminDashboard />}></Route>
           <Route path="cartable" element={<CarTable />}></Route>
           <Route path="addstate" element={<AddStatePage/>}></Route>
           <Route path="addcity" element={<AddCityPage/>}></Route>
           <Route path="addarea" element={<AddAreaPage/>}></Route>
           <Route path="addarea" element={<AddAreaPage/>}></Route>
           <Route path="usertable" element={<AdminUserManagement/>}></Route>
           <Route path="query" element={<AdminQueries/>}></Route>





           
           
           </Route>

        </Routes>


       



      </div>
    </body>
  );
}

export default App;
