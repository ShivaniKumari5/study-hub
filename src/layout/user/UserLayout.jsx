import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserFooter from "./UserFooter";

function UserLayout(){
    return(
        <>
        <UserHeader></UserHeader>
        <Outlet></Outlet>
        <UserFooter></UserFooter>
        
        </>

    )
}
export default UserLayout;