import { addDoc, collection, deleteDoc, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { DoubtModel } from "../model/DoubtModel";
const dbPath = 'doubt';

class DoubtServices {
    async Add(Data) {
        try {
            let obj = new DoubtModel();
            console.log(obj);
            obj.groupId = Data.groupId,
                obj.groupName = Data.groupName,
                obj.studentId = Data.studentId,
                obj.studentName = Data.studentName,
                obj.status = Data.status,
                obj.MessageStudent = Data.MessageStudent,
                obj.MessageAdmin = Data.MessageAdmin,
                await addDoc(collection(db, dbPath), { ...obj });
            return 1;

        }
        catch (error) {
            console.log(error);
            return 0;

        }
    }
    // read all
    async All() {
        try {
            let doubtDoc = await getDocs(collection(db, dbPath))

            let doubtData = doubtDoc.docs.map((el) => {
                return { id: el.id, ...el.data() }
            })
            return doubtData;

        } catch (error) {
            console.log(error);

        }
    }

    // u update
    //  async Update(Data,id){
    //   try{
    //     let obj = new DoubtModel();
    //     obj.MessageAdmin=Data.MessageAdmin;
    //     obj.status="answered";
    //     await updateDoc(doc(db,dbPath,id));
    //     return 1;

    //   }catch(error){
    //     console.log(error);

    //   }
    //  }

    async Update(Data, id) {
        try {

            await updateDoc(
                doc(db, dbPath, id),
                {
                    MessageAdmin: Data.MessageAdmin,
                    status: "answered"
                }
            );

            return 1;

        } catch (error) {
            console.log(error);
            return 0;
        }
    }



}
export default new DoubtServices;