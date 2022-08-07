import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
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

  images = images.filter ? images?.filter(item => !!item.url) : [];

  return (
    <div className={clsx(styles.root, "images-gallery")}>
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
