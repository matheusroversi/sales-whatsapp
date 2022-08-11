import React, { useState, useEffect, Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Content } from "./ProductCard.styles";
import AutoSizer from "react-virtualized-auto-sizer";
import * as LottiePlayer from "@lottiefiles/lottie-player";

const useStyles = makeStyles(theme => ({
  root: {
    ".MuiPaper-root": {
      minHeight: "100%"
    }
  }
}));

const ProductCard = ({ product, key, destaque }) => {
  console.log(key);

  return (
    <div style={{ height: "100%" }} key={key}>
      <Content className="content" backgroundImage={product.images[0]?.url}>
        <>
          {/* <div className="image">
                        <img src={`${product.images[0]?.url
                            ? product.images[0].url
                            : "https://www.swift-inc.com/public/images/images-empty.png"
                            }`} >
                        </img>
                    </div> */}

          {/*                     {!!destaque && (
                        <>
                            <LottiePlayer
                                autoplay
                                controls
                                loop
                                mode="normal"
                                src="images/iconPrice.json"
                                style="width: 320px"
                            ></LottiePlayer>
                        </>
                    )} */}

          <div className="info">
            <span className="name">{product.name}</span>
            <span className="price">
              R$ {product.price.toFixed(2).split(".")[0]}
              <div className="cents">
                ,{product.price.toFixed(2).split(".")[1]}
              </div>
            </span>
          </div>
        </>
      </Content>
    </div>
  );
};

export default ProductCard;
