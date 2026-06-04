import { api } from "@vmsnurran/api";

export const getMyPredictions = async () => {
    const { data } = await api.get("/predictions/me");
    return data;
};