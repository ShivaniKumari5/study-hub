import { addDoc, collection, deleteDoc, getDocs, doc, getDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { NotesModel } from "../model/NotesModel";

const dbPath = 'notes';
class NotesServices {
  async Add(Data) {
    try {
      let obj = new NotesModel();
      console.log(obj);

      obj.title = Data.title,
        obj.description = Data.description,
        obj.fileUrl = Data.fileUrl,
        obj.groupId = Data.group,
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

  // delete
  async Delete(id) {
    try {
      await deleteDoc(doc(db, dbPath, id));
      return 1;

    } catch (error) {
      console.log(error);

    }

  }

  // fetch All
  async All() {
    try {
      let notesDoc = await getDocs(collection(db, dbPath))

      let notesData = notesDoc.docs.map((el) => {
        return { id: el.id, ...el.data() }
      })
      return notesData;

    } catch (error) {
      console.log(error);

    }
  }

  // update
  // async Update(Data, id) {
  //   try {
  //     let obj = new NotesModel();
  //     obj.title = Data.title;
  //     obj.description = Data.description;
  //     obj.fileUrl = Data.fileUrl,
  //       obj.groupId = Data.group,

  //       await updateDoc(doc(db, dbPath, id), { ...obj });
  //     return 1;

  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  async Update(Data, id) {
  try {
    await updateDoc(doc(db, dbPath, id), {
      title: Data.title,
      description: Data.description,
      fileUrl: Data.fileUrl,
      groupId: Data.group
    });
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

}
export default new NotesServices;