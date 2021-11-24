import Frame from './frame.component';
import {
  render as testRender,
  fireEvent,
  screen
} from "@testing-library/react";

describe('Render without crashing', () => {
  const props = {
    isLoading: false,
    searchValue: "",
    onChangeSearch: jest.fn(),
    children: <></>
  };
  const render = () => testRender(<Frame {...props} />);

  test('Render Frame', () => {
    expect(render()).toMatchSnapshot();
  })

  test("Call on change search, when text change", () => {
    render();
    const input = screen.getByTitle("searchMovie");
    fireEvent.change(input, { target: { value: "Hello There" } });
    expect(props.onChangeSearch).toHaveBeenCalledTimes(1);
  });

  test("Click title", () => {
    render();
    const title = screen.getByTitle("brand");
    fireEvent.click(title)
    expect(window.location.href).toBe("http://localhost/");
  })
  test("Expecting boolean", () => {
    const { container } = render();
    expect(container.querySelector('[title="loading-indicator"]')).toBeNull();
  })
})
