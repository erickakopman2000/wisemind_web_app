import React from "react";
import { shallow } from "enzyme";
import Home from "../pages/Home";
import Body from "../components/Body";

describe("Home", () => {
  it("Renders Homepage", () => {
    let HomepageWrapper = shallow(<Home />);
    expect(HomepageWrapper).not.toBeNull();
  });
  it("Renders Body Component", () => {
    let homepage = shallow(<Home />);
    let body = homepage.find(Body);
    expect(body).toHaveLength(1);
  });
});
