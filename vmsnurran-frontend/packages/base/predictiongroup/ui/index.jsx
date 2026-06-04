import './index.css';

export const PredictionGroup = ({ group, games }) => {
    const [open, setOpen] = useState(false);

    return (
        <section className="group">
            <button
                className="group__header"
                onClick={() =>
                    setOpen(!open)
                }
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
                            ? "group__icon group__icon--open"
                            : "group__icon"
                    }
                >
                    ▼
                </span>
            </button>

            {open && (
                <div className="group__content">
                    Hejsan! Här kommer matcherna för grupp {group}. För varje match, klicka på den för att göra ditt tips!
                    {/* {games.map((game) => (
                        <GameCard
                            key={game.gameNumber}
                            game={game}
                        />
                    ))} */}
                </div>
            )}
        </section>
    )
}