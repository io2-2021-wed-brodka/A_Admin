import { render, RenderOptions } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import React, { ReactElement } from "react";

const AllTheProviders = ({ children }: any) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
