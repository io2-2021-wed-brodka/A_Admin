import {handleError, handleResponse, IApiResponse} from "../apiUtils";
import {Http2ServerResponse} from "http2";
import {deleteStationMock} from "../../mock_data/stations/deleteStationMock";
import {stations} from "../apiUrls";
import {getToken} from "../login/token";

export const deleteStation = async (stationId: string): Promise<IApiResponse<Http2ServerResponse>> => {
    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
        return deleteStationMock();

    let url = process.env.REACT_APP_BACKEND_URL + stations + `/${stationId}`;
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