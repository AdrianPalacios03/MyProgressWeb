import { doc, getDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const getPasswordValue = async () => {
    const collectionRef = doc( FirebaseDB, `password/password` ) 
    const data = await getDoc(collectionRef);
    return data.data()
}