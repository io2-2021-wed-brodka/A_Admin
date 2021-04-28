import {IApiResponse} from "../../api/apiUtils";
import { Bikes } from "../../models/bikes";


export const allBikesMock = (): IApiResponse<Bikes> => {
    return {
        isError: false,
        responseCode: 200,
        data: 
        {
            bikes: 
            [
                {
                    id: "1", status: "", user: undefined,
                    station: {id: "1", name: "Rondo ONZ", status: "active", activeBikesCount: 1}
                },
                {
                    id: "2", status: "", user: undefined,
                    station: {id: "1", name: "Ratusz Arsenał", status: "active", activeBikesCount: 1}
                },
                {
                    id: "3", status: "rented", 
                    user: {id: "1", name: "Artur"}, station: undefined 
                },
                {
                    id: "4", status: "rented", 
                    user: {id: "2", name: "Janek"}, station: undefined
                },
                {
                    id: "5", status: "", user: undefined,
                    station: {id: "1", name: "Politechnika Warszawska", status: "active", activeBikesCount: 1}
                },
            ]
        }
    };
}
