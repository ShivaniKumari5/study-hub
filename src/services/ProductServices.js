import { addDoc } from "firebase/firestore/lite";
import { CategoryModel } from "../model/CategoryModel";
const dbPath='product';
class ProductServices{
  async Add(Data){
    try{
        let obj=new CategoryModel();
        obj.productName=Data.name,
        obj.description=Data.description,
        obj.price=Data.price,
    
        await addDoc(collection(db,dbPath),{...obj});
        return 1;

    }catch(error){
        console.log(error);
        return 0;
    }
  }
}
export default new ProductServices;