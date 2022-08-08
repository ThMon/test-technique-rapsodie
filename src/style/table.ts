import styled from "styled-components";

export const CustomTable = styled.table`
  width: ${(props) => props.width}px;
  margin: 25px auto;
  border-spacing: 0;
`;

export const CustomThead = styled.th`
    background-color: black;
    color: white;
    font-size: 1em:
    font-weight: 600;
    height: 40px;
`;

export const CustomTr = styled.tr`
    font-size: 0.8em:
    font-weight: 300;
    border: 1px solid black;
`;

export const CustomTd = styled.td`
    font-size: 0.8em:
    font-weight: 300;
    border: 1px solid black;
    padding: 10px;
`;
