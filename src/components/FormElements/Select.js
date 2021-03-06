import React, { useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import PropTypes from "prop-types";

const Container = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
  font-size: 0.8em;
  font-weight: bold;
`;

const StyledSelect = styled.select`
  width: 100%;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.themeColorSecondary};
  font-size: 1em;
  padding: 7px 10px;
  background: #fff;

  &:focus {
    outline: 0;
    border: 2px solid ${props => props.theme.themeColor};
  }
`;

const Select = props => {
  const ID = uniqid();

  const [inputValue, setInputValue] = useState(props.value ? props.value : "");

  return (
    <Container>
      <Label htmlFor={ID}>{props.label}</Label>
      <StyledSelect
        onChange={e => {
          setInputValue(e.target.value);
          props.handleChange(e.target.value);
        }}
        value={inputValue}
        id={ID}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {props.options &&
          props.options.length > 0 &&
          props.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
      </StyledSelect>
    </Container>
  );
};

Select.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default Select;
