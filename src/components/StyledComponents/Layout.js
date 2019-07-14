import styled from "styled-components";

export const Container = styled.div`
  margin: 20px;
`;

export const CardContainer = styled.div`
  margin: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
