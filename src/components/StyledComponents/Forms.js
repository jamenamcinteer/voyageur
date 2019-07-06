import styled from "styled-components";

export const MainButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonContainer = styled.div.attrs(props => ({
  gridTemplateColumns: props => (props.showDelete ? "1fr 1fr" : "1fr")
}))`
  margin: 0 -10px;
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumns};
`;
