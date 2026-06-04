import './index.css';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div className="app">
            <main className="page">
                <div className="wrapper">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}