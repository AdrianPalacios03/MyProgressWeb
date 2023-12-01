import '../theme/App.css'
import { usePomodoro } from '../hooks/usePomodoro';
import { PomodoroTimer } from '../components/PomodoroTimer';
import { EditPomodoroTimes } from '../components/EditPomodoroTimes';
import { useEffect } from 'react';

export const Pomodoro = () => {

        
    useEffect(() => {
        document.title = 'Pomodoro';
    }, []);


    const workDefTime = localStorage.getItem('work_def_time') || localStorage.setItem('work_def_time', '50')
    const restDefTime = localStorage.getItem('rest_def_time') || localStorage.setItem('rest_def_time', '10')

    const { 
        breakLength,
        sessionLength,
        timeLeft, 
        mode, 
        toggleIsActive, 
        isActive, 
        restCount, 
        setBreakLength, 
        setSessionLength, 
        reset 
    } = usePomodoro({ defBreakLength: parseInt(restDefTime!) / 60, defSessionLength: parseInt(workDefTime!) / 60});

    return (
        <div className='pomodoro'>
            <div className="window-dragger"/>
            <PomodoroTimer time={timeLeft} mode={mode} onclick={toggleIsActive} isActive={isActive}/>
            <p id='rests-label'>Rests: {restCount}</p>

            <EditPomodoroTimes 
                setRestTime={setBreakLength} 
                setWorkTime={setSessionLength} 
                breakTime={breakLength} 
                workTime={sessionLength}
            />
            <p id="reset-label" className='save-button' onClick={reset}>Reset</p>
        </div>
    )
}