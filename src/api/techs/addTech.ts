import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { techs } from "../apiUrls";
import { getToken } from "../login/token";
import addTechMock from "../../mock_data/techs/addTechMock";
import { User } from "../../models/user";


export const addTech = async (username: string, password: string): Promise<IApiResponse<User>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
    {
        return addTechMock();
    }      

    let url = process.env.REACT_APP_BACKEND_URL + techs;
    type T = IApiResponse<User>;
    return fetch(url, {
        method: "POST",        
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
        body: JSON.stringify(
            {
                name: username,
                password: password
            })
    })
    .then<T>(handleResponse)
    .catch<T>(handleError);
}
