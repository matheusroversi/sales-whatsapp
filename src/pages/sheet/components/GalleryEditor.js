import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppActions } from "../../../core";
import { createPortal } from "react-dom";
import { GalleryWrapper, Footer } from "../SheetPage.styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@material-ui/core/Button";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import { ImageSearch } from "@material-ui/icons";

const GalleryEditor = ({
  row,
  rows,
  setRows,
  changes,
  setChanges,
  onClose,
  categories
}) => {
  const [checked, setChecked] = useState(row.categories || []);
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (row.images?.filter) {
      setImages(row.images.filter(item => item.url));
    }
  }, [row]);

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

    _rows[index].images = images;

    setRows(_rows);
    setChanges([...changes, row.id]);
    onClose();
  };

  const handleAddImage = e => {
    e.preventDefault();

    if (url.length > 10) {
      setImages([...images, { url: url }]);
      setUrl("");
    }
  };

  return createPortal(
    <GalleryWrapper
      onKeyDown={event => {
        if (event.key === "Escape") {
          onClose();
        }
      }}
    >
      <dialog open>
        <Paper
          component="form"
          style={{
            p: "2px 4px",
            display: "grid",
            alignItems: "center",
            width: "100%",
            paddingLeft: 8,
            gridTemplateColumns: "auto 52px"
          }}
          onSubmit={() => {
            return false;
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="http://"
            inputProps={{ "aria-label": "search images" }}
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <IconButton
            onClick={handleAddImage}
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <ImageSearch />
          </IconButton>
        </Paper>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {images.map(item => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                //alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Footer>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Ok
          </Button>
        </Footer>
      </dialog>
    </GalleryWrapper>,
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
})(GalleryEditor);
