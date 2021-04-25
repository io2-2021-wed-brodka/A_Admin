import { Http2ServerResponse } from "http2"
import { IApiResponse } from "../../api/apiUtils";

export const deleteTechMock = (): IApiResponse<Http2ServerResponse> =>
{
    return { 
        isError: false,
        responseCode: 204
    };
}
