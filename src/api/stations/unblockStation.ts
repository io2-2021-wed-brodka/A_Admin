import {handleError, handleResponse, IApiResponse} from "../apiUtils";
import {Http2ServerResponse} from "http2";
import {unblockStationMock} from "../../mock_data/stations/unblockStationMock";
import {getToken} from "../login/token";
import {stations} from "../apiUrls";

export const unblockStation = async (stationId: string): Promise<IApiResponse<Http2ServerResponse>> => {
    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
        return unblockStationMock();

    let url = process.env.REACT_APP_BACKEND_URL + `${stations}/blocked/${stationId}`;
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "DELETE",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    })
        .then<T>(handleResponse)
        .catch<T>(handleError);
}