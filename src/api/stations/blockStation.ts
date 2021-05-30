import {handleError, handleResponse, IApiResponse} from "../apiUtils";
import {Station} from "../../models/station";
import {blockStationMock} from "../../mock_data/stations/blockStationMock";
import {getToken} from "../login/token";
import {stations} from "../apiUrls";

export const blockStation = async (stationId: string): Promise<IApiResponse<Station>> => {
    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
        return blockStationMock(stationId);

    let url = process.env.REACT_APP_BACKEND_URL + `${stations}/blocked`;
    type T = IApiResponse<Station>;
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