import {IApiResponse} from "../../api/apiUtils";
import {Http2ServerResponse} from "http2";

export const deleteStationMock = (): IApiResponse<Http2ServerResponse> => {
    return {isError: false, responseCode: 201};
}
