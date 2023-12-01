import { IonIcon } from '@ionic/react'
import { arrowBack } from 'ionicons/icons'
import { useNavigate } from 'react-router-dom'

export const BackButton = () => {

    const navigate = useNavigate()

  return (
    <div className='back-button' onClick={() => {navigate('/')}}>
        <IonIcon icon={arrowBack}/>
    </div>
  )
}
