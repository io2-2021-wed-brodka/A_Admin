import { allUsersMock } from "../../mock_data/users/getUsers";
import { Users } from "../../models/users";
import { users } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const getAllUsers = async (): Promise<IApiResponse<Users>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
    {
        return allUsersMock();
    }   

    const url = process.env.REACT_APP_BACKEND_URL + users;
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
