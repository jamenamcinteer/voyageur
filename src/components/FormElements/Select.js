import React, { useState } from "react";

const Select = props => {
  const style = {
    container: {
      margin: "20px 0"
    },
    label: {
      display: "block",
      fontSize: ".8em",
      fontFamily: "Roboto",
      fontWeight: "bold",
      color: props.theme.darkFont
    },
    input: {
      width: "100%",
      borderRadius: "5px",
      border: `2px solid ${props.theme.themeColorSecondary}`,
      fontSize: "1em",
      padding: "7px 10px",
      color: props.theme.darkFont
    },
    inputFocus: {
      outline: "0",
      border: `2px solid ${props.theme.themeColor}`
    }
  };

  const [inputStyles, setInputStyles] = useState(style.input);

  const ID =
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9);

  const [inputValue, setInputValue] = useState(props.value ? props.value : "");

  return (
    <div style={style.container}>
      <label style={style.label} htmlFor={ID}>
        {props.label}
      </label>
      <select
        style={inputStyles}
        onFocus={e => setInputStyles({ ...style.input, ...style.inputFocus })}
        onBlur={e => setInputStyles(style.input)}
        onChange={e => {
          setInputValue(e.target.value);
          props.handleChange(e.target.value);
        }}
        value={inputValue}
        id={ID}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {props.options.length > 0 &&
          props.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;
