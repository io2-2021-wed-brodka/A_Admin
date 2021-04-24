import {handleError, handleResponse, IApiResponse} from "../apiUtils";
import {addStationMock} from "../../mock_data/stations/addStationMock";
import {Station} from "../../models/station";
import {stations} from "../apiUrls";
import {getToken} from "../login/token";

export const addStation = async (stationName: string): Promise<IApiResponse<Station>> => {
    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
        return addStationMock();

    let url = process.env.REACT_APP_BACKEND_URL + stations;
    type T = IApiResponse<Station>;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
        body: JSON.stringify({name: stationName})
    })
        .then<T>(handleResponse)
        .catch<T>(handleError);
};