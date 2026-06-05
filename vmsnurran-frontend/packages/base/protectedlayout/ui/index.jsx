import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@vmsnurran/authstore";
import { Navigation } from '@vmsnurran/navigation';

export function ProtectedRoute() {
    const { token } = useAuthStore();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="app">
            <main className="page">
                <div className="wrapper">
                    <Outlet />
                </div>
                <Navigation />
            </main>
        </div>
    )
}