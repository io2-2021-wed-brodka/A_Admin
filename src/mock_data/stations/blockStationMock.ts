import {IApiResponse} from "../../api/apiUtils";
import {Station} from "../../models/station";

export const blockStationMock = (stationId: string): IApiResponse<Station> => {
    return {
        isError: false,
        responseCode: 201,
        data: {
            id: stationId,
            name: "Noname",
            status: "blocked",
            activeBikesCount: 0
        }
    };
};
