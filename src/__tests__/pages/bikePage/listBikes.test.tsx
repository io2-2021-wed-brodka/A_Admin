import {
  act,
  cleanup,
  RenderResult,
} from "@testing-library/react";
import "regenerator-runtime/runtime";
import { getAllBikes } from "../../../api/bikes/getBikes";
import { Bike } from "../../../models/bike";
import BikePage from "../../../pages/BikePage";
import React from "react";

import { render } from "../../test-utils";

afterEach(cleanup);

jest.mock("../../../api/bikes/getBikes");

const mockedGetAllBikes = getAllBikes as jest.MockedFunction<
  typeof getAllBikes
>;
const bikes: Bike[] = [
  {
    id: "1",
    status: "rented",
    user: undefined,
    station: { id: "1", name: "Rondo ONZ" },
  },
  {
    id: "2",
    status: "rented",
    user: undefined,
    station: { id: "1", name: "Ratusz Arsenał" },
  },
  {
    id: "3",
    status: "rented",
    user: { id: "1", name: "Artur" },
    station: undefined,
  },
  {
    id: "4",
    status: "rented",
    user: { id: "2", name: "Janek" },
    station: undefined,
  },
  {
    id: "5",
    status: "rented",
    user: undefined,
    station: { id: "1", name: "Politechnika Warszawska" },
  },
];
const fullResponse = { isError: false, responseCode: 200, data: bikes };

it("All bike ids are shown on the list", async () => {
  mockedGetAllBikes.mockResolvedValue(fullResponse);
  let renderResult = {} as RenderResult;
  await act(async () => {
    renderResult = render(<BikePage />);
  });

  bikes.forEach((bike) => {
    expect(renderResult.getByText(bike.id, { exact: false })).toBeDefined();
  });
});

it("Each bike has a button to remove it", async () => {
  mockedGetAllBikes.mockResolvedValue(fullResponse);
  let renderResult = {} as RenderResult;
  await act(async () => {
    renderResult = render(<BikePage />);
  });

  const list = renderResult.getAllByRole("row");

  bikes.forEach((bike, index) => {
    const row = list[index + 1];
    const element = document
      .evaluate(".//button", row, null, XPathResult.ANY_TYPE, null)
      .iterateNext();

    expect(element).toEqual(expect.anything());
  });
});
