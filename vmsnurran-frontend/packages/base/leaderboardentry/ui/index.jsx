import './index.css';

export const LeaderboardEntry = ({ position, user }) => {
    return (
        <li className="leaderboard-item">
            <span className="leaderboard-item__position">
                { position }
            </span>
            <p className="leaderboard-item__user">
                { user.name }
            </p>
            <p className="leaderboard-item__points">
                { user.totalPoints }
            </p>
        </li>
    )
}