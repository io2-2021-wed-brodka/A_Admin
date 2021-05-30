import { IApiResponse } from "../../api/apiUtils";
import { Bike } from "../../models/bike";

export const addBikeMock = (): IApiResponse<Bike> =>
{
    return { 
        isError: false,            
        responseCode:201,
        data: { id: "1", status: "rented", user: undefined, station: { id: "1", name: "Rondo ONZ", status: "active", activeBikesCount: 5, bikesLimit: 10 } },
    };
}
