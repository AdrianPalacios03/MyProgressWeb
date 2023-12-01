import '../theme/CheckTheme.css'

export const CheckBox = ({value, onChange}: any) => (
    <div className="checkbox">
        <input type="checkbox" id="checkbox" checked={value} onChange={onChange}/>
    </div>
);
