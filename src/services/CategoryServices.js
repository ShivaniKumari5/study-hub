import { addDoc, collection, deleteDoc, getDocs ,doc, getDoc, updateDoc} from "firebase/firestore";
import { CategoryModel } from "../model/CategoryModel";
import { db } from "../Firebase";
const dbPath='category';
class CategoryServices{
  async Add(Data){
    try{
        let obj=new CategoryModel();
        console.log(obj);
        obj.categoryName=Data.name,
        obj.description=Data.description,
        obj.Image=Data.image
        await addDoc(collection(db,dbPath),{...obj});
        return 1;

    }catch(error){
        console.log(error);
        return 0;
    }
  }
// read R
  async All(){
    try{
       let cateDoc= await getDocs(collection(db,dbPath))
      //  console.log(cateDoc.docs[2].data());

      // cateDoc.docs.map((el)=>{
      //   // console.log(el.data());
      // })                
     let categoryData= cateDoc.docs.map((el)=>{
      return{id:el.id,...el.data()}
      })
      return categoryData;

    }catch(error){
      console.log(error);
      
    }
  }

  // D delete
   async deleteCate(id){
    console.log(id);
    try{
      await deleteDoc(doc(db,dbPath,id));
      return 1;

    }catch(error){
      console.log(error);
    }
   }

   
   async single(id){
    try{
      let Docs= await getDoc(doc(db,dbPath,id));
      return Docs.data();

    }catch(error){
      console.log(error);
    }
   }
   
   // u update
  //  async Update(Data,id){
  //   try{
  //     let obj = new CategoryModel();
  //     obj.categoryName=Data.name;
  //     obj.description=Data.description;
  //     obj.Image=Data.image;
  //     await updateDoc(doc(db,dbPath,id),{...obj});
  //     return 1;

  //   }catch(error){
  //     console.log(error);
      
  //   }
  //  }


 async Update(Data, id) {
  try {
    await updateDoc(doc(db, dbPath, id), {
      categoryName: Data.name,
      description: Data.description,
      Image: Data.image,
      updatedAt: new Date().toISOString()
    });
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
}  
 
}
export default new CategoryServices;