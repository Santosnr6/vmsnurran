import { api } from "@vmsnurran/api";

export const getMyPredictions = async () => {
    const { data } = await api.get("/predictions/me");
    return data;
};

export const createPrediction = async (prediction) => {
    const { data } = await api.post("/predictions", prediction);
    return data;
};