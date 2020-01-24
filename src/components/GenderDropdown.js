import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const GenderDropdown = () => (
  <Dropdown>
    <Dropdown.Toggle variant="primary" id="dropdownBasic">
      Please Select Gender
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item>Men</Dropdown.Item>
      <Dropdown.Item>Lady</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default GenderDropdown;
