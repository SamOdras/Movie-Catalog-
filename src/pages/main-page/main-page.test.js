import MainComponent from "./main-page.component";
import { render as testRender, cleanup } from "@testing-library/react";

afterEach(cleanup);
describe("Test Main Page", () => {
  const props = {
    searchValue: "",
    isLoading: false,
    setIsLoading: jest.fn()
  };
  const render = () => testRender(<MainComponent {...props} />);
  test("Render Without Problem", () => {
    expect(render()).toMatchSnapshot();
  });
})
