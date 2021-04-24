import { IApiResponse } from "../../api/apiUtils";
import { User } from "../../models/user";

const addTechMock = (): IApiResponse<User> =>
{
    return { 
        isError: false,            
        responseCode: 201,
        data: { id: "6", name: "Mariusz" },
    };
}

export default addTechMock;
