import { xenoDB } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FeelingsData } from "../pages/notes/Notes";


const fetchNotes = async () => {
    const collectionRef = query(collection( xenoDB, `registers` ), where("feeling", "not-in", [true, false, ""]));
    const data = await getDocs(collectionRef);
    let temp: FeelingsData[] = []
    for (const doc of data.docs) {
        const tempObj = {
            date: doc.id,
            text: doc.data().feeling
        }
        temp.push(tempObj)
    };
    return parseDates(sortByDate(temp))
}

const parseDates = (notes: FeelingsData[]) => {
    for (const note of notes) {
        note.date = formatDate(note.date);

        
    }
    return notes
}

// Una funcion que transforme una fecha en formato AAAA-MM-DD a formato 04 dec 21
const formatDate = (date: string) => {
    const dateArray = date.split("-")
    const year = dateArray[0]
    const month = dateArray[1]
    const day = dateArray[2]
    const monthName = getMonthName(month)
    return `${day} ${monthName} ${year}`
}

const getMonthName = (month: string) => {
    switch (month) {
        case "1":
            return "ene"
        case "2":
            return "feb"
        case "3":
            return "mar"
        case "4":
            return "abr"
        case "5":
            return "may"
        case "6":
            return "jun"
        case "7":
            return "jul"
        case "8":
            return "ago"
        case "9":
            return "sep"
        case "10":
            return "oct"
        case "11":
            return "nov"
        case "12":
            return "dic"
        default:
            return ""
    }
}

// crear una funcion para obtener los temps y ordenarlos por fecha segun su id en formato AAAAMMDD
const sortByDate = (notes: FeelingsData[]) => {

    const sortedNotes = notes.sort((a, b) => {
        if (addZero(a.date) > addZero(b.date)) {
            return 1
        } else {
            return -1
        }
    })
    return sortedNotes
}

// Una funcion que a un string como 2023-5-3 le agregue un 0 al mes y al dia si es menor a 10
const addZero = (date: string) => {
    const dateArray = date.split("-")
    const year = dateArray[0]
    const month = dateArray[1]
    const day = dateArray[2]
    const newMonth = month.length === 1 ? `0${month}` : month
    const newDay = day.length === 1 ? `0${day}` : day
    return `${year}-${newMonth}-${newDay}`
}

export default fetchNotes;