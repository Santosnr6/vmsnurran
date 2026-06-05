import './index.css';
import { getLeaderboard } from '@vmsnurran/leaderboard';
import { LeaderboardEntry } from '@vmsnurran/leaderboardentry';
import { useQuery } from '@tanstack/react-query';
import { Trophy } from 'lucide-react';

export const LeaderboardPage = () => {
    const {
        data: leaderboardData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: getLeaderboard,
    });

    return (
        <div className="page__container">

            <div className="page__leaderboard-section">
                <h1 className="page__title">Topplistan</h1>

                <Trophy className="trophy" />

                {isLoading && <p>Laddar topplistan...</p>}

                {isError && (
                    <p>
                        {error?.response?.data?.message ||
                            'Kunde inte hämta topplistan'}
                    </p>
                )}

                <h2 className="page__subtitle">Klicka på en användare för mer info!</h2>

                <ul className="page__leaderboard">
                    {
                        leaderboardData?.leaderboard.map((user, index) => {
                            return <LeaderboardEntry 
                            position={index + 1}
                            user={ user }
                            />
                        })
                    }
                </ul>
            </div>
        </div>
    )
}