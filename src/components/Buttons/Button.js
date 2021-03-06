import React from "react";
import styled from "styled-components";

const StyledButton = styled.button.attrs(props => ({
  backgroundcolor:
    props.buttontype === "secondary"
      ? "#fff"
      : props.buttontype === "link"
      ? "transparent"
      : props.buttontype === "delete"
      ? "transparent"
      : props.theme.themeColor,
  border:
    props.buttontype === "secondary"
      ? `1px solid ${props.theme.themeColor}`
      : props.buttontype === "link"
      ? "0"
      : props.buttontype === "delete"
      ? "0"
      : "0"
}))`
  background-color: ${props => props.backgroundcolor};
  border: ${props => props.border};
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em;
  width: ${props => (props.buttonwidth ? props.buttonwidth : "auto")};
  text-decoration: none;
  display: block;
  text-align: center;
  margin: 10px;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s;

  > * {
    position: relative;
  }
  &:before {
    content: "";

    position: absolute;
    top: 50%;
    left: 50%;

    display: block;
    width: 0;
    padding-top: 0;

    border-radius: 100%;

    background-color: rgba(236, 240, 241, 0.3);

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  &:active:before {
    width: 120%;
    padding-top: 120%;

    transition: width 0.2s ease-out, padding-top 0.2s ease-out;
  }
  &:active {
    transform: ${props =>
      props.buttontype === "primary" || props.buttontype === "secondary"
        ? "translateY(2px)"
        : "translateY(0)"};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.focusBorder};
  }
`;

const StyledButtonText = styled.span.attrs(props => ({
  color:
    props.buttontype === "secondary"
      ? props.theme.themeColor
      : props.buttontype === "link"
      ? props.theme.themeColor
      : props.buttontype === "delete"
      ? props.theme.themeColorRed
      : "#fff",
  textdecoration:
    props.buttontype === "secondary"
      ? "none"
      : props.buttontype === "link"
      ? "underline"
      : props.buttontype === "delete"
      ? "underline"
      : "none"
}))`
  font-size: 1em;
  font-weight: normal;
  color: ${props => props.color};
  text-decoration: ${props => props.textdecoration};
`;

const Button = props => {
  let customStyles = {
    background:
      props.customStyles && props.customStyles.background
        ? props.customStyles.background
        : {},
    text:
      props.customStyles && props.customStyles.text
        ? props.customStyles.text
        : {}
  };

  return (
    <StyledButton
      data-testid={(props.id && `button${props.id}`) || props.dataTestid}
      onClick={props.handleClick}
      buttonwidth={props.buttonWidth}
      buttontype={props.buttonType}
      style={customStyles.background}
    >
      <StyledButtonText
        data-testid={props.id && `buttonText${props.id}`}
        buttontype={props.buttonType}
        style={customStyles.text}
      >
        {props.buttonText}
      </StyledButtonText>
    </StyledButton>
  );
};

export default Button;
