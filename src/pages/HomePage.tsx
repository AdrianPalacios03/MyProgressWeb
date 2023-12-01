import { TopDate } from '../components/TopDate';
import { ProgressChart } from '../components/ProgressChart';
import { TimeChart } from '../components/TimeChart';
import { Tasks } from '../components/Tasks';


export const HomePage = () => {




  return (
    <div className='global-margin'>
        <div className="title-date">
          <h1>Bienvenido, Adrián </h1>
          {/* <button className='save-button' onClick={openPomodoro}>
            <div className="check-icon">
              <IonIcon icon={stopwatchOutline}/>   
            </div>
            Pomodoro
          </button> */}
          <TopDate/>
        </div>
        <div className="main-info">
          <ProgressChart/>
          <Tasks/>
        </div>
        <TimeChart/>
    </div>
  )
}
