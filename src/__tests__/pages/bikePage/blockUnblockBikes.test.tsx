import "regenerator-runtime/runtime";
import React from "react";

import { act, cleanup, fireEvent, RenderResult } from "@testing-library/react";
import { IApiResponse } from "../../../api/apiUtils";
import { render } from "../../test-utils";
import StationPage from "../../../pages/StationPage";
import { Bike } from "../../../models/bike";
import { Bikes } from "../../../models/bikes";
import { blockBike } from "../../../api/bikes/blockBike";
import { unblockBike } from "../../../api/bikes/unblockBike";
import { getAllBikes } from "../../../api/bikes/getBikes";
import BikePage from "../../../pages/BikePage";

afterEach(cleanup);

jest.mock("../../../api/bikes/getBikes");
jest.mock("../../../api/bikes/blockBike");
jest.mock("../../../api/bikes/unblockBike");

const mockedGetAllBikes = getAllBikes as jest.MockedFunction<typeof getAllBikes>;
const bikes: Bikes = {
    bikes: [
    {
        id: "1", 
        station:{id: "1", name: "Minas Morgul", status: "active", activeBikesCount: 2},
        user:undefined,
        status: "available"
    },
    {
        id: "2",
        station:{id: "1", name: "Minas Morgul", status: "active", activeBikesCount: 2},
        user:undefined,
        status: "available"
    },
    {
        id: "3", 
        station:{id: "1", name: "Minas Morgul", status: "active", activeBikesCount: 2},
        user:undefined,
        status: "blocked"
    },
    {
        id: "4", 
        station:{id: "1", name: "Minas Morgul", status: "active", activeBikesCount: 2},
        user:undefined,
        status: "blocked"
    }
    ]};
const fullResponse = {isError: false, responseCode: 200, data: bikes};

const mockedBlockBike = blockBike as jest.MockedFunction<typeof blockBike>;
const mockedUnblockBike = unblockBike as jest.MockedFunction<typeof unblockBike>;

const blockBikeResponse = (bike: Bike): IApiResponse<Bike> => {
    return {
        isError: false,
        responseCode: 201,
        data: {
            id: bike.id,
            status: "blocked",
            station: bike.station,
            user: bike.user
        }
    };
};


it("Clicking block changes bike status", async () => {
    mockedGetAllBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<BikePage/>);
    });

    mockedBlockBike.mockResolvedValue(blockBikeResponse(bikes.bikes[0]));

    const bikesList = renderResult.getAllByRole("row");
    const blockButton = bikesList[1].getElementsByTagName("button")[0];
    await act(async () => {
        fireEvent.click(blockButton);
    });

    const statusNode = bikesList[1].children[3];
    expect(statusNode.textContent).toEqual("blocked");
});

it("Clicking block changes button text", async () => {
    mockedGetAllBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<BikePage/>);
    });

    mockedBlockBike.mockResolvedValue(blockBikeResponse(bikes.bikes[0]));

    const bikesList = renderResult.getAllByRole("row");
    const blockButton = bikesList[2].getElementsByTagName("button")[0];
    await act(async () => {
        fireEvent.click(blockButton);
    });

    const updatedButton = bikesList[2].getElementsByTagName("button")[0];
    expect(updatedButton.textContent).toEqual("Unblock");
});

it("Clicking unblock changes bike status", async () => {
    mockedGetAllBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<BikePage/>);
    });

    mockedUnblockBike.mockResolvedValue({isError: false, responseCode: 204});

    const bikesList = renderResult.getAllByRole("row");
    const unblockButton = bikesList[3].getElementsByTagName("button")[0];
    await act(async () => {
        fireEvent.click(unblockButton);
    });

    const statusNode = bikesList[3].children[3];
    expect(statusNode.textContent).toEqual("available");
});

it("Clicking unblock changes button text", async () => {
    mockedGetAllBikes.mockResolvedValue(fullResponse);
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<BikePage/>);
    });

    mockedUnblockBike.mockResolvedValue({isError: false, responseCode: 204});

    const bikesList = renderResult.getAllByRole("row");
    const unblockButton = bikesList[4].getElementsByTagName("button")[0];
    await act(async () => {
        fireEvent.click(unblockButton);
    });

    const updatedButton = bikesList[4].getElementsByTagName("button")[0];
    expect(updatedButton.textContent).toEqual("Block");
});
