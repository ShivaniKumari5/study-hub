import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./layout/user/UserLayout";
import Home from "./components/user/Home";
import Contact from "./components/user/Contact";
import About from "./components/user/About";
import Trainers from "./components/user/Trainers";
import Event from "./components/user/Event";
import Pricing from "./components/user/Pricing";
import Courses from "./components/user/Courses";
import Login from "./components/user/Login";
import Dashboard from "./components/admin/Dashboard";
import { ToastContainer } from "react-toastify";
import AddCategory from "./components/admin/category/AddCategory";
import AdminLayout from "./layout/admin/AdminLayout";
import AddProduct from "./components/admin/category/AddProduct";
import ManageCategory from "./components/admin/category/ManageCategory";
import UpdateCategory from "./components/admin/category/UpdateCategory";
import Register from "./components/user/Register";

function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
      <Route index element={<Home/>}></Route>
      <Route path="/contact" element={<Contact/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/trainers" element={<Trainers/>}></Route>
      <Route path="/events" element={<Event/>}></Route>
      <Route path="/pricing" element={<Pricing/>}></Route>
      <Route path="/courses"element={<Courses/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>      
      </Route>

      <Route path="/admin" element={<AdminLayout/>}>
      <Route index element={<Dashboard/>}></Route>
      <Route path="/admin/addcategory" element={<AddCategory/>}></Route>
      <Route path="/admin/addproduct" element={<AddProduct/>}></Route>
      <Route path="/admin/manageCategory" element={<ManageCategory/>}></Route>
      <Route path="/admin/updateCategory/:id" element={<UpdateCategory/>}></Route>
      </Route>
    </Routes>
     <ToastContainer />
    </BrowserRouter>
    </>
  )
}
export default App;