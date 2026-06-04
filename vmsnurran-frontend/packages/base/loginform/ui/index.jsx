import './index.css';
import { Button } from '@vmsnurran/button';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '@vmsnurran/auth';
import { useAuthStore } from '@vmsnurran/authstore'; 
import { useRef } from 'react';

export const LoginForm = () => {
    const { setAuth } = useAuthStore();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        loginMutation.mutate({
            username : usernameRef.current.value,
            password : passwordRef.current.value
        });
    }

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setAuth({
                user: data.user,
                token: data.token,
            });
            navigate("/me");
        },
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
                loginMutation.isError && (
                <p>
                    Felaktigt användarnamn eller lösenord
                </p>
                )
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