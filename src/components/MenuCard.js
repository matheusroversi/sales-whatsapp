import React, { useState, useEffect, Component } from "react";
import ButtonBuy from "./ButtonBuy";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  divider: {},
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    borderBottom: "1px solid #ddd",
  },
  image: {
    width: 100,
    height: 100,
  },
  price: {
    textAlign: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  code: {
    fontSize: "12px",
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
    backgroundPosition: "50%",
  },
  description: {
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "21px",
  },
}));

const MenuCard = (props) => {
  const classes = useStyles();
  let { products } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        {products.map((product, key) => (
          <Grid key={key} item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>
              <Grid container spacing={1}>
                {/* Imagem */}
                <Grid item xs={4}>
                  <div
                    className={classes.img}
                    style={{
                      backgroundImage: `url("${product.images[0].link}")`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </Grid>

                <Grid item xs={8} container spacing={0}>
                  <Grid item xs={12} container spacing={0}>
                    <Grid item xs={8}>
                      <Typography className={classes.description}>
                        {product.description}
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
