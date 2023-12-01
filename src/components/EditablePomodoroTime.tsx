interface EditablePomodoroTimeProps {
    title: string;
    time: number;
    setTime: (time: number) => void;
}

export const EditablePomodoroTime = ({ title, time, setTime }: EditablePomodoroTimeProps) => {

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        if (value < 1) return;
        setTime(value * 60);

        localStorage.setItem(title === 'Work:' ? 'work_def_time' : 'rest_def_time', (value * 60).toString());
    }

    return (
        <div className="editable-pomodoro-time">
            <p>{title}</p>
            <input type="number" value={time / 60 } onChange={onInputChange}/>
        </div>
    )
}