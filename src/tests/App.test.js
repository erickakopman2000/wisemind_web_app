import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("App", () => {
  it("App component renders", () => {
    let appWrapper = shallow(<App />);

    expect(appWrapper).not.toBeNull();
  });
});
