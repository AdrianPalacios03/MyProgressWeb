import { doc, setDoc,  } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"
import { dbDateParser } from "../helpers/dbDateParser"

export const setDayInfo = async (taskDate: Date, checkedFields: Object) => {
    const newDoc = doc(  FirebaseDB, `registers/day/${dbDateParser(taskDate)}/data` )
    await setDoc( newDoc, checkedFields )
}