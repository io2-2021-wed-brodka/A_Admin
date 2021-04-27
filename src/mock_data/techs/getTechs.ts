import { IApiResponse } from "../../api/apiUtils";
import { Techs } from "../../models/techs";

export const allTechsMock = (): IApiResponse<Techs> => {
    return {
        isError: false,
        responseCode: 200,
        data: {
            techs: 
            [
                { id: "1", name: "Jan" },
                { id: "2", name: "Bartosz" },
                { id: "3", name: "Artur" },
                { id: "4", name: "Maciej" },
                { id: "5", name: "Paweł" },
            ]
        }
    };   
}
