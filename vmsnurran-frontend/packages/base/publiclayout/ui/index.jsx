import { useAuthStore } from "@vmsnurran/authstore";
import { Navigate, Outlet } from "react-router-dom";
import { isTokenExpired } from "@vmsnurran/jwt";
import { useEffect } from "react";

export function PublicOnlyRoute() {
    const { token, logout } = useAuthStore();

    const hasValidToken = token && !isTokenExpired(token);
    const hasExpiredToken = token && isTokenExpired(token);

    useEffect(() => {
        if (hasExpiredToken) {
            logout();
        }
    }, [hasExpiredToken, logout]);

    if (hasValidToken) {
        return <Navigate to="/me" replace />;
    }

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