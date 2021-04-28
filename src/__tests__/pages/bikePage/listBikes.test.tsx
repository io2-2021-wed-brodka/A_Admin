import {
  act,
  cleanup,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import "regenerator-runtime/runtime";
import { getAllBikes } from "../../../api/bikes/getBikes";
import BikePage from "../../../pages/BikePage";
import React from "react";

import { render } from "../../test-utils";
import { Bikes } from "../../../models/bikes";

afterEach(cleanup);

jest.mock("../../../api/bikes/getBikes");

const mockedGetAllBikes = getAllBikes as jest.MockedFunction<typeof getAllBikes>;
const bikes: Bikes = {
  bikes:
  [
  {
    id: "1", status: "", user: undefined,
    station: {id: "1", name: "Rondo ONZ", status: "active", activeBikesCount: 1}
  },
  {
    id: "2", status: "", user: undefined,
    station: {id: "1", name: "Ratusz Arsenał", status: "active", activeBikesCount: 1}
  },
  {id: "3", status: "rented", user: {id: "1", name: "Artur"}, station: undefined},
  {id: "4", status: "rented", user: {id: "2", name: "Janek"}, station: undefined},
  {
    id: "5", status: "", user: undefined,
    station: {id: "1", name: "Politechnika Warszawska", status: "active", activeBikesCount: 1}
  }
]};
const fullResponse = { isError: false, responseCode: 200, data: bikes };

it("All bike ids are shown on the list", async () => {
  mockedGetAllBikes.mockResolvedValue(fullResponse);
  let renderResult = {} as RenderResult;
  await act(async () => {
    renderResult = render(<BikePage />);
  });

  bikes.bikes.forEach((bike) => {
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

  bikes.bikes.forEach((bike, index) => {
    const row = list[index + 1];
    const element = document
      .evaluate(".//button", row, null, XPathResult.ANY_TYPE, null)
      .iterateNext();

    expect(element).toBeDefined();
  });
});

it("Clicking add shows a modal dialog", async () => {
  mockedGetAllBikes.mockResolvedValue(fullResponse);
  let renderResult = {} as RenderResult;
  await act(async () => {
    renderResult = render(<BikePage />);
  });

  const button = renderResult.getByText("Add");

  fireEvent.click(button);
  expect(renderResult.getByRole('dialog')).toBeDefined();  
});

it("Clicking delete deletes a bike", async () => {
  mockedGetAllBikes.mockResolvedValue(fullResponse);
  let renderResult = {} as RenderResult;
  await act(async () => {
    renderResult = render(<BikePage />);
  });

  const list = renderResult.getAllByRole("row");  
  const buttons = list[1].getElementsByTagName('button');
  fireEvent.click(buttons[0]);
  const newList = renderResult.getAllByRole("row");

  expect(newList.length).toBeLessThan(list.length);
});
