import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 0;
`;
const Label = styled.label`
  display: block;
  font-size: 0.8em;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.themeColorSecondary};
  font-size: 1em;
  padding: 7px 10px;

  &:focus {
    outline: 0;
    border: 2px solid ${props => props.theme.themeColor};
  }
`;

const TextInput = props => {
  const ID =
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9);

  const [inputValue, setInputValue] = useState(props.value ? props.value : "");

  return (
    <Container>
      <Label htmlFor={ID}>{props.label}</Label>
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
      />
    </Container>
  );
};

export default TextInput;
