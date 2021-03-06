import {IApiResponse} from "../../api/apiUtils";
import {Station} from "../../models/station";

export const addStationMock = (): IApiResponse<Station> => {
    return {
        isError: false,
        responseCode: 201,
        data: {
            id: "10",
            name: "Beleriand",
            status: "blocked",
            activeBikesCount: 0
        }
    };
}