import { IonIcon } from "@ionic/react";
import { flameOutline, sparklesOutline } from "ionicons/icons";

interface PomodoroTimerProps {
    time: number | undefined;
    mode: string;
    onclick: () => void;
    isActive: boolean;
}

export const PomodoroTimer = ({ time, mode, onclick, isActive }: PomodoroTimerProps) => {
    const min = Math.floor(time! / 1000 / 60);
    const sec = Math.floor((time! / 1000) % 60);

    return (
      <div id="timer">
        <p id="timer-label">{mode === 'work' ? <IonIcon icon={flameOutline}/> : <IonIcon icon={sparklesOutline}/> }</p>
        <p id="time-left" onClick={onclick} className={!isActive ? 'paused-pomodoro' : ''}>
          {min}:{sec.toString().length === 1 ? "0" + sec : sec}
        </p>
      </div>
    );
}