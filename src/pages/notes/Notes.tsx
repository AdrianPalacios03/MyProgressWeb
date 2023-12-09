import { useEffect, useState } from "react"
import { BackButton } from "../../components/BackButton"
import fetchNotes from "../../database/fetchNotes";
import { Feeling } from "../../components/Feeling";
import './styles/notes.css'

export interface FeelingsData {
    date: string;
    text: string;
}

export const Notes = () => {

    const [feelingsData, setFeelingsData] = useState<FeelingsData[]>([]);

    const fetchFeelings = async () => {
        const notes = await fetchNotes();
        setFeelingsData(notes!);
        console.log('!')
    }

    useEffect(() => {
        fetchFeelings();
    }, [])
    

    return (
        <div className="notes-container">
            <BackButton/>

            <h1>Notas</h1>
            
            <div>
                {
                    feelingsData.length > 0
                     &&
                    feelingsData.map(date => (
                        <Feeling key={date.date} date={date.date} text={date.text}/>
                    ))
                }
            </div>

        </div>
    )
}