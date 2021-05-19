import { IApiResponse } from "../../api/apiUtils";
import { Users } from "../../models/users";

export const allUsersMock = (): IApiResponse<Users> => {
    return {
        isError: false,
        responseCode: 200,
        data: {
            users: 
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
