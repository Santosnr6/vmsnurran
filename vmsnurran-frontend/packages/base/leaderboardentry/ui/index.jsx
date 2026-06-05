import './index.css';
import { useState } from 'react';

export const LeaderboardEntry = ({ position, user }) => {
    const [open, setOpen] = useState(false);

    return (
        <li className={open ? 'leaderboard-item open' : 'leaderboard-item'}>
            <button
                type="button"
                className="leaderboard-item__header"
                onClick={() => setOpen(!open)}
            >
                <span className="leaderboard-item__position">
                    {position}
                </span>

                <span className="leaderboard-item__user">
                    {user.name}
                </span>

                <span className="leaderboard-item__points">
                    {user.totalPoints} p
                </span>
            </button>

            {open && (
                <div className="leaderboard-item__content">
                    <div className="leaderboard-item__detail-container">
                        <h4 className="leaderboard-item__title">Statistik</h4>
                        <p className="leaderboard-item__detail">Totalpoäng: {user.totalPoints}</p>
                        <p className="leaderboard-item__detail">Korrekta resultat: {user.correctResults}</p>
                        <p className="leaderboard-item__detail">Korrekta 1X2: {user.correctOutcomes}</p>
                        <p className="leaderboard-item__detail">Bonuspoäng: {user.bonusPoints}</p>
                    </div>
                    <div className="leaderboard-item__detail-container">
                        <h4 className="leaderboard-item__title">Långtidare:</h4>
                        <p className="leaderboard-item__detail">VM-segrare: {user.worldCupWinner}</p>
                        <p className="leaderboard-item__detail">Skyttekung: {user.topGoalScorer}</p>
                        <p className="leaderboard-item__detail">Antal VM-mål: {user.totalGoals}</p>
                    </div>
                </div>
            )}
        </li>
    );
};