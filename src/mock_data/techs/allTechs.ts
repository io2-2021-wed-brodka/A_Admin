import { IApiResponse } from "../../api/apiUtils";
import { User } from "../../models/user";


export const allTechsMock = (): IApiResponse<User[]> => {
    return {
        isError: false,
        responseCode: 200,
        data: [
            { id: "1", name: "Jan" },
            { id: "2", name: "Bartosz" },
            { id: "3", name: "Artur" },
            { id: "4", name: "Maciej" },
            { id: "5", name: "Paweł" },
        ]
    };   
}