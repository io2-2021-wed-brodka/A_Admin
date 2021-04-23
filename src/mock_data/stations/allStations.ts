import {Station} from "../../models/station";
import {IApiResponse} from "../../api/apiUtils";

export const allStationsMock = (): IApiResponse<Station[]> => {
    return {
        isError: false,
        responseCode: 200,
        data: [
            {id: "1", name: "Rondo ONZ"},
            {id: "2", name: "Ratusz Arsenał"},
            {id: "3", name: "Politechnika Warszawska"},
            {id: "4", name: "Minas Tirith"},
        ]
    };
}