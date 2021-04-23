import {Station} from "../../models/station";
import {IApiResponse} from "../../api/apiUtils";

export const allStationsMock = (): IApiResponse<Station[]> => {
    return {
        isError: false,
        responseCode: 200,
        data: [
            {id: "1", name: "Rondo ONZ", status: "active", activeBikesCount: 1},
            {id: "2", name: "Ratusz Arsenał", status: "active", activeBikesCount: 1},
            {id: "3", name: "Politechnika Warszawska", status: "active", activeBikesCount: 1},
            {id: "4", name: "Minas Tirith", status: "active", activeBikesCount: 0},
            {id: "5", name: "Osgiliath", status: "blocked", activeBikesCount: 0},
        ]
    };
}
