import {IApiResponse} from "../apiUtils";
import {Station} from "../../models/station";
import {blockStationMock} from "../../mock_data/stations/blockStationMock";

export const blockStation = async (stationId: string): Promise<IApiResponse<Station>> => {
    return blockStationMock(stationId);
};