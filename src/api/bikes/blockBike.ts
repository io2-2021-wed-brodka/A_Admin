import {handleError, handleResponse, IApiResponse} from "../apiUtils";
import {getToken} from "../login/token";
import {bikes} from "../apiUrls";
import { blockBikeMock } from "../../mock_data/bikes/blockBikeMock";
import { Bike } from "../../models/bike";

export const blockBike = async (stationId: string): Promise<IApiResponse<Bike>> => {
    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
        return blockBikeMock(stationId);

    let url = process.env.REACT_APP_BACKEND_URL + `${bikes}/blocked/`;
    type T = IApiResponse<Bike>;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
        body: JSON.stringify({id: stationId})
    })
        .then<T>(handleResponse)
        .catch<T>(handleError);
};