import styled, { css } from "styled-components";
import Theme from "../../Themes";

console.log(Theme.light);

export const CategoryLabel = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${Theme.light.palette.secondary.main};
  margin-left: ${Theme.light.spacing(1)}px;
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
  width: 100%;
  height: 25px;
  background: white;
  position: absolute;
  margin-top: -15px;
  border-radius: 15px;
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
