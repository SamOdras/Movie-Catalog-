import React from 'react';

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
  const { isLoading, searchValue, onChangeSearch } = props
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
        <NavbarBrand title="brand" style={{cursor:"pointer"}} onClick={() => window.location.assign("/")}>Movie Catalog</NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <Input
              title="searchMovie"
              style={{ marginLeft: "20px", width: "500px" }}
              placeholder="Cari Film"
              type="search"
              onChange={e => onChangeSearch(e.target.value)}
              value={searchValue}
            />
          </Nav>

          {isLoading && (
            <NavbarText title="loading-indicator">
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