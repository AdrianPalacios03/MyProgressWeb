import { AllDaysChart } from '../components/AllDaysChart'
import { BackButton } from '../components/BackButton'

export const ProgressPage = () => {

  return (
    <div className='progress-container'>
      <BackButton/>
      <AllDaysChart/>
    </div>
  )
}
