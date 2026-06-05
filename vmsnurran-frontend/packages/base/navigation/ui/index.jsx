import './index.css';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@vmsnurran/authstore';

export const Navigation = () => {
    const { logout, role } = useAuthStore();
    const handleLogout = () => {
        logout();
    }

    console.log(role);

    return (
        <nav className="nav">
            {
                role === 'admin'
                ? <Link className="nav__link" to="/admin">Admin</Link>
                : <Link className="nav__link" to="/me">Mitt tips</Link>
            }
            <Link className="nav__link" to="/leaderboard">Topplistan</Link>
            <p 
                className="nav__link"
                onClick={ handleLogout }
            >Logga ut</p>
        </nav>
    )
}