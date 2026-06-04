import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@vmsnurran/authstore";

export function ProtectedRoute() {
    const { token } = useAuthStore();

    if (!token) {
        return <Navigate to="/login" replace />;
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