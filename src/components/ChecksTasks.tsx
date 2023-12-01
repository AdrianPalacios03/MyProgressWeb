import { CheckBox } from './CheckBox'

interface Props {
    title: string,
    defChecked: boolean,
    onChange: () => void
}

export const ChecksTasks = ({title, onChange, defChecked}: Props) => {
    return (
        <div className='check' style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
            <CheckBox 
                value={defChecked}
                onChange={onChange}
            />
            <label htmlFor="checkbox">{title}</label>
        </div>
    )
}
