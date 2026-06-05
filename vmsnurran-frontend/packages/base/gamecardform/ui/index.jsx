import './index.css';
import { Button } from '@vmsnurran/button';
import { useMutation } from '@tanstack/react-query';
import { setGameScore } from '@vmsnurran/games';

export const GameCardForm = ({ game }) => {
    const { mutate, isPending } = useMutation({
        mutationFn: ({ gameId, score }) =>
            setGameScore(gameId, score),

        onSuccess: () => {
            console.log('Resultat sparat!');
        },

        onError: (error) => {
            console.log(error);
            console.log(
                error?.response?.data?.message ||
                'Kunde inte spara resultat'
            );
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const score = {
            homeScore: Number(
                formData.get('homeScore')
            ),
            awayScore: Number(
                formData.get('awayScore')
            ),
        };
        console.log('Score:', score);
        

        mutate({
            gameId: game.gameNumber,
            score,
        });
    };

    return (
        <form
            className="game-card-form"
            onSubmit={handleSubmit}
        >
            <label className="game-card-form__label">
                {game.homeTeam}

                <input
                    type="number"
                    name="homeScore"
                    min="0"
                    className="game-card-form__input"
                    defaultValue={
                        game.homeScore ?? ''
                    }
                    required
                />
            </label>

            -

            <label className="game-card-form__label">
                <input
                    type="number"
                    name="awayScore"
                    min="0"
                    className="game-card-form__input"
                    defaultValue={
                        game.awayScore ?? ''
                    }
                    required
                />

                {game.awayTeam}
            </label>

            <Button
                text={
                    isPending
                        ? 'Sparar...'
                        : 'Spara'
                }
                type="solid"
                buttonType="submit"
            />
        </form>
    );
};