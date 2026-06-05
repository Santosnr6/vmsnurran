import { useEffect, useState } from 'react';
import './index.css';
import { useQuery } from '@tanstack/react-query';
import { getTeam } from '@vmsnurran/teams';
import { Gamepad } from 'lucide-react';

export const StaticGameCard = ({ game, prediction }) => {
    const [date, setDate] = useState(new Date());

    const { data: homeTeam, isLoading: homeLoading } = useQuery({
        queryKey: ['team', game.homeTeam],
        queryFn: () => getTeam(game.homeTeam),
    });

    const { data: awayTeam, isLoading: awayLoading } = useQuery({
        queryKey: ['team', game.awayTeam],
        queryFn: () => getTeam(game.awayTeam),
    });

    useEffect(() => {
        setDate(new Date(game.kickoff));
    }, [game]);

    const evaluatePrediction = () => {
        if (!prediction) {
            return {
                className: 'game__result--pending',
                points: '-',
            };
        }

        if (game.status !== 'finished') {
            return {
                className: 'game__result--pending',
                points: '-',
            };
        }

        const exactResult =
            prediction.homeScore === game.homeScore &&
            prediction.awayScore === game.awayScore;

        if (exactResult) {
            return {
                className: 'game__result--correct',
                points: 3,
            };
        }

        const predictedOutcome =
            prediction.homeScore > prediction.awayScore
                ? 'HOME'
                : prediction.homeScore < prediction.awayScore
                  ? 'AWAY'
                  : 'DRAW';

        const actualOutcome =
            game.homeScore > game.awayScore
                ? 'HOME'
                : game.homeScore < game.awayScore
                  ? 'AWAY'
                  : 'DRAW';

        if (predictedOutcome === actualOutcome) {
            return {
                className: 'game__result--outcome',
                points: 1,
            };
        }

        return {
            className: 'game__result--wrong',
            points: 0,
        };
    };

    const result = evaluatePrediction();

    return (
        <article className="game">
            <div className="game__top">
                <h3 className="game__title">
                    Omgång {game.groupMatchday}
                </h3>

                <h3 className="game__title">
                    {date.toLocaleDateString('sv-SE', {
                        day: 'numeric',
                        month: 'short',
                    })}
                </h3>

                <h3 className="game__title">
                    Kl:{' '}
                    {date.toLocaleTimeString('sv-SE', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </h3>

                <h3 className="game__status">
                    {game.status === 'scheduled'
                        ? 'Ej spelad'
                        : 'Slutförd'}
                </h3>
            </div>

            <div className="game__middle">
                {!homeLoading && !awayLoading && homeTeam && awayTeam ? (
                    <>
                        <p className="game__team">
                            {homeTeam.team.name}
                        </p>

                        <span>-</span>

                        <p className="game__team">
                            {awayTeam.team.name}
                        </p>
                    </>
                ) : null}
            </div>

            <div className="game__bottom">
                <img src={`https://flagcdn.com/${homeTeam?.team.flag.toLowerCase()}.svg`} alt="" className="game__flag" />

                <p className={`game__result ${result.className}`}>
                    {game?.homeScore ?? '-'}
                </p>

                <span>-</span>

                <p className={`game__result ${result.className}`}>
                    {game?.awayScore ?? '-'}
                </p>

                <img src={`https://flagcdn.com/${awayTeam?.team.flag.toLowerCase()}.svg`} alt="" className="game__flag" />
            </div>

            <div className="game__score">
                <p
                    className="game__text"
                >
                    Din gissning: {prediction ? `${prediction.homeScore} - ${prediction.awayScore}` : 'Ingen gissning'}
                </p>
                <p className="game__text">
                    Din poäng: {result.points}
                </p>
            </div>
        </article>
    );
};