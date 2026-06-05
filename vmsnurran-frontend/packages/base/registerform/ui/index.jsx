import './index.css';
import { Button } from '@vmsnurran/button';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { register } from '@vmsnurran/auth';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { validateRegisterInput } from '@vmsnurran/validation';

export const RegisterForm = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordRepeatRef = useRef();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const result = validateRegisterInput({
            firstName: firstnameRef.current.value,
            lastName: lastnameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        });

        if (!result.success) {
            setErrorMsg(result.error.issues[0].message);
            return;
        }

        if (passwordRef.current.value !== passwordRepeatRef.current.value) {
            setErrorMsg('Lösenorden matchar inte');
            return;
        }

        registerMutation.mutate({
            firstName : firstnameRef.current.value,
            lastName : lastnameRef.current.value,
            username : usernameRef.current.value,
            password : passwordRef.current.value
        });
    }

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            navigate('/login');
        },
        onError: (error) => {
            console.log(error);
            setErrorMsg(
                'Kunde inte registrera'
            );
        }
    });

    return (
        <form className="form">
            <label className="form__label">
                Förnamn:
                <input 
                    type="text" 
                    className="form__input"
                    placeholder="Jesper"
                    ref={ firstnameRef }
                />
            </label>
            <label className="form__label">
                Efternamn:
                <input 
                    type="text" 
                    className="form__input"
                    placeholder="Nyberg"
                    ref={ lastnameRef }
                />
            </label>
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
                    type="password" 
                    className="form__input" 
                    placeholder="********"
                    ref={ passwordRef }
                />
            </label>
            <label className="form__label">
                Bekräfta lösenord:
                <input 
                    type="password" 
                    className="form__input" 
                    placeholder="********"
                    ref={ passwordRepeatRef }
                />
            </label>
            {
                errorMsg && <p className="form__error">{ errorMsg }</p>
            }
            <Button 
                text="Registrera"
                type="solid"
                onClick={ handleRegister }
            />
            <p className="form__text">
                Har du redan ett konto? <Link className="form__link" to="/login">Logga in här!</Link>
            </p>
        </form>
    )
}