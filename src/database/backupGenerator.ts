import { xenoDB } from "../firebase/config";
import { collection, getDocs, query } from "firebase/firestore";

const generateBackup = async () => {
    const collectionRef = query(collection( xenoDB, `registers` ));
    const data = await getDocs(collectionRef);
    const docs = data.docs;

    let string = '';

    docs.forEach(doc => {
    string += JSON.stringify({date: doc.id, data: doc.data()});
    });

    console.log(string);
}

export default generateBackup;