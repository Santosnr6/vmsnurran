import './index.css';
import { Button } from '@vmsnurran/button';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '@vmsnurran/auth';
import { useAuthStore } from '@vmsnurran/authstore'; 
import { useRef, useState } from 'react';
import { validateLoginInput } from '@vmsnurran/validation';

export const LoginForm = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const { setAuth } = useAuthStore();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        const result = validateLoginInput({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        });

        if (!result.success) {
            setErrorMsg(result.error.issues[0].message);
            return;
        }

        setErrorMsg('');

        loginMutation.mutate({
            username : usernameRef.current.value,
            password : passwordRef.current.value
        });
    }

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setAuth({
                user: usernameRef.current.value,
                token: data.token,
                role: data.role
            });
            if(data.role === 'admin') navigate('/admin');
            else navigate("/me");
        },
        onError: (error) => {
            console.log(error);
            setErrorMsg(
                'Felaktigt användarnamn eller lösenord'
            );
        }
    });

    return (
        <form className="form">
            <label className="form__label">
                Användarnamn:
                <input 
                    type="text" 
                    className="form__input"
                    placeholder="jespernyberg"
                    ref={ usernameRef }
                />
            </label>
            <label className="form__label">
                Lösenord:
                <input 
                    ref={ passwordRef }
                    type="password" 
                    className="form__input" 
                    placeholder="********"
                />
            </label>
            {
                errorMsg && <p className="form__error">{ errorMsg }</p>
            }
            <Button 
                text="Logga in"
                type="solid"
                onClick={ handleLogin }
            />
            <p className="form__text">
                Inget konto? <Link className="form__link" to="/register">Registrera dig här!</Link>
            </p>
        </form>
    )
}