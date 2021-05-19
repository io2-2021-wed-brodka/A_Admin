import { blockedUsersMock } from "../../mock_data/users/getBlockedUsers";
import { Users } from "../../models/users";
import { users } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const getBlockedUsers = async (): Promise<IApiResponse<Users>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
    {
        return blockedUsersMock();
    }   

    const url = process.env.REACT_APP_BACKEND_URL + users + '/blocked';
    type T = IApiResponse<Users>;
    return fetch(url, {
        method: "GET",        
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}
