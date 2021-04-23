import {IApiResponse} from "../apiUtils";
import {Http2ServerResponse} from "http2";
import {deleteStationMock} from "../../mock_data/stations/deleteStationMock";

export const deleteStation = async (stationId: string): Promise<IApiResponse<Http2ServerResponse>> => {
    return deleteStationMock();
}