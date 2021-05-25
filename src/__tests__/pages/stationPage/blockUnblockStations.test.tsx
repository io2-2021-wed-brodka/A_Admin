import "regenerator-runtime/runtime";
import React from "react";

import { act, cleanup, fireEvent, RenderResult } from "@testing-library/react";
import { getAllStations } from "../../../api/stations/getStations";
import { Station } from "../../../models/station";
import { blockStation } from "../../../api/stations/blockStation";
import { unblockStation } from "../../../api/stations/unblockStation";
import { IApiResponse } from "../../../api/apiUtils";
import { render } from "../../test-utils";
import StationPage from "../../../pages/StationPage";
import { Stations } from "../../../models/stations";

afterEach(cleanup);

jest.mock("../../../api/stations/getStations");
jest.mock("../../../api/stations/blockStation");
jest.mock("../../../api/stations/unblockStation");

const mockedGetAllStations = getAllStations as jest.MockedFunction<typeof getAllStations>;
const stations: Stations = {stations:[
    {id: "1", name: "Rondo ONZ", status: "active", activeBikesCount: 1},
    {id: "2", name: "Ratusz Arsenał", status: "active", activeBikesCount: 1},
    {id: "3", name: "Politechnika Warszawska", status: "blocked", activeBikesCount: 0},
    {id: "4", name: "Minas Tirith", status: "blocked", activeBikesCount: 0},
]};
const fullResponse = {isError: false, responseCode: 200, data: stations};

const mockedBlockStation = blockStation as jest.MockedFunction<typeof blockStation>;
const mockedUnblockStation = unblockStation as jest.MockedFunction<typeof unblockStation>;

const blockStationResponse = (station: Station): IApiResponse<Station> => {
    return {
        isError: false,
        responseCode: 201,
        data: {
            id: station.id,
            name: station.name,
            status: "blocked",
            activeBikesCount: station.activeBikesCount
        }
    };
};


it("Clicking block changes station status", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    mockedBlockStation.mockResolvedValue(blockStationResponse(stations.stations[0]));

    const stationList = renderResult.getAllByRole("row");
    const blockButton = stationList[1].getElementsByTagName("button")[1];
    await act(async () => {
        fireEvent.click(blockButton);
    });

    const statusNode = stationList[1].children[2];
    expect(statusNode.textContent).toEqual("blocked");
});

it("Clicking block changes button text", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    mockedBlockStation.mockResolvedValue(blockStationResponse(stations.stations[1]));

    const stationList = renderResult.getAllByRole("row");
    const blockButton = stationList[3].getElementsByTagName("button")[1];
    await act(async () => {
        fireEvent.click(blockButton);
    });

    const updatedButton = stationList[3].getElementsByTagName("button")[1];
    expect(updatedButton.textContent).toEqual("Unblock");
});

it("Clicking unblock changes station status", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    mockedUnblockStation.mockResolvedValue({isError: false, responseCode: 204});

    const stationList = renderResult.getAllByRole("row");
    const unblockButton = stationList[5].getElementsByTagName("button")[1];
    await act(async () => {
        fireEvent.click(unblockButton);
    });

    const statusNode = stationList[5].children[2];
    expect(statusNode.textContent).toEqual("active");
});

it("Clicking unblock changes button text", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    mockedUnblockStation.mockResolvedValue({isError: false, responseCode: 204});

    const stationList = renderResult.getAllByRole("row");
    const unblockButton = stationList[7].getElementsByTagName("button")[1];
    await act(async () => {
        fireEvent.click(unblockButton);
    });

    const updatedButton = stationList[7].getElementsByTagName("button")[1];
    expect(updatedButton.textContent).toEqual("Block");
});
