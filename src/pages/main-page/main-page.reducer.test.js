import mainReducer from './main-page.reducer';
const init = { searchValue: "", isLoading: false };

describe("Main Reducer", () => {
  it("Return initial state if", () => {
    expect(mainReducer(undefined, {})).toEqual(init)
  })

  it("Should set is loading to true", () => {
    let data = {
      type: "SEARCH_LOADING",
      payload: true
    };
    expect(mainReducer(init, data).isLoading).toBe(true)
  })

  it("Should set is loading to false", () => {
    let data = {
      type: "SEARCH_LOADING",
      payload: false
    };
    expect(mainReducer(init, data).isLoading).toBe(false);
  });

  it("Should able to change search value", () => {
    let data = {
      type: "SEARCH_MOVIE",
      payload: "Hello There !"
    };
    expect(mainReducer(init, data).searchValue).toBe("Hello There !");
  })
})