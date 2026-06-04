import './index.css';
import { useQuery } from '@tanstack/react-query';
import { getMyPredictions } from '@vmsnurran/predictions';
import { useAuthStore } from '@vmsnurran/authstore';
import { useEffect } from 'react';
import { PredictionView } from '@vmsnurran/predictionview';
import { MyPredictionView } from '@vmsnurran/mypredictionview';

export const MyPage = () => {
    const { token } = useAuthStore();
    const { data: predictions, isLoading, isError, error } = useQuery({
        queryKey: ['my-predictions'],
        queryFn: getMyPredictions,
        enabled: !!token,
    });
    useEffect(() => {
        console.log(predictions?.prediction);
    }, [predictions]); 

    if (isLoading) {
        return <p>Laddar ditt tips...</p>;
    }

    if (isError) {
        return (
            <p>
                {error.response?.data?.message || "Kunde inte hämta ditt tips"}
            </p>
        );
    }

    const hasPredictions =
    predictions?.prediction &&
    predictions.prediction.predictions?.length > 0;

    return (
        <div className="page__container">

            <h1 className="page__title">Mitt VM-tips</h1>

            {hasPredictions ? (
                <>
                    <MyPredictionView predictions={ predictions.prediction } />
                </>
            ) : (
                <>
                    <h2 className="page__subtitle">Gör dina VM-tips för 2026 nedan</h2>
                    <PredictionView />
                </>
            )}
        
        </div>
    );
}