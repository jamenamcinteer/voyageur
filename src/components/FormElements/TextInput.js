import React, { useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import PropTypes from "prop-types";

const Container = styled.div`
  margin: 20px 0;
`;
const Label = styled.label`
  display: ${props => (props.styleType === "thin" ? `none` : `block`)};
  font-size: 0.8em;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  border-radius: ${props => (props.styleType === "thin" ? `0` : `5px`)};
  border: ${props =>
    props.styleType === "thin"
      ? `0`
      : `2px solid ${props.theme.themeColorSecondary}`};
  border-bottom: ${props =>
    props.styleType === "thin"
      ? `1px solid ${props.theme.themeColorSecondary}`
      : `2px solid ${props.theme.themeColorSecondary}`};
  font-size: 1em;
  padding: 7px 10px;

  &:focus {
    outline: 0;
    border: border: ${props =>
      props.styleType === "thin" ? `0` : `2px solid ${props.theme.themeColor}`};
    border-bottom: ${props =>
      props.styleType === "thin"
        ? `1px solid ${props.theme.themeColor}`
        : `2px solid ${props.theme.themeColor}`};
  }
`;

const TextInput = React.forwardRef((props, ref) => {
  const ID = uniqid();

  const [inputValue, setInputValue] = useState(props.value ? props.value : "");

  return (
    <Container style={props.style ? props.style.container : null}>
      <Label htmlFor={ID} styleType={props.styleType}>
        {props.label}
      </Label>
      <Input
        placeholder={props.placeholder}
        onChange={e => {
          setInputValue(e.target.value);
          props.handleChange(e.target.value);
        }}
        onBlur={e => {
          props.handleBlur ? props.handleBlur() : void 0;
        }}
        value={inputValue}
        type="text"
        id={ID}
        styleType={props.styleType}
        aria-label={props.styleType === "thin" ? props.label : ""}
        ref={ref}
      />
    </Container>
  );
});

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  styleType: PropTypes.string
};

export default TextInput;
