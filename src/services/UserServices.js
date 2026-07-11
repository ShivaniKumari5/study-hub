import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../Firebase';
import AuthServices from "./AuthServices";
import { UserModel } from "../model/UserModel";
import { toast } from "react-toastify";

const dbPath = "users"
class UserServices {

  async Login(email, password) {

    try {
      let userCreed = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCreed.user.uid;


      // Db firestore
      let UserDoc = await getDoc(doc(db, dbPath, uid));
      const userData = UserDoc.data();

      AuthServices.setData(userData,uid);


      return userData.userType;
    } catch (err) {
      console.log(err);
    }

  }
  async Register(data){
    try{
      let userCreed = await createUserWithEmailAndPassword(auth,data.email,data.password);
      let uid = userCreed.user.uid;

      let obj =new UserModel();
      obj.name= data.name;
      obj.email= data.email;
      obj.contact= data.contact;
      obj.profile= data.profile;
      obj.address= data.address;
      let data2 ={...obj};

      await setDoc(doc(db,dbPath,uid),data2);
      AuthServices.setData(data2,uid);
      return 1;
      
    }catch(error){
      console.log(error);
      toast.error(error.message);
      return 0;
      
    }
  }

}
export default new UserServices;


// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }