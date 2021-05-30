import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { bikes } from "../apiUrls";
import { Http2ServerResponse } from "http2";
import { getToken } from "../login/token";
import { deleteBikeMock } from "../../mock_data/bikes/deleteBike";


export const deleteBike = async (bikeId: string): Promise<IApiResponse<Http2ServerResponse>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
    {
        return deleteBikeMock();
    }        

    let url = process.env.REACT_APP_BACKEND_URL + bikes + `/${bikeId}`;
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
