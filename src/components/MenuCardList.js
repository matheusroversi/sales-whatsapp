import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AppActions } from "../core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuUsersItem from "./MenuUsersItem";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import sendWhatsApp from "../core/util/client/ApiWhatsApp";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { withSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "12px",
  },
  price: {
    textAlign: "right",
  },
  item: {
    borderLeft: "4px solid #35cd96",
  },
  paper: {
    margin: "12px",
    backgroundColor: "rgb(240, 240, 240)",
  },
  barGreen: {
    backgroundColor: "#35cd96",
    width: "4px",
    heigth: "auto",
  },
  buttonSend: {
    backgroundColor: "#35cd96",
    color: "#fff",
  },
  buttonCopy: {
    marginTop: "16px",
  },
  textOrder: {
    width: "50px",
    height: "50px",
  },
}));

const MenuListCard = (props) => {
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [textOrder, setTextOrder] = useState("");
  const classes = useStyles();
  const { card, me, user } = props;

  useEffect(() => {
    updateOrder();
  });

  const copyOrder = async () => {
    var text = getOrder();
    navigator.clipboard.writeText(text).then(
      function() {
        props.enqueueSnackbar("Pedido copiado!", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      },
      function(err) {
        props.enqueueSnackbar("Não consegui copiar o pedido. :(", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    );
  };

  const sendOrder = () => {
    let message = getOrder();
    sendWhatsApp(message);
  };

  const updateOrder = () => {
    // Calculo de total de produtos
    let subTotal = 0;
    card.map((item) => {
      subTotal += item.price * item.amount;
    });

    setSubTotal(subTotal);

    // Calculo de frete
    let shipping = getShipping(subTotal);
    setShipping(shipping);

    // Calculo de total geral
    setTotal(shipping + subTotal);

    //console.log("update user", user);
  };

  const getShipping = (subTotal) => {
    let table = props.me.shipping.value;

    let shipping = table.find(
      (item) =>
        (subTotal > item.min && subTotal <= item.max) ||
        (subTotal > item.min && !item.max)
    );

    //console.log(table, shipping.value);
    return shipping ? shipping.value : null;
  };

  const getOrder = () => {
    console.log("me", { me, user });

    let name = !!user ? `meu nome é *${user.name}*, ` : "";

    let order = [];
    order.push(`Olá, ${name}esse é meu pedido feito pelo *Quintal* \n`);
    order.push("-------- \n");
    card.map((product, key) => {
      order.push(
        `*${product.amount}* Und - ${product.description}: R$ ${(
          product.amount * product.price
        ).toFixed(2)} \n`
      );
    });
    order.push("-------- \n");
    order.push(`O total do pedido é R$ ${total} \n`);
    order.push(`Forma de pagamento: Transferência \n`);
    order.push("-------- \n");
    order.push(`Contato: (48) 99850-8851 \n`);
    order.push(`Número do pedido: 11 \n`);

    let message = order.join("\n ");

    return message;
  };

  return (
    <div style={{ width: "300px" }}>
      <Paper className={classes.paper}>
        <Grid>
          {card.map((product, key) => (
            <>
              <Grid
                container
                key={key}
                xs={12}
                sm={6}
                md={4}
                className={clsx(classes.root, classes.item)}
              >
                <Grid item xs={8}>
                  <Typography className={classes.description}>
                    {`${product.amount}x ${product.description}`}
                  </Typography>
                </Grid>
                <Grid xs={4} className={classes.price}>
                  <Typography color="primary">
                    R$ {(product.price * product.amount).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
            </>
          ))}

          {card.length === 0 && (
            <>
              <Grid item xs={10} className={clsx(classes.root, classes.item)}>
                <Typography className={classes.description}>
                  {`Selecione itens pra aparecer aqui :)`}
                </Typography>
              </Grid>
              <Divider />
            </>
          )}
        </Grid>

        <Grid container xs={12} sm={6} md={4} className={classes.root}>
          <Grid item xs={8}>
            <Typography className={classes.description}>{`Frete`}</Typography>
          </Grid>
          <Grid xs={4} className={classes.price}>
            <Typography color="primary">
              {typeof shipping === "number"
                ? `R$ ${shipping.toFixed(2)}`
                : "Consultar"}
            </Typography>
          </Grid>
        </Grid>

        <Grid container xs={12} sm={6} md={4} className={classes.root}>
          <Grid item xs={8}>
            <Typography className={classes.description}>{`Total`}</Typography>
          </Grid>
          <Grid xs={4} className={classes.price}>
            <Typography color="primary">R$ {total.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button
          disabled={card.length === 0}
          endIcon={<Icon>send</Icon>}
          size="large"
          variant="contained"
          className={classes.buttonSend}
          onClick={sendOrder}
        >
          Fazer Pedido!
        </Button>
        <Button
          disabled={card.length === 0}
          endIcon={<FileCopyIcon />}
          size="large"
          variant="contained"
          className={classes.buttonCopy}
          onClick={copyOrder}
        >
          Copiar Pedido
        </Button>
      </Grid>

      {/*  <textarea id="text-order" style={classes.textOrder}></textarea> */}
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
})(withSnackbar(MenuListCard));

//export default withSnackbar(MenuListCard);
