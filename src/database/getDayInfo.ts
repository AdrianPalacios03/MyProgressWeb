import { doc, getDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";
import { dbDateParser } from "../helpers/dbDateParser";

export const getDayInfo = async (taskDate: Date) => {
    const collectionRef = doc( FirebaseDB, `registers/${dbDateParser(taskDate)}` ) 
    const data = await getDoc(collectionRef);
    return data.data()
}
