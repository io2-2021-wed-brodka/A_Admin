import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { bikes } from "../apiUrls";
import { getToken } from "../login/token";
import { Bike } from "../../models/bike";
import { addBikeMock } from "../../mock_data/bikes/addBike";


export const addBike = async (bikeStationId: string): Promise<IApiResponse<Bike>> => {

    if (parseInt(process.env.REACT_APP_MOCK_DATA || "0") === 1 || process.env.REACT_APP_BACKEND_URL === undefined)
    {
        return addBikeMock();
    }        

    let url = process.env.REACT_APP_BACKEND_URL + bikes;
    type T = IApiResponse<Bike>;
    return fetch(url, {
        method: "POST",        
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
        body: JSON.stringify(
            {
                stationId: bikeStationId,
            })
    })
    .then<T>(handleResponse)
    .catch<T>(handleError);
}