import * as React from "react";
import { connect } from "react-redux";
import { AppActions } from "../../../core";
import { createPortal } from "react-dom";
import { EditorCategorie, Footer } from "../SheetPage.styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch
} from "@mui/material";
import TagIcon from "@mui/icons-material/Discount";
import Button from "@material-ui/core/Button";

const ListEditor = ({
  row,
  rows,
  setRows,
  changes,
  setChanges,
  onClose,
  categories
}) => {
  const [checked, setChecked] = React.useState(row.categories || []);

  const handleToggle = value => () => {
    const currentIndex = checked.findIndex(item => item.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleSave = () => {
    const index = rows.findIndex(item => item.id === row.id);
    const _rows = rows;
    _rows[index].categories = checked;
    setRows(_rows);
    setChanges([...changes, row.id]);
    onClose();
  };

  return createPortal(
    <EditorCategorie
      onKeyDown={event => {
        if (event.key === "Escape") {
          onClose();
        }
      }}
    >
      <dialog open>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            overflow: "auto"
          }}
          subheader={<ListSubheader>Categorias</ListSubheader>}
        >
          {categories.map(categorie => {
            return (
              <ListItem>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                <ListItemText
                  id="switch-list-label-wifi"
                  primary={categorie.label}
                />
                <Switch
                  edge="end"
                  onChange={handleToggle(categorie)}
                  checked={checked.some(item => item.id === categorie.id)}
                  inputProps={{
                    "aria-labelledby": "switch-list-label-wifi"
                  }}
                />
              </ListItem>
            );
          })}
        </List>
        <Footer>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Ok
          </Button>
        </Footer>
      </dialog>
    </EditorCategorie>,
    document.body
  );
};

const mapStateToProps = state => {
  return {
    ...state.AppReducer
  };
};
export default connect(mapStateToProps, {
  ...AppActions
})(ListEditor);
