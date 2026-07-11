import { Outlet } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

function AdminLayout(){
    return(
        <>
        <AdminHeader></AdminHeader>
        <Outlet></Outlet>
        <AdminFooter></AdminFooter>
        
        </>

    )
}
export default AdminLayout;