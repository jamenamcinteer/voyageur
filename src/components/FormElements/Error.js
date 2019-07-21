import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledError = styled.div`
  color: ${props => props.theme.themeColorRed};

  &:first-child {
    margin-top: -10px;
  }
`;

const Error = props => {
  return (
    <React.Fragment>
      {props.errors.filter(err => err.field === props.field).length > 0 &&
        props.errors.map((err, index) => {
          if (err.field === props.field) {
            return (
              <StyledError
                key={index}
                style={props.style}
                data-testid={props.dataTestid}
              >
                {err.error}
              </StyledError>
            );
          }
          return true;
        })}
    </React.Fragment>
  );
};

Error.propTypes = {
  errors: PropTypes.array.isRequired,
  field: PropTypes.string,
  style: PropTypes.object,
  dataTestid: PropTypes.string
};

export default Error;
