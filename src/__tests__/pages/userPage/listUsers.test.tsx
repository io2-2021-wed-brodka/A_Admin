import {
    act, 
    cleanup, 
    fireEvent, 
    RenderResult
} from "@testing-library/react";
import "regenerator-runtime/runtime";
import { render } from "../../test-utils";
import { getAllUsers } from "../../../api/users/getUsers";
import { blockUser } from "../../../api/users/blockUser"
import React from "react"
import { Users } from "../../../models/users";
import UserPage from "../../../pages/UserPage";
import { getBlockedUsers } from "../../../api/users/getBlockedUsers";

afterEach(cleanup);

jest.mock("../../../api/users/getUsers");

const mockedGetAllUsers = getAllUsers as jest.MockedFunction<typeof getAllUsers>;
const users: Users = 
{
    users:
    [
        { id: "1", name: "Jan" },
        { id: "2", name: "Bartosz" },
        { id: "3", name: "Artur" },
        { id: "4", name: "Maciej" },
    ]
};
const fullGetResponse = {isError: false, responseCode: 200, data: users};

jest.mock("../../../api/users/blockUser");

const mockedBlockUser = blockUser as jest.MockedFunction<typeof blockUser>;

jest.mock("../../../api/users/getBlockedUsers");
const mockedGetBlockedUsers = getBlockedUsers as jest.MockedFunction<typeof getBlockedUsers>;
const blockedUsers: Users = 
{
    users:
    [
        { id: "5", name: "Paweł" },
    ]
};
const fullGetBlockedResponse = {isError: false, responseCode: 200, data: blockedUsers};


it("All users' names are shown on the list", async () => {
    mockedGetAllUsers.mockResolvedValue(fullGetResponse);
    mockedGetBlockedUsers.mockResolvedValue(fullGetBlockedResponse);

    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<UserPage />);
    });

    users.users.forEach((user) => {
        expect(renderResult.getByText(user.name, {exact: false})).toBeDefined();
    });
});

it("Each user has a button to block them", async () => {
    mockedGetAllUsers.mockResolvedValue(fullGetResponse);
    mockedGetBlockedUsers.mockResolvedValue(fullGetBlockedResponse);

    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<UserPage />);
    });

    const list = renderResult.getAllByRole("row");

    users.users.forEach((tech, index) => {
        const row = list[index + 1];
        const button = document
            .evaluate(".//button", row, null, XPathResult.ANY_TYPE, null)
            .iterateNext();

        expect(button).toBeDefined();
        try {
            expect(button?.textContent).toEqual("Block");
        }
        catch {
            expect(button?.textContent).toEqual("Unblock");                     
        }
        
    });
});

it("Clicking block changes button text", async () => {
    mockedGetBlockedUsers.mockResolvedValue(fullGetBlockedResponse);
    mockedGetAllUsers.mockResolvedValue(fullGetResponse);

    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<UserPage/>);
    });

    mockedBlockUser.mockResolvedValue({isError: false, responseCode: 201});
    
    const usersList = renderResult.getAllByRole("row");
    const blockButton = usersList[1].getElementsByTagName("button")[0];
    expect(blockButton.textContent).toEqual("Block");
    await act(async () => {
        fireEvent.click(blockButton);
    });

    const updatedButton = usersList[1].getElementsByTagName("button")[0];
    expect(updatedButton.textContent).toEqual("Unblock");
});

it("Clicking unblock changes button text", async () => {
    mockedGetBlockedUsers.mockResolvedValue(fullGetBlockedResponse);
    mockedGetAllUsers.mockResolvedValue(fullGetResponse);

    let renderResult = {} as RenderResult;
    await act(async () => {
        renderResult = render(<UserPage/>);
    });

    mockedBlockUser.mockResolvedValue({isError: false, responseCode: 201});
    
    const usersList = renderResult.getAllByRole("row");
    const blockButton = usersList[usersList.length - 1].getElementsByTagName("button")[0];
    expect(blockButton.textContent).toEqual("Unblock");
    await act(async () => {
        fireEvent.click(blockButton);
    });

    const updatedButton = usersList[usersList.length - 1].getElementsByTagName("button")[0];
    expect(updatedButton.textContent).toEqual("Block");
});