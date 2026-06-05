import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@vmsnurran/layout";
import { HomePage } from "@vmsnurran/homepage";
import { RegisterPage } from "@vmsnurran/registerpage";
import { LoginPage } from "@vmsnurran/loginpage";
import { LeaderboardPage } from "@vmsnurran/leaderboardpage";
import { AdminPage } from '@vmsnurran/adminpage';
import { MyPage } from "@vmsnurran/mypage";
import { PublicOnlyRoute } from "@vmsnurran/publiclayout";
import { ProtectedRoute } from "@vmsnurran/protectedlayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicOnlyRoute />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            { path: "/me", element: <MyPage /> },
            { path: "/admin", element: <AdminPage /> },
            { path: "/leaderboard", element: <LeaderboardPage /> },
        ],
    },
])