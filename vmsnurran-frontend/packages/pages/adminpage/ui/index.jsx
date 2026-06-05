import './index.css';
import { useQuery } from '@tanstack/react-query';
import { getGames } from '@vmsnurran/games';
import { GameCardForm } from '@vmsnurran/gamecardform';

export const AdminPage = () => {
    const {
        data: gamesData,
        isLoading: isLoadingGames,
        isError: isGamesError,
        error: gamesError,
    } = useQuery({
        queryKey: ['games'],
        queryFn: getGames,
    });

    if (isLoadingGames) {
        return <p>Laddar ditt tips...</p>;
    }

    if (isGamesError) {
        return (
            <p>
                {myScoreError?.response?.data?.message ||
                    teamsError?.response?.data?.message ||
                    gamesError?.response?.data?.message ||
                    'Kunde inte hämta ditt tips'}
            </p>
        );
    }

    const games = gamesData?.games || [];
    const sortedGames = [...games].sort((a, b) => {
        const dateA = new Date(a.kickoff).getTime();
        const dateB = new Date(b.kickoff).getTime();

        return dateA - dateB;
    });

    return (
        <div className="page__container">
            {
                sortedGames.map(game => {
                    return <GameCardForm
                        game={ game }
                        key={ game.gameNumber }
                    />
                })
            }
        </div>
    )
}