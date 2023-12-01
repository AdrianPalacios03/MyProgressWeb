import { IonIcon } from '@ionic/react'
import { checkmarkSharp, rocketOutline, saveOutline } from 'ionicons/icons'

interface Props {
  title?: string,
  onClick: () => void,
  isSaving: boolean,
  isSaveButton?: boolean
}

export const SaveButton = ({title, onClick, isSaving, isSaveButton}: Props) => {
  return (
    <button className={'save-button'} onClick={isSaving ? () => {} : onClick} disabled={isSaving}>
        <div className="check-icon">
          {
            isSaveButton ?
              isSaving
              ? <IonIcon icon={checkmarkSharp}/>
              : <IonIcon icon={saveOutline}/>
            : <IonIcon icon={rocketOutline}/>
          }
            
        </div>
        {title || 'Guardar'}
    </button>
  )
}
