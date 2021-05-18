import {
    act, 
    cleanup, 
    fireEvent, 
    RenderResult
} from "@testing-library/react";
import "regenerator-runtime/runtime";
import {render} from "../../test-utils";
import TechPage from "../../../pages/TechPage";
import {getAllTechs} from "../../../api/techs/getTechs";
import {deleteTech} from "../../../api/techs/deleteTech"
import React from "react"
import { Techs } from "../../../models/techs";

afterEach(cleanup);

jest.mock("../../../api/techs/getTechs");

const mockedGetAllTechs = getAllTechs as jest.MockedFunction<typeof getAllTechs>;
const techs: Techs = 
{techs:
    [
    { id: "1", name: "Jan" },
    { id: "2", name: "Bartosz" },
    { id: "3", name: "Artur" },
    { id: "4", name: "Maciej" },
    { id: "5", name: "Paweł" },
 ]
};
const fullGetResponse = {isError: false, responseCode: 200, data: techs};

jest.mock("../../../api/techs/deleteTech");

const mockedDeleteTech = deleteTech as jest.MockedFunction<typeof deleteTech>;
const fullDeleteResponse = {isError: false, responseCode: 204};


it("All techs' names are shown on the list", async () => {
    mockedGetAllTechs.mockResolvedValue(fullGetResponse);
    
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<TechPage />);
    });

    techs.techs.forEach((tech) => {
        expect(renderResult.getByText(tech.name, {exact: false})).toBeDefined();
    });
});

it("Each tech has a button to delete them", async () => {
    mockedGetAllTechs.mockResolvedValue(fullGetResponse);
    
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<TechPage />);
    });

    const list = renderResult.getAllByRole("row");

    techs.techs.forEach((tech, index) => {
        const row = list[index + 1];
        const button = document
            .evaluate(".//button", row, null, XPathResult.ANY_TYPE, null)
            .iterateNext();

        expect(button).toBeDefined();
        expect(button?.textContent).toEqual("Delete");
    });
});

it("Clicking Add button shows a modal dialog", async () => {
    mockedGetAllTechs.mockResolvedValue(fullGetResponse);
    
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<TechPage/>);
    });

    const button = renderResult.getByText("Add");
    fireEvent.click(button);
    expect(renderResult.getByRole("dialog")).toBeDefined();
});

it("Clicking Delete button deletes a tech", async () => {
    mockedGetAllTechs.mockResolvedValue(fullGetResponse);
    mockedDeleteTech.mockResolvedValue(fullDeleteResponse);
    
    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<TechPage/>);
    });

    const techList = renderResult.getAllByRole("row");
    const deleteButton = techList[1].getElementsByTagName("button")[0];
    await act(async () => {
        fireEvent.click(deleteButton);
    });

    const updatedTechList = renderResult.getAllByRole("row");
    expect(updatedTechList.length).toEqual(techList.length - 1);
});
