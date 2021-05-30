import { IApiResponse } from "../../api/apiUtils";
import { Station } from "../../models/station";

export const StationMock = (): IApiResponse<Station> => {
    return {
        isError: false,
        responseCode: 200,
        data: {id: "1", name: "Rondo ONZ", status: "active", activeBikesCount: 1}
    };
}
