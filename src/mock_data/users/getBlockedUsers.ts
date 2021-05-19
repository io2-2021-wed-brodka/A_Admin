import { IApiResponse } from "../../api/apiUtils";
import { Users } from "../../models/users";

export const blockedUsersMock = (): IApiResponse<Users> => {
    return {
        isError: false,
        responseCode: 200,
        data: {
            users: 
            [
                { id: "1", name: "Jan" },
            ]
        }
    };   
}
