import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { Http2ServerResponse } from "http2";
import { getToken } from "../login/token";
import { users } from "../apiUrls";
import { unblockBikeMock } from "../../mock_data/bikes/unblockBikeMock";

export const unblockUser = async (userId: string): Promise<IApiResponse<Http2ServerResponse>> => {
    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
    {
        return unblockBikeMock();
    }        

    let url = process.env.REACT_APP_BACKEND_URL + `${users}/blocked/${userId}`;
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "DELETE",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}
