import {IApiResponse} from "../apiUtils";
import {Http2ServerResponse} from "http2";
import {unblockStationMock} from "../../mock_data/stations/unblockStationMock";

export const unblockStation = async (stationId: string): Promise<IApiResponse<Http2ServerResponse>> => {
    return unblockStationMock();
}