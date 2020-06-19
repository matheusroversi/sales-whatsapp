import React, { Component, Fragment, useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { connect } from "react-redux";
import { AppActions } from "../../core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import MenuCard from "../../components/MenuCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
  },
  menuPage: {
    marginTop: "64px",
  },
  tab: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

const MenuPage = (props) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const { products, categories, card, searchText, me, user } = props;

  useEffect(() => {
    if (categories.length === 0) {
      props.requestCategories();
      props.requestProducts();
      props.requestUser();
      props.requestMe();
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!categories) return "";

  return (
    <div className={classes.menuPage}>
      <Tabs
        className={classes.tab}
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        {categories.map((category, key) => (
          <Tab key={key} label={category.name} {...a11yProps(key)} />
        ))}
      </Tabs>

      {categories.map((category, key) => (
        <TabPanel
          key={key}
          value={value}
          index={key}
          categoryId={categories[value].id}
          products={products.filter((item) =>
            item.categories.includes(categories[value].name)
          )}
          card={card}
          searchText={searchText}
        ></TabPanel>
      ))}
    </div>
  );
};

function a11yProps(id) {
  return {
    id: id,
    "aria-controls": id,
  };
}

const TabPanel = (props) => {
  let { card, categoryId, products, value, index, searchText } = props;

  if (!!searchText && products.length > 0) {
    products = products.filter((value) => {
      return value.description.toSearch().indexOf(searchText.toSearch()) > 0;
    });
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <MenuCard categoryId={categoryId} products={products} card={card} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.AppReducer,
  };
};
export default connect(mapStateToProps, {
  ...AppActions,
})(MenuPage);

String.prototype.replaceAll = function(string, search, replace) {
  return string.split(search).join(replace);
};

String.prototype.toSearch = function() {
  var chars = ["aáàãäâ", "eéèëê", "iíìïî", "oóòõöô", "uúùüû", "cç"],
    value = this.toLowerCase();

  for (var i in chars) {
    var chrMap = chars[i].split("");
    chrMap.map((chr) => {
      value = value.replaceAll(value, chr, chrMap[0]);
    });
  }

  return value;
};
