import Detail from './detail-page.component';
import {
  render as testRender,
  cleanup
} from "@testing-library/react";

afterEach(cleanup)
describe("Testing Detail", () => {
  const props = {
    location: {},
    setIsLoading: jest.fn()
  };
  const render = () => testRender(<Detail {...props} />);

  test("Render Without Problem", () => {
    expect(render()).toMatchSnapshot();
  });


})


