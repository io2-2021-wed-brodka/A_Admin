import {handleError, handleResponse, IApiResponse} from "../apiUtils";
import {Station} from "../../models/station";
import {stations} from "../apiUrls";
import {getToken} from "../login/token";
import {allStationsMock} from "../../mock_data/stations/allStations";

export const getAllStations = async (): Promise<IApiResponse<Station[]>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined) {
        return allStationsMock();
    }

    const url = process.env.REACT_APP_BACKEND_URL + stations;
    type T = IApiResponse<Station[]>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}
