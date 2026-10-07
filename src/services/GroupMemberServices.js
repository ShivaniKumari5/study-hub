import { addDoc, collection, deleteDoc, getDocs, doc, getDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../Firebase";
const dbPath = 'groupMember';

class GroupMemberServices {

  async Add(Data) {
    try {
    await addDoc(collection(db, dbPath), {
      ...Data,
      joinedAt: new Date().toISOString()
    });
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

      await updateDoc(doc(db, dbPath, id), Data);
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
  async All(id) {
    try {

      let groupDoc = null

      if (!!id) {
        groupDoc = await getDocs(query(collection(db, dbPath), where("uid", "==", id)));
      } else {
        groupDoc = await getDocs(collection(db, dbPath));
      }

      // let grpMemeberDocs = await getDocs(collection(db, dbPath))

      let grpMemberData = groupDoc.docs.map((el) => {
        return { id: el.id, ...el.data() }
      })
      return grpMemberData;

    } catch (error) {
      console.log(error);

    }
  }

}
export default new GroupMemberServices;