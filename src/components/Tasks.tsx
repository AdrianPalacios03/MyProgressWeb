import { IonIcon } from '@ionic/react'
import { chevronBackOutline, chevronForwardOutline, sparkles } from 'ionicons/icons'
import { ChecksTasks } from './ChecksTasks'
import { SaveButton } from './SaveButton'
import { dateToString } from '../helpers/dateToString'
import { getNextDay, getPreviousDay } from '../helpers/getPreviousDate'
import useTask from '../hooks/useTask'
import { useEffect, useState } from 'react'




export const Tasks = () => {
  

  const { taskDate, setTaskDate, checkedFields, onCheckChange, onSaveClick, isSaving } = useTask()
  const [perfectDay, setperfectDay] = useState(false)

  useEffect(() => {
    const checkedFieldsWithoutFeeling = Object.fromEntries(Object.entries(checkedFields).filter(([key]) => key !== 'feeling'))
    const allChecked = Object.values(checkedFieldsWithoutFeeling).every((value) => value === true)
    if (allChecked) {
      document.querySelector('.tasks')?.classList.add('golden')
      setperfectDay(true)
    }else {
      document.querySelector('.tasks')?.classList.remove('golden')
      setperfectDay(false)
    }
  }, [checkedFields])
  

  if (!taskDate) {
    return <>Loading</>;
  }

  return (
    <div className='tasks-container'>
        <div className='back-tasks-shadow-red'/>
        <div className='back-tasks-shadow-blue'/>
        <div className="tasks">
            <div className="tasks-header">
                <div className="arrow-icon-container">
                  <IonIcon 
                    icon={chevronBackOutline} 
                    onClick={() => {
                      if (taskDate <= new Date('2023-04-14')) return 
                      setTaskDate(getPreviousDay(taskDate))
                    }} 
                    className={taskDate  <= new Date('2023-04-14')  ? 'unable-arrow' : ''}/>
                </div>
                <h2 className='unselectable'>
                  {dateToString(taskDate)}
                  {
                    perfectDay && <IonIcon icon={sparkles} className={'special-day'}/>
                  }
                </h2>
                <div className="arrow-icon-container">
                  <IonIcon 
                    icon={chevronForwardOutline} 
                    onClick={() => {
                      if (taskDate.getDate() === new Date().getDate()) return 
                      setTaskDate(getNextDay(taskDate))
                    }}
                    className={taskDate.getDate() === new Date().getDate() ? 'unable-arrow' : ''}/>
                </div>
            </div>
            <div className="checkbox-container">
                <ChecksTasks title='Despertar temprano' defChecked={checkedFields.getUpEarly} onChange={() => onCheckChange('getUpEarly')}/>
                <ChecksTasks title='Hacer la cama' defChecked={checkedFields.bed} onChange={() => onCheckChange('bed')}/>
                <ChecksTasks title='Meditar' defChecked={checkedFields.meditate} onChange={() => onCheckChange('meditate')}/>
                <ChecksTasks title='Leer' defChecked={checkedFields.read} onChange={() => onCheckChange('read')}/>
                <ChecksTasks title='Ejercicio' defChecked={checkedFields.workout} onChange={() => onCheckChange('workout')}/>
                <ChecksTasks title='Persona' defChecked={checkedFields.study} onChange={() => onCheckChange('study')}/>
                <ChecksTasks title='Dieta' defChecked={checkedFields.diet} onChange={() => onCheckChange('diet')}/>
                <textarea placeholder='¿En qué pensaste hoy?' value={checkedFields.feeling} onChange={() => onCheckChange('feeling')}/>
                <SaveButton onClick={onSaveClick} isSaving={isSaving} isSaveButton/>
            </div>
        </div>
    </div>
  )
}
