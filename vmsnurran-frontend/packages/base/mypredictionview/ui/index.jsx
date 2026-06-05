import './index.css';
import { getMyScore } from '@vmsnurran/leaderboard';
import { getTeams } from '@vmsnurran/teams';
import { getGames } from '@vmsnurran/games';
import { MyPredictionGroup } from '@vmsnurran/mypredictiongroup';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const MyPredictionView = ({ predictions }) => {
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    const {
        data: myScoreData,
        isLoading: isLoadingMyScore,
        isError: isMyScoreError,
        error: myScoreError,
    } = useQuery({
        queryKey: ['my-score'],
        queryFn: getMyScore,
    });

    const {
        data: teamsData,
        isLoading: isLoadingTeams,
        isError: isTeamsError,
        error: teamsError,
    } = useQuery({
        queryKey: ['teams'],
        queryFn: getTeams,
    });

    const {
        data: gamesData,
        isLoading: isLoadingGames,
        isError: isGamesError,
        error: gamesError,
    } = useQuery({
        queryKey: ['games'],
        queryFn: getGames,
    });

    useEffect(() => {
        console.log('Predictions:', predictions);
    }, [predictions]);

    useEffect(() => {
        console.log('My Score:', myScoreData);
        console.log('Teams:', teamsData);
        console.log('Games:', gamesData);
    }, [myScoreData, teamsData, gamesData]);

    if (isLoadingMyScore || isLoadingTeams || isLoadingGames) {
        return <p>Laddar ditt tips...</p>;
    }

    if (isMyScoreError || isTeamsError || isGamesError) {
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

    const teams = [...(teamsData?.teams || [])].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    const sortedGames = [...games].sort(
        (a, b) => a.gameNumber - b.gameNumber
    );

    const gamesByGroup = sortedGames.reduce((acc, game) => {
        if (!acc[game.group]) {
            acc[game.group] = [];
        }

        acc[game.group].push(game);

        return acc;
    }, {});

    return (
        <>
            <section className="my-score">
                <h2 className="my-score__title">
                    Min totala poäng: {myScoreData.totalPoints}
                </h2>
                <h2 className="my-score__title">
                    Antal korrekta resultat (3 poäng): {myScoreData.correctResults}
                </h2>
                <h2 className="my-score__title">
                    Antal korrekta 1X2 (1 poäng): {myScoreData.correctOutcomes}
                </h2>
            </section>

            <section className="my-bonus">
                <h2 className="my-bonus__title">Mina bonusgissningar</h2>
                <p className="my-bonus__guess">
                    Vinnare av VM: {predictions.worldCupWinner}
                </p>
                <p className="my-bonus__guess">
                    Skytteligasegrare: {predictions.topGoalScorer}
                </p>
                <p className="my-bonus__guess">
                    Totalt antal mål: {predictions.totalGoals}
                </p>
            </section>

            <section className="my-groups">
                {
                    groups.map(group => {
                        return <MyPredictionGroup
                            group={ group }
                            games={ gamesByGroup[group] }
                            key={ group }
                            predictions={ predictions }
                        />
                    })
                }
            </section>
        </>
    );
};