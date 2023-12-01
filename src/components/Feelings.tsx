
import { Feeling as FI } from '../interfaces/Feeling.interface'
import { Feeling } from './Feeling'

interface Props {
    feelings: FI[]
}

export const Feelings = ({feelings}: Props) => {
  return (
    <div className='feelings-container'>
        {
            feelings.map(date => (
                <Feeling date={date.date} text={date.text}/>
            ))
        }
    </div>
  )
}
