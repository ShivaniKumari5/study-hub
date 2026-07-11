class AuthServices{
    setData(data,id){
        localStorage.setItem("uid",id);
        localStorage.setItem("email",data.email);
        localStorage.setItem("name",data.name);
        localStorage.setItem("userType",data.userType);
        localStorage.setItem("isLogin",true)
    }

    getUserType(){
        localStorage.getItem("userType");
    }

    getIsLogin(){
        return localStorage.getItem("isLogin");
    }

    clearData(){
        localStorage.clear();
    }
}
export default new AuthServices;