import React, { useState, useEffect, Component } from "react";
import Grid from "@material-ui/core/Grid";
import { ProductCard } from "./components/productCard";
import { Template01 } from "./Outdoor.styles";

const generateOutdoor = products => {
  const data = {
    id: "",
    layout: "layout_one",
    order: 0,
    background: "",
    items: products.slice(2, 7),
    destaque: products.slice(0, 1)
  };

  return data;
};

const Outdoor = ({ products }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(generateOutdoor(products));
  }, [products]);

  if (!data) return false;

  return (
    <Template01>
      <div className="destaque">
        {data.destaque.map((product, key) => (
          <>
            <div className="background"></div>
            <ProductCard product={product} key={key} destaque={true} />
          </>
        ))}
      </div>
      {data.items.map((product, key) => (
        <ProductCard product={product} key={key} destaque={false} />
      ))}
    </Template01>
  );
};

export default Outdoor;
