import Styled, { css } from "styled-components";
import { Grid as MuiGrid } from "@material-ui/core";

export const wrapper = Styled.div``;

export const Grid = Styled(MuiGrid)`
    height: 100%;
`;

export const Content = Styled.div`
${({ backgroundImage }) => css`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${backgroundImage || ""});
  background-color: rgb(242, 229, 212);

  display: flex;
  justify-content: right;
  align-items: flex-end;
  padding: 16px;
`}
`;
