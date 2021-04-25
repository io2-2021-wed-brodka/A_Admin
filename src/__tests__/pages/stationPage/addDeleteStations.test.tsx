import "regenerator-runtime/runtime";
import React from "react";

import {act, cleanup, fireEvent, RenderResult} from "@testing-library/react";
import {getAllStations} from "../../../api/stations/getStations";
import {Station} from "../../../models/station";
import {deleteStation} from "../../../api/stations/deleteStation";
import StationPage from "../../../pages/StationPage";
import {render} from "../../test-utils";

afterEach(cleanup);

jest.mock("../../../api/stations/getStations");
jest.mock("../../../api/stations/blockStation");
jest.mock("../../../api/stations/unblockStation");
jest.mock("../../../api/stations/deleteStation");

const mockedGetAllStations = getAllStations as jest.MockedFunction<typeof getAllStations>;
const stations: Station[] = [
    {id: "1", name: "Rondo ONZ", status: "active", activeBikesCount: 1},
    {id: "2", name: "Ratusz Arsenał", status: "blocked", activeBikesCount: 0},
    {id: "3", name: "Politechnika Warszawska", status: "active", activeBikesCount: 1},
    {id: "4", name: "Minas Tirith", status: "active", activeBikesCount: 0},
    {id: "5", name: "Osgiliath", status: "blocked", activeBikesCount: 0}
];
const fullResponse = {isError: false, responseCode: 200, data: stations};

const mockedDeleteStation = deleteStation as jest.MockedFunction<typeof deleteStation>;


it("Clicking add shows a modal dialog", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    const button = renderResult.getByText("Add");
    await act(async () => {
        fireEvent.click(button);
    });
    expect(renderResult.getByRole("dialog")).toBeDefined();
});

it("Clicking delete deletes a station", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    mockedDeleteStation.mockResolvedValue({isError: false, responseCode: 204});

    const stationList = renderResult.getAllByRole("row");
    const deleteButton = stationList[1].getElementsByTagName("button")[1];
    await act(async () => {
        fireEvent.click(deleteButton);
    });

    const updatedStationList = renderResult.getAllByRole("row");
    expect(updatedStationList.length).toEqual(stationList.length - 1);
});