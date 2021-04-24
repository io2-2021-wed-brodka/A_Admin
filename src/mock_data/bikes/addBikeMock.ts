import { IApiResponse } from "../../api/apiUtils";
import { Bike } from "../../models/bike";

const addBikeMock = (): IApiResponse<Bike> =>
{
    return { 
        isError: false,            
        responseCode:201,
        data: { id: "1", status: "rented", user: undefined, station: { id: "1", name: "Rondo ONZ" } },
    };
}

export default addBikeMock;