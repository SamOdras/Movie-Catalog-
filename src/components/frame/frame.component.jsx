import React, {useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  Input,
  Spinner,
  NavbarText,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Frame = (props) => {
  const dispatch = useDispatch();
  // const [searchValue, setSearchValue] = useState("")
  const { isLoading, searchValue } = useSelector(state => state.movie);

  const onChangeSearch = useCallback((e) => {
    return dispatch({
      type:"SEARCH_MOVIE",
      payload:e
    })
  }, [dispatch])

  return (
    <div>
      <Navbar
        style={{ boxShadow: "1px 4px 4px -4px", height: "60px" }}
        color="light"
        container
        expand
        fixed="top"
        // full={true}
        light
      >
        <NavbarBrand style={{cursor:"pointer"}} onClick={() => window.location.assign("/")}>Movie Catalog</NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            {/* <Button>Search</Button> */}
            <Input
              // className="ml-2"
              style={{ marginLeft: "20px", width: "500px" }}
              placeholder="Cari Film"
              type="search"
              onChange={e => onChangeSearch(e.target.value)}
              value={searchValue}
            />
          </Nav>

          {isLoading && (
            <NavbarText>
              <Spinner size="sm" /> Loading...
            </NavbarText>
          )}
        </Collapse>
      </Navbar>
      {props.children}
    </div>
  );
}

export default Frame