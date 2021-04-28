import { allTechsMock } from "../../mock_data/techs/getTechs";
import { Techs } from "../../models/techs";
import { techs } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const getAllTechs = async (): Promise<IApiResponse<Techs>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
    {
        return allTechsMock();
    }   

    const url = process.env.REACT_APP_BACKEND_URL + techs;
    type T = IApiResponse<Techs>;
    return fetch(url, {
        method: "GET",        
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}
