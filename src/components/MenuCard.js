import React, { useState, useEffect, Component } from "react";
import ButtonBuy from "./ButtonBuy";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  divider: {},
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    borderBottom: "1px solid #ddd",
    boxShadow: "none"
  },
  image: {
    width: 100,
    height: 100
  },
  price: {
    textAlign: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  code: {
    fontSize: "12px"
  },
  img: {
    minHeight: "100px",
    width: "100%",
    height: "100%",
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "4px",
    backgroundPosition: "50%"
  },
  description: {
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "21px"
  },
  menuItem: {
    padding: "5px"
  }
}));

const MenuCard = ({ products }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        {products.map((product, key) => (
          <Grid
            key={key}
            item
            xs={12}
            sm={6}
            md={4}
            className={classes.menuItem}
          >
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                {/* Imagem */}
                <Grid item xs={4}>
                  <div
                    className={classes.img}
                    style={{
                      backgroundImage: `url("${
                        product.images[0]?.url
                          ? product.images[0].url
                          : "https://www.swift-inc.com/public/images/images-empty.png"
                      }")`,
                      backgroundSize: "cover"
                    }}
                  ></div>
                </Grid>

                <Grid item xs={8} container spacing={0}>
                  <Grid item xs={12} container spacing={0}>
                    <Grid item xs={8}>
                      <Typography className={classes.description}>
                        {product.name}
                      </Typography>
                    </Grid>
                    <Grid
                      xs={4}
                      item
                      container
                      spacing={0}
                      className={classes.price}
                    >
                      <Typography color="primary">
                        R$ {product.price.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <ButtonBuy product={product} />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MenuCard;
