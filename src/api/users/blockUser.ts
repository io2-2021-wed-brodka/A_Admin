import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";
import { users } from "../apiUrls";
import { User } from "../../models/user";
import { blockUserMock } from "../../mock_data/users/blockUserMock";

export const blockUser = async (bikeId: string): Promise<IApiResponse<User>> => {
    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
    {
        return blockUserMock(bikeId);
    }
        
    let url = process.env.REACT_APP_BACKEND_URL + `${users}/blocked`;
    type T = IApiResponse<User>;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
        body: JSON.stringify({id: bikeId})
    }).then<T>(handleResponse).catch<T>(handleError);
};
