import { useDate } from '../hooks/useDate'

export const TopDate = () => {
    const { currentDate } = useDate();
  return (
    <h3 className='date'>{currentDate}</h3>
  )
}
