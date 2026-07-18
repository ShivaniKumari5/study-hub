import { addDoc, collection, deleteDoc, getDocs ,doc, getDoc, updateDoc, query, where} from "firebase/firestore";
import { db } from "../Firebase";
import { GroupModel } from "../model/GroupModel";
const dbPath='group';
class GroupServices{

  async Add(Data){
    try{
        let obj=new GroupModel();
        // console.log(obj);

        obj.groupName=Data.groupname,
        obj.description=Data.description,
        obj.Image=Data.image,
        obj.cateId=Data.cate
        await addDoc(collection(db,dbPath),{...obj});
        return 1;

    }catch(error){
        console.log(error);
        return 0;
    }
  }

    // getting single id
   async single(id){
      try{
        let Docs= await getDoc(doc,(db,dbPath,id));
        return Docs.data();
  
      }catch(error){
        console.log(error);
      }
    }

    // update
     async Update(Data,id){
        try{
          let obj = new GroupModel();
          obj.groupName=Data.groupname;
          obj.description=Data.description;
          obj.Image=Data.image,
          obj.cateId=Data.cate,
          
          await updateDoc(doc(db,dbPath,id),{...obj});
          return 1;
    
        }catch(error){
          console.log(error);
          
        }
       }

    // delete 
    async Delete (id){
      try{
        await deleteDoc(doc(db,dbPath,id));
        return 1;

      }catch(error){
        console.log(error);
        
      }
    }   
     // read all
     async All(id){
      try{

        let groupDoc=null

        if(!!id){
          groupDoc= await getDocs(query(collection(db,dbPath),where("cateId","==",id)));
          
        }else{
        
          groupDoc= await getDocs(collection(db,dbPath));
        }
         

        let groupData= groupDoc.docs.map((el)=>{
        return{id:el.id,...el.data()}
        })
      return groupData;

      }catch(error){
        console.log(error);
        
      }
     }

}
export default new GroupServices;