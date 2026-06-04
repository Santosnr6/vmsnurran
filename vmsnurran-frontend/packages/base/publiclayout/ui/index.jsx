import { useAuthStore } from "@vmsnurran/authstore";
import { Navigate, Outlet } from "react-router-dom";

export function PublicOnlyRoute() {
    const { token } = useAuthStore();

    if (token) {
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