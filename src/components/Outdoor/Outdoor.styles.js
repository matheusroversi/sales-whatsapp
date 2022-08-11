import Styled, { css } from "styled-components";

export const wrapper = Styled.div``;

export const Template01 = Styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }


    .destaque {
        grid-column: span 2;
        grid-row: span 2;
        .info {
          font-size: 5.5rem;

          .price {
            font-size: 6rem;
            .cents {
              font-size: 3rem;
              margin-top: 0.4rem;
            }

          background-image: url('images/tag_price_1.png');
          }
        }
        //animation: spin 2s linear infinite;
        background-image: url('images/background_yellow.webp');
        background-size: cover;

        .content, .MuiPaper-root {
          background-color: transparent;
        }

    }

    .info {
      font-family: 'Francois One', sans-serif;
      font-size: 3.5rem;

      color: rgb(80, 35, 20);
      font-weight: 700;
      padding: 16px;
      border-radius: 10px;
      text-align: right;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-shadow: 2px 2px white;
      width: 55%;

    }

    .price { 
      display: flex;
      font-size: 4rem;
      background: white;
      padding: 0 16px;

      .cents {
        font-size: 1.2rem;
        margin-top: 0.4rem;
      }
    }

`;
