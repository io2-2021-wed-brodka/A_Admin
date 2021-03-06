import {act, cleanup, RenderResult} from "@testing-library/react";
import "regenerator-runtime/runtime";
import {render} from "../../test-utils";
import StationPage from "../../../pages/StationPage";
import {getAllStations} from "../../../api/stations/getStations";
import React from "react";
import { Stations } from "../../../models/stations";

afterEach(cleanup);

jest.mock("../../../api/stations/getStations");

const mockedGetAllStations = getAllStations as jest.MockedFunction<typeof getAllStations>;
const stations: Stations = {stations:[
    {id: "1", name: "Rondo ONZ", status: "active", activeBikesCount: 1},
    {id: "2", name: "Ratusz Arsenał", status: "blocked", activeBikesCount: 0},
    {id: "3", name: "Politechnika Warszawska", status: "active", activeBikesCount: 1},
    {id: "4", name: "Minas Tirith", status: "active", activeBikesCount: 0},
    {id: "5", name: "Osgiliath", status: "blocked", activeBikesCount: 0}
]};
const fullResponse = {isError: false, responseCode: 200, data: stations};


it("All station names are shown on the list", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    stations.stations.forEach((station) => {
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

    stations.stations.forEach((station, index) => {
        const row = list[2*index + 1];
        const buttons = document.evaluate(".//button", row, null, XPathResult.ANY_TYPE, null);
        buttons.iterateNext();
        const button = buttons.iterateNext();

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

    stations.stations.forEach((station, index) => {
        const row = list[2*index + 1];
        const buttons = document.evaluate(".//button", row, null, XPathResult.ANY_TYPE, null);
        buttons.iterateNext();
        buttons.iterateNext();
        const deleteButton = buttons.iterateNext();
        expect(deleteButton).toEqual(expect.anything());
        expect(deleteButton?.textContent).toEqual("Delete");
    });
});

it("Each station has a more/less button", async () => {
    mockedGetAllStations.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<StationPage/>);
    });

    const list = renderResult.getAllByRole("row");

    stations.stations.forEach((station, index) => {
        const row = list[2*index + 1];
        const buttons = document.evaluate(".//button", row, null, XPathResult.ANY_TYPE, null);
        const moreless = buttons.iterateNext();
        expect(moreless).toEqual(expect.anything());
        expect(moreless?.textContent).toEqual("");
    });
});