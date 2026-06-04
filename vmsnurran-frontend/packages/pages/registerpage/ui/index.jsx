import './index.css';
import { RegisterForm } from '@vmsnurran/registerform';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';

export const RegisterPage = () => {
    const navigate = useNavigate();
    return (
        <div className="page__container">
            <div className="page__trophy-container" onClick={() => navigate('/')}>
                <Trophy className="page__login-trophy" />
            </div>
            <div className="page__heading-group">
                <h1 className="page__title">Skapa konto</h1>
                <h2 className="page__subtitle">Börja tippa på VM 2026</h2>
            </div>
            <RegisterForm />
        </div>
    )
}