import { useEffect, useState } from 'react'
import './styles/login.css'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { logIn } from '../../store/slices/auth/authSlice'
import authUser from '../../database/authUser'

export const Login = () => {

    const [passwordValue, setPasswordValue] = useState('');
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const password = localStorage.getItem('password')
        if (password) 
            onLogin(password);
        setIsLoading(false);
    }, [])

    const onLogin = async (password?: string) => {
        const email = "adrianpalaciosarvizu@gmail.com";
        const passwordString = password ? password : passwordValue;
        const user = await authUser(email, passwordString);


        if (user) {
            dispatch(logIn(true));
            if (email && password) return;
            localStorage.setItem('password', passwordValue);
        } else {
            alert('Wrong email or password');
        }
    }

    if (isLoading) {
        return (
            <div><p>Loading...</p></div>
        )
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