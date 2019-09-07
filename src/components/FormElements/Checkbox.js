import React from "react";
import styled from "styled-components";
// import uniqid from "uniqid";
import PropTypes from "prop-types";

// const Container = styled.div`
//   margin: 20px 0;
// `;
// const Label = styled.label`
//   display: block;
//   font-size: 0.8em;
//   font-weight: bold;
// `;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 4px;
  top: -3px;
  position: relative;
  width: 20px;
  height: 20px;
`;

const StyledCheckbox = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: ${props => (props.checked ? props.theme.themeColorLight : "#FFF")}
  border-radius: 5px;
  transition: all 150ms;
  border-radius: 5px;
  border: 2px solid ${props =>
    !props.checked
      ? props.theme.themeColorSecondary
      : props.theme.themeColorLight};
  margin-right: 10px;

  ${HiddenCheckbox}:focus + & {
    outline: 0;
    border: 2px solid ${props => props.theme.focusBorder};
    /* border: 0;
    box-shadow: inset 0 0 0 3px ${props => props.theme.themeColor}; */
  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")}
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const TextInput = props => {
  // const ID = uniqid();

  // const [inputValue, setInputValue] = useState(props.value ? props.value : "");

  return (
    <label style={props.style ? props.style.label : null}>
      <CheckboxContainer>
        <HiddenCheckbox checked={props.checked} onChange={props.handleChange} />
        <StyledCheckbox checked={props.checked}>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      <span>{props.label}</span>
    </label>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
  // handleBlur: PropTypes.func
};

export default TextInput;
