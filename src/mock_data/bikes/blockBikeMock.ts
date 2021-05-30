import {IApiResponse} from "../../api/apiUtils";
import { Bike } from "../../models/bike";

export const blockBikeMock = (bikeId: string): IApiResponse<Bike> => {
    return {
        isError: false,
        responseCode: 201,
        data: {
            id: bikeId,
            station:
            {
             id:"1",
             name:"Noname",
             status:"active",
             activeBikesCount:1,
             bikesLimit: 10
            },
            user: undefined,
            status: "blocked"
        }
    };
};
