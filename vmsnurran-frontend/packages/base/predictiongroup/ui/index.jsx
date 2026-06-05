import './index.css';
import { useState } from 'react';
import { GameCard } from '@vmsnurran/gamecard';

export const PredictionGroup = ({ group, games }) => {
    const [open, setOpen] = useState(false);

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
                {games.map((game) => (
                    <GameCard
                        key={game.gameNumber}
                        game={game}
                    />
                ))}
            </div>
        </section>
    );
};