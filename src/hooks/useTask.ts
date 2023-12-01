import { useEffect, useState } from "react";
import { getDayInfo } from "../database/getDayInfo";
import { setDayInfo } from "../database/setDayInfo";

interface checkedFieldsProps {
    getUpEarly: boolean,
    bed: boolean,
    meditate: boolean,
    read: boolean,
    workout: boolean,
    study: boolean,
    diet: boolean,
    feeling: string
}
  

const defaultCheckedFields: checkedFieldsProps = {
    'getUpEarly': false,
    'bed': false,
    'meditate': false,
    'read': false,
    'workout': false,
    'study': false,
    'diet': false,
    'feeling': ''
  }

const useTask = () => {
    const [taskDate, setTaskDate] = useState<Date>();
    const [checkedFields, setCheckedFields] = useState(defaultCheckedFields)
    const [isSaving, setIsSaving] = useState(false)


    const getDayData = async () => {
        if (!taskDate) return
        await getDayInfo(taskDate)
        .then((data) => {
            if (data) {
                setCheckedFields(data as checkedFieldsProps) 
            }else{
                setDayInfo(taskDate, defaultCheckedFields)
                setCheckedFields(defaultCheckedFields) 
            }
        })
    }

    useEffect(() => {
        const date = new Date();
        setTaskDate(date) 
    }, [])

    useEffect(() => {
        getDayData()
    }, [taskDate])
    
    
    
    const onSaveClick = () => {
        setIsSaving(true)
        setDayInfo(taskDate!, checkedFields).then(() => {
            setIsSaving(false)
        })
    }

    const onCheckChange = (field: string) => {
        if (field === 'feeling') {
            const feeling = (document.querySelector('textarea') as HTMLTextAreaElement).value
            setCheckedFields({...checkedFields, feeling})
            return
        }
        setCheckedFields({...checkedFields, [field]: !checkedFields[field as keyof checkedFieldsProps]})
    }

    return {
        taskDate,
        setTaskDate,
        checkedFields,
        onSaveClick,
        onCheckChange,
        isSaving
    }
}

export default useTask;