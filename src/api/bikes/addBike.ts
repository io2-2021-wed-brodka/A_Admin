import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { bikes } from "../apiUrls";
import { getToken } from "../login/token";
import addBikeMock from "../../mock_data/bikes/addBikeMock";
import { Bike } from "../../models/bike";


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