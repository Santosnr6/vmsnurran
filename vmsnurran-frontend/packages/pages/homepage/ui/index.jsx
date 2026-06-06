import './index.css';
import { Trophy } from 'lucide-react';
import { Button } from '@vmsnurran/button';
import { getLeaderboard } from '@vmsnurran/leaderboard';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LeaderboardEntry } from '@vmsnurran/leaderboardentry';

export const HomePage = () => {
    const navigate = useNavigate();

    const {
        data: leaderboardData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: getLeaderboard,
    });

    console.log('Leaderboard:', leaderboardData);
    const leaderboard = leaderboardData?.leaderboard.slice(0, 5);

    return (
        <div className="page__container">
            <Trophy className="trophy" />

            <div className="page__heading-group">
                <h1 className="page__title">VM-snurran 2026</h1>
                <h2 className="page__subtitle">
                    Tippa VM:s matcher, tävla med vänner och vinn evighetsära!
                </h2>
            </div>

            <div className="page__btn-group">
                <Button
                    text="Logga in"
                    type="solid"
                    onClick={() => navigate('/login')}
                />

                <Button
                    text="Registrera"
                    type="outlined"
                    onClick={() => navigate('/register')}
                />
            </div>

            <div className="page__leaderboard-section">
                <h3 className="page__subtitle">Topplistan</h3>

                {isLoading && <p>Laddar topplistan...</p>}

                {isError && (
                    <p>
                        {error?.response?.data?.message ||
                            'Kunde inte hämta topplistan'}
                    </p>
                )}

                <ul className="page__leaderboard">
                    {
                        leaderboard?.map((user, index) => {
                            return <LeaderboardEntry 
                                position={index + 1}
                                user={ user }
                                key={ user.userId }
                            />
                        })
                    }
                </ul>
            </div>
        </div>
    );
};