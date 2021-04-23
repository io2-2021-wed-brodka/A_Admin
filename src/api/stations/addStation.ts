import {IApiResponse} from "../apiUtils";
import {addStationMock} from "../../mock_data/stations/addStationMock";
import {Station} from "../../models/station";

export const addStation = async (stationName: string): Promise<IApiResponse<Station>> => {
    return addStationMock();
};