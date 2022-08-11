import React, { useEffect } from "react";
import { connect } from "react-redux";
import { AppActions } from "../../core";
import MenuCard from "../../components/Outdoor/Outdoor";

const MenuPage = props => {
  const { products, card, requestProducts } = props;

  useEffect(() => {
    requestProducts();
  }, []);

  return (
    <div>
      <MenuCard products={products} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.AppReducer
  };
};
export default connect(mapStateToProps, {
  ...AppActions
})(MenuPage);
