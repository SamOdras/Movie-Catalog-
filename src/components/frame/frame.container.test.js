import { onChangeSearch } from './frame.container';

describe("On change search action", () => {
  it("It should match the type", () => {
    expect(onChangeSearch().type).toEqual("SEARCH_MOVIE");
  })
})