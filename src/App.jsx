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
import AddGroup from "./components/admin/group/AddGroup";
import UpdateGroup from "./components/admin/group/UpdateGroup";
import ManageGroup from "./components/admin/group/ManageGroup";
import ViewCategory from "./components/user/ViewCategory";
import ViewGroup from "./components/user/ViewGroup";
// import Pay from "./components/user/Pay";
import AddNotes from "./components/admin/notes/AddNotes";
import UpdateNotes from "./components/admin/notes/UpdateNotes";
import ManageNotes from "./components/admin/notes/ManageNotes";
import ViewSingleGroup from "./components/user/ViewSingleGroup";
import Open from "./components/user/Open";
import AddMeeting from "./components/admin/groupmeeting/AddMeeting";
import ManageMeeting from "./components/admin/groupmeeting/ManageMeeting";

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
      <Route path="/viewCategory" element={<ViewCategory/>}></Route> 
      <Route path="/viewGroup" element={<ViewGroup/>}></Route>  
      <Route path="/viewGroup/:id" element={<ViewGroup/>}></Route>  
      {/* <Route path="/pay" element={<Pay/>}></Route>    */}
      <Route path="/viewSingleGroup/:id" element={<ViewSingleGroup/>}></Route>
      <Route path="/open/:id" element={<Open/>}></Route>
      </Route>

      <Route path="/admin" element={<AdminLayout/>}>
      <Route index element={<Dashboard/>}></Route>
      <Route path="/admin/addcategory" element={<AddCategory/>}></Route>
      <Route path="/admin/addproduct" element={<AddProduct/>}></Route>
      <Route path="/admin/manageCategory" element={<ManageCategory/>}></Route>
      <Route path="/admin/updateCategory/:id" element={<UpdateCategory/>}></Route>
      <Route path="/admin/addgroup" element={<AddGroup/>}></Route>
      <Route path="/admin/updateGroup/:id" element={<UpdateGroup/>}></Route>
      <Route path="/admin/manageGroup" element={<ManageGroup/>}></Route>
      <Route path="/admin/addnotes" element={<AddNotes/>}></Route>
      <Route path="/admin/managenotes" element={<ManageNotes/>}></Route>
      <Route path="/admin/updateNotes/:id" element={<UpdateNotes/>}></Route>
      <Route path="/admin/addmeeting" element={<AddMeeting/>}></Route>
      <Route path="/admin/managemeeting" element={<ManageMeeting/>}></Route>
      </Route>
    </Routes>
     <ToastContainer />
    </BrowserRouter>
    </>
  )
}

export default App;