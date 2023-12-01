import { useEffect, useState } from "react";
import monthNumberToName from "../helpers/monthNumberToName";


export const useDate = () => {
  const [currentDate, setcurrentDate] = useState('')

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = monthNumberToName(date.getMonth() + 1);
    const year = date.getFullYear();
    setcurrentDate(`${day} / ${month} / ${year}`)
  }, [])
  
  

  return {
    currentDate
  }
}