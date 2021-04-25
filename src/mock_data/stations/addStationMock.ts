import {IApiResponse} from "../../api/apiUtils";
import {Station} from "../../models/station";

export const addStationMock = (): IApiResponse<Station> => {
    return {
        isError: false,
        responseCode: 201,
        data: {
            id: "1",
            name: "Beleriand",
            status: "blocked",
            activeBikesCount: 0
        }
    };
}