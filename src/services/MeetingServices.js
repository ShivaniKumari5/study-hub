import { addDoc, collection, deleteDoc, getDocs, doc, getDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import {MeetingModel} from "../model/MeetingModel"

const dbPath = 'meeting';
class MeetingServices {
  async Add(Data) {
    try {
      let obj = new MeetingModel();
      console.log(obj);

        obj.meetingLink = Data.link,
        obj.meetingDate = Data.date,
        obj.meetingTime = Data.time,
        obj.groupId = Data.group,
        await addDoc(collection(db, dbPath), { ...obj });
      return 1;


    } catch (error) {
      console.log(error);
      return 0;

    }
  }

  // getting single id
//   async single(id) {
//     try {
//       let Docs = await getDoc(doc, (db, dbPath, id));
//       return Docs.data();

//     } catch (error) {
//       console.log(error);
//     }
//   }

  // delete
//   async Delete(id) {
//     try {
//       await deleteDoc(doc(db, dbPath, id));
//       return 1;

//     } catch (error) {
//       console.log(error);

//     }

//   }

  // fetch All
//   async All() {
//     try {
//       let notesDoc = await getDocs(collection(db, dbPath))

//       let notesData = notesDoc.docs.map((el) => {
//         return { id: el.id, ...el.data() }
//       })
//       return notesData;

//     } catch (error) {
//       console.log(error);

//     }
//   }

  // update
//   async Update(Data, id) {
//     try {
//       let obj = new NotesModel();
//       obj.title = Data.title;
//       obj.description = Data.description;
//       obj.fileUrl = Data.fileUrl,
//         obj.groupId = Data.group,

//         await updateDoc(doc(db, dbPath, id), { ...obj });
//       return 1;

//     } catch (error) {
//       console.log(error);

//     }
//   }

}
export default new MeetingServices;