import Styled from "styled-components";
import { TextField } from "@material-ui/core";

export const Container = Styled.div`    
    div.rdg {
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
    
        ::-webkit-scrollbar-thumb {
            background: #99999990; 
            border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        } 
    }


    .hightlight {
        background: #ed6c0205;

        &::before {
            borderLeft: 1px solid red;
        }
    }

    .filter-cell {
        line-height: 35px;
        padding: 0;
        > div {
            padding-block: 0;
            padding-inline: 8px;
            &:first-child {
                border-block-end: 1px solid var(--border-color);
            }
        }

        input {
            width: calc(100% - 16px);
            margin: 0 8px;
            border: 1px solid var(--border-color);
            padding: 4px;
        }
    }

    .images-gallery {
        overflow-x: auto;
        overflow-y: hidden;


        div{
            border: 1px solid white;
        }

        ::-webkit-scrollbar {
            height: 5px;
        }

        ::-webkit-scrollbar-track {
            background: white; 
        }
    
        ::-webkit-scrollbar-thumb {
            background: #2196f380; 
            border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #2196f3; 
        }
    }
`;

export const InputText = Styled(TextField)`
    .MuiInput-root {
        height: 50px;
        padding: 0 8px;
        font-size: inherit;
    }

    input {
        &:before: {
            border: none;
        }
    }
`;
export const EditorCategorie = Styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background: rgba(0,0,0,0.2);

    dialog {
        min-width: 400px;
        height: 374px;
        overflow: hidden;
        display: inline-grid;
        gap: 16px;
        grid-template-rows: 1fr;
        border: none;
        border-radius: 4px;
    }

    ul {
        ::-webkit-scrollbar {
            width: 5px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
    
        ::-webkit-scrollbar-thumb {
            background: #99999990; 
            border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
    }

`;

export const GalleryWrapper = Styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background: rgba(0,0,0,0.2);

    dialog {
        overflow: hidden;
        display: inline-grid;
        gap: 16px;
        grid-template-rows: 1fr;
        border: none;
        border-radius: 4px;
    }

    ul {
        li {
            border: 1px solid #eee;
        }

        ::-webkit-scrollbar {
            width: 5px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
    
        ::-webkit-scrollbar-thumb {
            background: #99999990; 
            border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
    }

`;

export const Footer = Styled.div`
    display: flex;
    justify-content: space-between
`;
