import {act, cleanup, fireEvent, RenderResult} from "@testing-library/react";
import "regenerator-runtime/runtime";
import {Station} from "../../../models/station";
import {render} from "../../test-utils";
import StationPage from "../../../pages/StationPage";
import {getAllStations} from "../../../api/stations/getStations";
import React from "react";

afterEach(cleanup);

jest.mock("../../../api/stations/getStations");

const mockedGetAllStations = getAllStations as jest.MockedFunction<typeof getAllStations>;
const stations: Station[] = [
    {id: "1", name: "Rondo ONZ", status: "active", activeBikesCount: 1},
    {id: "2", name: "Ratusz Arsenał", status: "active", activeBikesCount: 1},
    {id: "3", name: "Politechnika Warszawska", status: "active", activeBikesCount: 1},
    {id: "4", name: "Minas Tirith", status: "active", activeBikesCount: 0},
    {id: "5", name: "Osgiliath", status: "blocked", activeBikesCount: 0}
];
const fullResponse = {isError: false, responseCode: 200, data: stations};

it("All station names are shown on the list", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    stations.forEach((station) => {
        expect(renderResult.getByText(station.name, {exact: false})).toBeDefined();
    });
});

it("Each station has a button to block or unblock it", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    const list = renderResult.getAllByRole("row");

    stations.forEach((station, index) => {
        const row = list[index + 1];
        const button = document
            .evaluate(".//button", row, null, XPathResult.ANY_TYPE, null)
            .iterateNext();

        expect(button).toBeDefined();
        if (station.status === "active")
            expect(button?.textContent).toEqual("Block");
        else
            expect(button?.textContent).toEqual("Unblock");
    });
});

it("Each station has a button to remove it", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    const list = renderResult.getAllByRole("row");

    stations.forEach((station, index) => {
        const row = list[index + 1];
        const buttons = document.evaluate(".//button", row, null, XPathResult.ANY_TYPE, null);
        buttons.iterateNext();
        const deleteButton = buttons.iterateNext();

        expect(deleteButton).toEqual(expect.anything());
        expect(deleteButton?.textContent).toEqual("Delete");
    });
});

it("Clicking add shows a modal dialog", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    const button = renderResult.getByText("Add");
    fireEvent.click(button);
    expect(renderResult.getByRole("dialog")).toBeDefined();
});

it("Clicking delete deletes a station", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    const stationList = renderResult.getAllByRole("row");
    const deleteButton = stationList[1].getElementsByTagName("button")[1];
    await act(() => {
        fireEvent.click(deleteButton)
    });

    const updatedStationList = renderResult.getAllByRole("row");
    expect(updatedStationList.length).toEqual(stationList.length - 1);
});
