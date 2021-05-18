import {IApiResponse} from "../../api/apiUtils";
import { User } from "../../models/user";

export const blockUserMock = (userId: string): IApiResponse<User> => {
    return {
        isError: false,
        responseCode: 201,
        data: {
            id: userId,
            name: "Blocked Bloke",
        }
    };
};
