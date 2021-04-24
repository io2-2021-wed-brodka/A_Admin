import { Http2ServerResponse } from "http2"
import { IApiResponse } from "../../api/apiUtils";

export const deleteBikeMock = (): IApiResponse<Http2ServerResponse> =>
{
    return { isError: false,
            responseCode:201
        };
}
