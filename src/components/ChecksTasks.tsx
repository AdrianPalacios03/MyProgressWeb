import { CheckBox } from './CheckBox';
import { Tooltip } from 'react-tooltip';

interface Props {
    title: string,
    defChecked: boolean,
    onChange: () => void,
    rules: string
}

export const ChecksTasks = ({title, onChange, defChecked, rules}: Props) => {

    let tooltipId = title.split(" ").join('-') + "-anchor-element"

    return (
        <>
            <Tooltip anchorSelect={"." + tooltipId} place="top">
                {rules}
            </Tooltip>
            <div className='check' style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                <CheckBox
                    value={defChecked}
                    onChange={onChange}
                />
                <label className={tooltipId}>{title}</label>
            </div>
        </>
    )
}
