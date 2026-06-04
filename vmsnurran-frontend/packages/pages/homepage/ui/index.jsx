import './index.css';
import { Trophy } from 'lucide-react';
import { Button } from '@vmsnurran/button';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="page__container">
            <Trophy className='trophy' />
            <div className="page__heading-group">
                <h1 className="page__title">VM-snurran 2026</h1>
                <h2 className="page__subtitle">Tippa VM:s matcher, tävla med vänner och vinn evighetsära!</h2>
            </div>
            <div className="page__btn-group">
                <Button 
                    text="Logga in"
                    type="solid"
                    onClick={ () => navigate('/login') }
                />
                <Button 
                    text="Registrera"
                    type="outlined"
                    onClick={ () => navigate('/register') }
                />
                </div>
        </div>
    )
}