import{ useEffect, useState } from 'react'

interface Props {
    defBreakLength: number;
    defSessionLength: number;
}

export const usePomodoro = ({ defBreakLength, defSessionLength }: Props) => {
    const [ breakLength, setBreakLength ] = useState(defBreakLength * 60);
    const [ sessionLength, setSessionLength ] = useState(defSessionLength * 60);
    const [ restCount, setRestCount ] = useState(0)
    const [ mode, setMode ] = useState("work");
    const [ timeLeft, setTimeLeft ] = useState<number>();
    const [ isActive, setIsActive ] = useState(false);
    const [ timeSpent, setTimeSpent ] = useState(0);

    useEffect(() => {
        setTimeLeft(mode == "work" ? sessionLength * 1000 : breakLength * 1000);
    }, [sessionLength, breakLength]);
    
    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft! > 1) {
            setTimeLeft(
            mode == "work"
                ? sessionLength * 1000 - timeSpent
                : breakLength * 1000 - timeSpent
            );

            interval = setInterval(() => {
                setTimeSpent((timeSpent) => timeSpent + 1000);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        if (timeLeft === 0) {
            setTimeSpent(0);
            if (mode == "rest") 
                setRestCount((restCount) => restCount + 1)

            setMode((mode) => (mode == "work" ? "rest" : "work"));
            sendNotification(mode == "work" ? "rest" : "work")
            
            setTimeLeft(
                mode == "work" ? sessionLength * 1000 : breakLength * 1000
            );
        }
        return () => clearInterval(interval);

    }, [isActive, timeSpent]);

    const toggleIsActive = () => {
        setIsActive(!isActive);
    }

    const reset = () =>{
        setBreakLength(breakLength);
        setSessionLength(sessionLength);
        setTimeLeft(mode == "work" ? sessionLength * 1000 : breakLength * 1000);

        if (isActive) {
            setIsActive(false);
            setTimeSpent(0);
        }
    }

    const sendNotification = (mode: string) => {
        setIsActive(false);
        const notification = new Notification('Pomodoro', {
            body: 'Time to ' + mode + '!'
        })
        notification.onclick = () => {
            window.focus()
            notification.close()
        }
    }


    return {
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
    }
}
