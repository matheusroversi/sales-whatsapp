import React from "react";
import NumberFormat from "react-number-format";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      autoFocus={true}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      isNumericString
      prefix="R$ "
      decimalSeparator=","
      decimalScale="2"
      fixedDecimalScale={true}
      allowNegative={false}
      autoComplete="off"
    />
  );
});

export default NumberFormatCustom;
