import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { PredictionGroup } from '@vmsnurran/predictiongroup';
import { getGames } from '@vmsnurran/games';
import { getTeams } from '@vmsnurran/teams';
import './index.css';
import { Button } from '@vmsnurran/button';
import { createPrediction } from '@vmsnurran/predictions';

export const PredictionView = () => {
    const queryClient = useQueryClient();
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    const {
        data: gamesData,
        isLoading: isLoadingGames,
        isError: isGamesError,
        error: gamesError,
    } = useQuery({
        queryKey: ['games'],
        queryFn: getGames,
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

    const createPredictionMutation = useMutation({
        mutationFn: createPrediction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['my-predictions'],
            });
        },
    });

    if (isLoadingGames || isLoadingTeams) {
        return <p>Laddar...</p>;
    }

    if (isGamesError || isTeamsError) {
        return (
            <p>
                {gamesError?.response?.data?.message ||
                    teamsError?.response?.data?.message ||
                    'Kunde inte hämta data'}
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

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const predictions = sortedGames.map((game) => {
            const homeScore = formData.get(`game-${game.gameNumber}-homeScore`);
            const awayScore = formData.get(`game-${game.gameNumber}-awayScore`);

            return {
                gameId: game.gameNumber.toString(),
                homeScore: Number(homeScore),
                awayScore: Number(awayScore),
            };
        });

        const worldCupWinner = formData.get('worldCupWinner');
        const topGoalScorer = formData.get('topGoalScorer');
        const totalGoals = formData.get('totalGoals');

        const hasMissingGamePrediction = predictions.some((prediction) =>
            Number.isNaN(prediction.homeScore) ||
            Number.isNaN(prediction.awayScore)
        );

        if (
            hasMissingGamePrediction ||
            !worldCupWinner ||
            !topGoalScorer ||
            totalGoals === ''
        ) {
            console.log('Du måste fylla i alla matcher och alla bonustips');
            return;
        }

        const predictionPayload = {
            predictions,
            worldCupWinner,
            topGoalScorer,
            totalGoals: Number(totalGoals),
        };

        createPredictionMutation.mutate(predictionPayload);
    };

    return (
        <form className="prediction-form" onSubmit={handleSubmit}>
            <ul className="groups">
                {groups.map((group) => (
                    <PredictionGroup
                        key={group}
                        group={group}
                        games={gamesByGroup[group] || []}
                    />
                ))}
            </ul>

            <section className="form">
                <h3 className="form__title">Bonustips!</h3>

                <label className="form__label">
                    VM-vinnare (5 poäng):
                    <select
                        name="worldCupWinner"
                        id="worldCupWinner"
                        className="form__select"
                        defaultValue=""
                        required
                    >
                        <option value="" disabled>
                            Välj VM-vinnare
                        </option>

                        {teams.map((team) => (
                            <option key={team.code} value={team.name}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="form__label">
                    Skyttekung (5 poäng):
                    <input
                        type="text"
                        name="topGoalScorer"
                        className="form__input"
                        placeholder="Gyökeres"
                        required
                    />
                </label>

                <label className="form__label">
                    Totalt antal mål +/- 5 mål (5 poäng):
                    <input
                        type="number"
                        name="totalGoals"
                        className="form__input"
                        placeholder="150"
                        min="0"
                        required
                    />
                </label>
            </section>

            {createPredictionMutation.isError && (
                <p>
                    {createPredictionMutation.error?.response?.data?.message ||
                        'Kunde inte spara tipset'}
                </p>
            )}

            {createPredictionMutation.isSuccess && (
                <p>Tipset är sparat!</p>
            )}

            <Button
                text={
                    createPredictionMutation.isPending
                        ? 'Sparar...'
                        : 'Spara tips'
                }
                type="solid"
                buttonType="submit"
                disabled={createPredictionMutation.isPending}
            />
        </form>
    );
};