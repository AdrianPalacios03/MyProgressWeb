import '../theme/edit-pomodoro-times.css'
import { EditablePomodoroTime } from './EditablePomodoroTime'

interface EditPomodoroTimeProps {
    breakTime: number,
    workTime: number,
    setWorkTime: (time: number) => void,
    setRestTime: (time: number) => void
}

export const EditPomodoroTimes = ({ breakTime, workTime, setWorkTime, setRestTime }: EditPomodoroTimeProps) => {
    return (
        <div className="edit-pomodoro-times">
            <EditablePomodoroTime title="Rest:" time={breakTime} setTime={setRestTime}/>
            <EditablePomodoroTime title="Work:" time={workTime} setTime={setWorkTime}/>
        </div>
    )
}