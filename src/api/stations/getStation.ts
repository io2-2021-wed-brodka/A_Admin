import { StationMock } from "../../mock_data/stations/StationMock";
import { Station } from "../../models/station";
import { stations } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const getStation = async (id: string): Promise<IApiResponse<Station>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined) {
        return StationMock();
    }

    const url = process.env.REACT_APP_BACKEND_URL + stations+"/"+id;
    type T = IApiResponse<Station>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}
