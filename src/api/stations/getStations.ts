import {handleError, handleResponse, IApiResponse} from "../apiUtils";
import {Station} from "../../models/station";
import {stations} from "../apiUrls";
import {getToken} from "../login/token";

export const getAllStations = async (): Promise<IApiResponse<Station[]>> => {
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