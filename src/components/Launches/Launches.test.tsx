import { render, screen } from "@testing-library/react";
import Launches from "./Launches";

test("Rendered successful launches", async () => {
  render(<Launches status="success" />);
  const successFulLaunches = await screen.findAllByTestId("badge");
  successFulLaunches.forEach((successfullLaunch, i) => {
    expect(successfullLaunch.textContent).toBe("Successful");
  })
});

test("Rendered failed launches", async () => {
  render(<Launches status="failed" />);
  const successFulLaunches = await screen.findAllByTestId("badge");
  successFulLaunches.forEach((successfullLaunch, i) => {
    expect(successfullLaunch.textContent).toBe("Failed");
  })
});

test("Rendered upcoming launches", async () => {
  render(<Launches status="upcoming" />);
  const successFulLaunches = await screen.findAllByTestId("badge");
  successFulLaunches.forEach((successFulLaunch, i) => {
    expect(successFulLaunch.textContent).toBe("Upcoming");
  })
});