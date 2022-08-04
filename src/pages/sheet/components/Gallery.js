import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    height: "100%",
    alignItems: "center"
  },
  image: {
    background: "#efefef",
    backgroundPosition: "50%",
    backgroundSize: "100%",
    blockSize: "45px",
    display: "inline-block",
    inlineSize: "45px",
    verticalAlign: "middle"
  }
}));

const Gallery = ({ images = [] }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {images.map((image, key) => (
        <div
          key={key}
          className={styles.image}
          style={{ backgroundImage: `url("${image.url}")` }}
        />
      ))}
    </div>
  );
};

export default Gallery;
