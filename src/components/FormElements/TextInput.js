import React, { useState } from "react";

const TextInput = props => {
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
      <input
        style={inputStyles}
        placeholder={props.placeholder}
        onFocus={e => setInputStyles({ ...style.input, ...style.inputFocus })}
        onBlur={e => {
          setInputStyles(style.input);
          if (props.handleBlur) props.handleBlur();
        }}
        onChange={e => {
          setInputValue(e.target.value);
          props.handleChange(e.target.value);
        }}
        value={inputValue}
        type="text"
        id={ID}
      />
    </div>
  );
};

export default TextInput;
