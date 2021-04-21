import { allBikesMock } from "../../mock_data/bikes/allBikes";
import { Bike } from "../../models/bike"
import { bikes } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const getAllBikes = async (): Promise<IApiResponse<Bike[]>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
    {
        return allBikesMock();
    }        

    const url = process.env.REACT_APP_BACKEND_URL + bikes;
    type T = IApiResponse<Bike[]>;
    return fetch(url, {
        method: "GET",        
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}
