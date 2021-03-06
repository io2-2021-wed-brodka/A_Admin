import { loginMock } from "../../mock_data/login/loginMock";
import { login as loginUrl } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";

export interface Token {
    token: string;
    role: string;
}
export const login = async (username: string, password: string): Promise<IApiResponse<Token>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
    {
        return loginMock(username, password);
    }        

    const url = process.env.REACT_APP_BACKEND_URL + loginUrl;
    type T = IApiResponse<Token>;    
    return fetch(url, {
        method: "POST",
        // configure headers values on specification changes
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(
            {
                login: username,
                password: password,                
            })
    }).then<T>(handleResponse).catch<T>(handleError);
}
