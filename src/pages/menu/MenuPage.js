import React, { Component, Fragment, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { connect } from "react-redux";
import { AppActions } from "../../core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import MenuCard from "../../components/MenuCard";
import ScrollSpyTabs from "../../components/ScrollSpyTabs";
import {
  Content,
  CategoryLabel,
  Borda,
  ImageStore,
  Section
} from "./MenuPage.styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0)
  },
  menuPage: {
    marginTop: "64px"
  }
}));

const MenuPage = props => {
  const {
    products,
    categories,
    card,
    searchText,
    me,
    user,
    requestCategories,
    requestProducts,
    theme
  } = props;
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const classes = useStyles();

  console.log(props);

  useEffect(() => {
    if (categories.length === 0) {
      requestCategories();
      requestProducts();
      // props.requestUser();
      // props.requestMe();
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!categories) return "";

  useEffect(() => {
    if (products.length > 0 && categories.length > 0) setData(parseData());
  }, [products, categories]);

  const parseData = () => {
    let data = [];
    categories.map((category, key) => {
      data.push({
        text: category.label,
        component: (
          <Section>
            <CategoryLabel theme={theme}>{category.label}</CategoryLabel>
            <MenuCard
              categoryId={category.id}
              products={products.filter(item =>
                item.categories.map(c => c.id).includes(categories[value].id)
              )}
              card={card}
            />
          </Section>
        )
      });
    });
    return data;
  };

  if (data.length === 0) return false;

  return (
    <Content>
      <ImageStore url="https://www.saboravida.com.br/wp-content/uploads/2020/12/burger-king-inaugura-em-sp-restaurante-idealizado-pelos-consumidores-1.jpg" />
      <Borda theme={theme} />
      <ScrollSpyTabs tabsInScroll={data} />
    </Content>
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

String.prototype.replaceAll = function(string, search, replace) {
  return string.split(search).join(replace);
};

String.prototype.toSearch = function() {
  var chars = ["aáàãäâ", "eéèëê", "iíìïî", "oóòõöô", "uúùüû", "cç"],
    value = this.toLowerCase();

  for (var i in chars) {
    var chrMap = chars[i].split("");
    chrMap.map(chr => {
      value = value.replaceAll(value, chr, chrMap[0]);
    });
  }

  return value;
};
