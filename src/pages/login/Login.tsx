import { useEffect, useState } from 'react'
import './styles/login.css'
import { getPasswordValue } from '../../database/getPasswordValue'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { logIn } from '../../store/slices/auth/authSlice'

export const Login = () => {

    const [passwordValue, setPasswordValue] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        const password = localStorage.getItem('password')
        if (password) onLogin(password)
    }, [])

    const onLogin = async (password?: string) => {
        const passwordString = password ? password : passwordValue;
        if (passwordString === await getPasswordValue().then((data: any) => {return data?.password})) {
            dispatch(logIn(true));
            localStorage.setItem('password', passwordString)
        } else {
            alert(`Wrong Password`)
        }
    }
    return (
        <div className='login-page'>
            <div className="form-container">
                <h1>MyProgress</h1>
                <input type="password" placeholder="Password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
                <button className='gradient-button' color='white' onClick={() => onLogin()}>Login</button>
            </div>
        </div>
    )
}