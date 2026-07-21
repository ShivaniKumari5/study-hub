import { addDoc, collection, deleteDoc, getDocs, doc, getDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { GroupMemberModel } from "../model/GroupMemberModel";
const dbPath = 'groupMember';

class GroupMemberServices {

  async Add(Data) {
    try {
      let obj = new GroupMemberModel();
      // console.log(obj);

      await addDoc(collection(db, dbPath), { ...obj });
      return 1;

    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  // getting single id
  async single(id) {
    try {
      let Docs = await getDoc(doc(db, dbPath, id));
      return Docs.data();

    } catch (error) {
      console.log(error);
    }
  }

  // update
  async Update(Data, id) {
    try {
      let obj = new GroupMemberModel();
    //   obj.groupName = Data.groupname;
    //   obj.description = Data.description;
    //   obj.Image = Data.image,
    //     obj.cateId = Data.cate,

        await updateDoc(doc(db, dbPath, id), { ...obj });
      return 1;

    } catch (error) {
      console.log(error);

    }
  }

  // delete 
  async Delete(id) {
    try {
      await deleteDoc(doc(db, dbPath, id));
      return 1;

    } catch (error) {
      console.log(error);

    }
  }
  // read all
  async All() {
      try {
        let grpMemeberDocs = await getDocs(collection(db, dbPath))
  
        let grpMemberData = grpMemeberDocs.docs.map((el) => {
          return { id: el.id, ...el.data() }
        })
        return grpMemberData;
  
      } catch (error) {
        console.log(error);
  
      }
    }

}
export default new GroupMemberServices;