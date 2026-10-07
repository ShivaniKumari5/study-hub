class AuthServices{

    
    setData(data,id){
        localStorage.setItem("uid",id);
        localStorage.setItem("email",data.email);
        localStorage.setItem("name",data.name);
        localStorage.setItem("userType",data.userType);
        localStorage.setItem("isLogin",true);
    }
    getUid(){
        return localStorage.getItem("uid");
    }
    getName() {
        return localStorage.getItem("name");
    }
  
    getUserType(){
        return localStorage.getItem("userType");
    }

    getIsLogin(){
        return localStorage.getItem("isLogin") === "true";
    }

    clearData(){
        localStorage.clear();
    }
}
export default new AuthServices;