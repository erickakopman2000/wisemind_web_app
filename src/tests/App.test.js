import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import Header from "../components/Header";
import Home from "../pages/Home";

describe("App", () => {
  let appWrapper;
  beforeAll(() => {
    appWrapper = shallow(<App />);
  });

  it("Renders App Component", () => {
    expect(appWrapper).not.toBeNull();
  });
  it("Renders Header Component", () => {
    let header = appWrapper.find(Header);
    expect(header).toHaveLength(1);
  });
});
