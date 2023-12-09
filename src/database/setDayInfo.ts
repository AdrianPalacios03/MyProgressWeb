import { doc, setDoc,  } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"
import { dbDateParser } from "../helpers/dbDateParser"

export const setDayInfo = async (taskDate: Date, checkedFields: Object) => {
    const newDoc = doc(  FirebaseDB, `registers/${dbDateParser(taskDate)}` )
    await setDoc( newDoc, checkedFields )
}

export const setNewDayInfo = async (taskDate: string, checkedFields: Object) => {
    const newDoc = doc(  FirebaseDB, `registers/${taskDate}` )
    await setDoc( newDoc, checkedFields )
}