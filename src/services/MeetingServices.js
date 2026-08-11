import { addDoc, collection, deleteDoc, getDocs, doc, getDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { MeetingModel } from "../model/MeetingModel";

const dbPath = 'meeting';
class MeetingServices {
  async Add(Data) {
    try {
      let obj = new MeetingModel();
      obj.title = Data.title || "Group Meeting";
      obj.description = Data.description || "";
      obj.meetingLink = Data.link;
      obj.meetingDate = Data.date;
      obj.meetingTime = Data.time;
      obj.groupId = Data.group;
      await addDoc(collection(db, dbPath), { ...obj });
      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  // fetch All
  async All() {
    try {
      let docsSnap = await getDocs(collection(db, dbPath));
      let meetingData = docsSnap.docs.map((el) => {
        return { id: el.id, ...el.data() };
      });
      return meetingData;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // fetch by Group ID
  async getByGroup(groupId) {
    try {
      const q = query(collection(db, dbPath), where("groupId", "==", groupId));
      let docsSnap = await getDocs(q);
      let meetingData = docsSnap.docs.map((el) => {
        return { id: el.id, ...el.data() };
      });
      return meetingData;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // delete
  async Delete(id) {
    try {
      await deleteDoc(doc(db, dbPath, id));
      return 1;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
}

export default new MeetingServices();