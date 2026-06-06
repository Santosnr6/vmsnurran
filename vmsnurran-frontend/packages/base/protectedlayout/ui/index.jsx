import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@vmsnurran/authstore";
import { Navigation } from '@vmsnurran/navigation';
import { isTokenExpired } from "@vmsnurran/jwt";
import { useEffect } from "react";

export function ProtectedRoute() {
    const { token, logout } = useAuthStore();

    const invalidToken = !token || isTokenExpired(token);

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            logout();
        }
    }, [token, logout]);

    if (invalidToken) {
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