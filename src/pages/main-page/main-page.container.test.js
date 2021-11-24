import { setIsLoading } from "./main-page.container";

describe("On change search action", () => {
  it("It should match the type", () => {
    expect(setIsLoading().type).toEqual("SEARCH_LOADING");
  });
});
