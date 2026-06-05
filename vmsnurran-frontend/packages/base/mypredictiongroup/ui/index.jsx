import './index.css';
import { useState } from 'react';
import { GameCard } from '@vmsnurran/gamecard';
import { StaticGameCard } from '@vmsnurran/staticgamecard';

export const MyPredictionGroup = ({ group, games, predictions }) => {
    const [open, setOpen] = useState(false);
    console.log(predictions.predictions);
    
    return (
        <section className={open ? 'group open' : 'group'}>
            <button
                className="group__header"
                type="button"
                onClick={() => setOpen(!open)}
            >
                <div className="group__info">
                    <span className="group__badge">
                        Grupp {group}
                    </span>

                    <span className="group__count">
                        {games.length} matcher
                    </span>
                </div>

                <span
                    className={
                        open
                            ? 'group__icon group__icon--open'
                            : 'group__icon'
                    }
                >
                    ▼
                </span>
            </button>

            <div
                className={
                    open
                        ? 'group__content'
                        : 'group__content group__content--hidden'
                }
            >
                {   
                    games.map((game) => {
                        const prediction = predictions.predictions.find(
                            (prediction) =>
                                prediction.gameId.toString() ===
                                game.gameNumber.toString()
                        );

                        return (
                            <StaticGameCard
                                key={game.gameNumber}
                                game={game}
                                prediction={prediction}
                            />
                        );
                    })
                }
            </div>
        </section>
    );
};