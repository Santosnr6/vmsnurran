export function calculateGamePoints(prediction, game) {
    if (game.status !== "finished") {
        return 0;
    }

    const predictedHome = prediction.homeScore;
    const predictedAway = prediction.awayScore;
    console.log('predictedHome', predictedHome);
    console.log('predictedAway', predictedAway);

    const actualHome = game.homeScore;
    const actualAway = game.awayScore;
    console.log('actualHome', actualHome);
    console.log('actualAway', actualAway);

    // Exakt resultat
    if (
        predictedHome === actualHome &&
        predictedAway === actualAway
    ) {
        return 3;
    }

    const predictedOutcome = Math.sign(
        predictedHome - predictedAway
    );

    const actualOutcome = Math.sign(
        actualHome - actualAway
    );

    // Rätt vinnare/oavgjort
    if (predictedOutcome === actualOutcome) {
        return 1;
    }

    return 0;
}