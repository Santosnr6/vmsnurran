import { Trophy } from 'lucide-react';
import { LoginForm } from '@vmsnurran/loginform';
import { useNavigate } from 'react-router-dom';
import './index.css';

export const LoginPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="page__container">
            <div className="page__trophy-container" onClick={() => navigate('/')}>
                <Trophy 
                    className="page__login-trophy" 
                />
            </div>
            <div className="page__heading-group">
                <h1 className="page__title">Välkommen tillbaka!</h1>
                <h2 className="page__subtitle">Logga in för att tippa!</h2>
            </div>
            <LoginForm />
        </div>
    )
}