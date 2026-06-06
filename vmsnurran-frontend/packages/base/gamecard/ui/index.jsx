import { useEffect, useState } from 'react';
import './index.css';
import { useQuery } from '@tanstack/react-query';
import { getTeam } from '@vmsnurran/teams';

export const GameCard = ({game}) => {
    const [date, setDate] = useState(new Date());
    const [displayPrediction, setDisplayPrediction] = useState(true);
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

    return (
        <article className="game">
            <div className="game__top">
                <h3 className="game__title">Omgång {game.groupMatchday } </h3>
                <h3 className="game__title">{
                    date.toLocaleDateString("sv-SE", {
                        day: "numeric",
                        month: "short",
                    })
                }</h3>
                <h3 className="game__title">
                    Kl: {
                        date.toLocaleTimeString("sv-SE", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })
                    }
                </h3>
                <h3 className="game__status">
                    {
                        game.status === 'scheduled' 
                        ? 'Ej spelad'
                        : 'Slutförd'
                    }
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
                <input
                    type="number"
                    name={`game-${game.gameNumber}-homeScore`}
                    className="game__input"
                    min="0"
                    required
                    defaultValue="0"
                    />
                -
                <input
                    type="number"
                    name={`game-${game.gameNumber}-awayScore`}
                    className="game__input"
                    min="0"
                    defaultValue="0"
                    required
                />
                <img src={`https://flagcdn.com/${awayTeam?.team.flag.toLowerCase()}.svg`} alt="" className="game__flag" />
                
            </div>
        </article>
    )
}