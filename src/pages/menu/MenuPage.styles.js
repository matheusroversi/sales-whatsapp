import styled, { css } from "styled-components";
import Theme from "../../Themes";

export const CategoryLabel = styled.span`
  ${({ theme }) => css`
    font-size: 1.6rem;
    font-weight: 700;
    color: ${Theme[theme].palette.secondary.main};
    margin-left: ${Theme[theme].spacing(1)}px;
  `}
`;

export const Content = styled.div`
  margin-top: 64px;

  .container article {
    .MuiGrid-container {
      flex-direction: column;
    }
  }
`;

export const Borda = styled.div`
  ${({ theme }) => {
    return css`
      width: 100%;
      height: 25px;
      background-color: ${Theme[theme].palette.background.default};
      position: absolute;
      margin-top: -15px;
      border-radius: 15px;
    `;
  }}
`;

export const ImageStore = styled.div`
  ${({ url }) => css`
    width: "auto";
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: ${`url('${url}')`};
    background-position-y: center;
    background-position-x: center;
  `}
`;

export const Section = styled.div``;
