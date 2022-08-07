import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useContext,
  createContext
} from "react";
import { connect } from "react-redux";
import { AppActions } from "../../core";
import DataGrid, { TextEditor } from "react-data-grid";
import { useFocusRef } from "./hooks/useFocusRef";
import { formatCurrency } from "numerical-fns";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import Gallery from "./components/Gallery";
import NumberFormat from "./components/NumberFormat";
import { InputText, Container } from "./SheetPage.styles";
import ListEditor from "./components/ListEditor";
import GalleryEditor from "./components/GalleryEditor";
import HeaderPage from "../../components/HeaderPage";
import Button from "@material-ui/core/Button";
import {
  Save,
  AddCircleOutline,
  FilterList,
  Delete,
  FileCopy
} from "@material-ui/icons";
import { FilterAlt, FilterAltOff } from "@mui/icons-material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Badge from "@mui/material/Badge";
import { useProducts } from "../../hooks/useProducts";
import { css } from "styled-components";
import { IconButton } from "@material-ui/core";
import { withSnackbar } from "notistack";

const ptBR = {
  locale: "pt-br",
  currency: "BRL",
  largeNumbers: {
    thousand: "thousand",
    million: "million",
    billion: "billion",
    trillion: "trillion"
  }
};

const filterColumnClassName = "filter-cell";

const filterClassname = css`
  inline-size: 100%;
  padding: 4px;
  font-size: 14px;
`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    marginTop: 90
  },
  menuPage: {
    marginTop: "64px"
  },
  tab: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff"
  }
}));

function rowKeyGetter(row) {
  return row.id;
}

function getComparator(sortColumn) {
  switch (sortColumn) {
    case "id":
      return (a, b) => {
        return a[sortColumn] > b[sortColumn];
      };
    /* case 'name':
				return (a, b) => {
					return a[sortColumn].localeCompare(b[sortColumn]);
				};
			case 'available':
				return (a, b) => {
					return a[sortColumn] === b[sortColumn] ? 0 : a[sortColumn] ? 1 : -1;
				}; */
    case "name":
      return (a, b) => {
        return a[sortColumn] > b[sortColumn];
      };

    case "price":
      return (a, b) => {
        return a[sortColumn] - b[sortColumn];
      };

    case "destaque":
      return (a, b) => {
        return !!a[sortColumn] > !!b[sortColumn];
      };
    default:
      throw new Error(`unsupported sortColumn: "${sortColumn}"`);
  }
}

function inputStopPropagation(event) {
  if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.stopPropagation();
  }
}

const FilterContext = createContext(undefined);

function FilterRenderer(props) {
  const { isCellSelected, column, children } = props;

  const filters = useContext(FilterContext);
  const { ref, tabIndex } = useFocusRef(isCellSelected);

  return (
    <>
      <div>{column.name}</div>
      {filters.enabled && children({ ref, tabIndex, filters })}
    </>
  );
}

function SheetPage({
  theme,
  products,
  categories,
  requestCategories,
  requestProducts,
  enqueueSnackbar
}) {
  const classes = useStyles();
  const gridRef = useRef(null);

  const { saveProducts, deleteProduct } = useProducts();

  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const [changes, setChanges] = useState([]);
  const [sortColumns, setSortColumns] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    categories: "",
    price: "",
    enabled: false
  });

  useEffect(() => {
    console.log("changes", rows);
    console.log(gridRef);
  }, [rows]);

  const loadData = async () => {
    await requestProducts();
    await requestCategories();
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteRow = async row => {
    if (!row.id) {
      const newRows = rows.filter(item => !!item.id);
      return setRows(newRows);
    }

    try {
      await deleteProduct(row.id);
      await requestProducts();
      enqueueSnackbar("Produto removido com sucesso", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Ocorreu um erro ao remover o produto", {
        variant: "error"
      });
    }
  };

  const columns = [
    {
      key: "id",
      name: "ID",
      width: 50,
      resizable: true,
      sortable: true
    },
    {
      key: "name",
      name: "Nome",
      width: 350,
      resizable: true,
      sortable: true,
      editor: TextEditor,
      headerCellClass: filters.enabled ? filterColumnClassName : "",
      headerRenderer: p => {
        if (filters.disabled) return false;
        return (
          <FilterRenderer {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                className={filterClassname}
                value={filters.name}
                onChange={e =>
                  setFilters({
                    ...filters,
                    name: e.target.value
                  })
                }
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterRenderer>
        );
      },
      summaryFormatter: props => {
        return (
          <div key={`${props.column.key}-${props.row.id}`}>
            <strong>Total</strong>: {rows.length} produtos
          </div>
        );
      }
    },
    {
      key: "categories",
      name: "Categoria",
      width: 300,
      resizable: true,
      sortable: false,
      formatter: ({ row }) => {
        return row.categories.map(categorie => categorie.label).join(", ");
      },
      editor: props => {
        return (
          <ListEditor
            {...props}
            setRows={setRows}
            rows={rows}
            changes={changes}
            setChanges={setChanges}
            gridRef={gridRef}
          />
        );
      },
      headerCellClass: filters.enabled ? filterColumnClassName : "",
      headerRenderer: p => (
        <FilterRenderer {...p}>
          {({ filters, ...rest }) => (
            <input
              {...rest}
              className={filterClassname}
              value={filters.categories}
              onChange={e =>
                setFilters({
                  ...filters,
                  categories: e.target.value
                })
              }
              onKeyDown={inputStopPropagation}
            />
          )}
        </FilterRenderer>
      )
    },
    {
      key: "destaque",
      name: "Destaque",
      width: 50,
      resizable: true,
      sortable: true,
      formatter: ({ row, column, onRowChange }) => {
        return (
          <Switch
            onChange={() => {
              onRowChange({ ...row, [column.key]: !row.destaque });
            }}
            checked={row.destaque}
            size="small"
          />
        );
      }
    },
    {
      key: "images",
      name: "Imagens",
      resizable: true,
      sortable: false,
      width: 200,
      formatter: ({ row }) => {
        return <Gallery images={row.images} />;
      },
      editor: props => {
        return (
          <GalleryEditor
            {...props}
            setRows={setRows}
            rows={rows}
            changes={changes}
            setChanges={setChanges}
            gridRef={gridRef}
          />
        );
      },
      onPaste: x => console.log(x)
    },
    {
      key: "price",
      name: "Preço",
      resizable: true,
      sortable: true,
      formatter: ({ row }) => {
        return formatCurrency(row.price, {
          locale: ptBR,
          asLargeNumber: false,
          useParentesis: false
        });
      },
      editor: ({ row, column, onRowChange }) => {
        const updateData = value => {
          onRowChange({ ...row, [column.key]: parseToNumber(value) });
        };
        function parseToNumber(value) {
          return parseFloat(value.replace("R$ ", "").replace(",", "."));
        }
        return (
          <InputText
            className="editor-currency"
            value={row.price}
            onChange={({ target }) => {
              updateData(target.value);
            }}
            InputProps={{
              inputComponent: NumberFormat
            }}
          />
        );
      },
      headerCellClass: filters.enabled ? filterColumnClassName : "",
      headerRenderer: p => (
        <FilterRenderer {...p}>
          {({ filters, ...rest }) => (
            <input
              {...rest}
              className={filterClassname}
              value={filters.price}
              onChange={e =>
                setFilters({
                  ...filters,
                  price: e.target.value
                })
              }
              onKeyDown={inputStopPropagation}
            />
          )}
        </FilterRenderer>
      )
    },
    {
      key: "status",
      name: "",
      width: 150,
      resizable: false,
      sortable: false,
      formatter: props => {
        console.log(props);
        const { row, column, onRowChange } = props;
        return (
          <ButtonGroup variant="circle" aria-label="outlined button group">
            <IconButton onClick={() => newRow(row)}>
              <FileCopy color={"primary"} />
            </IconButton>

            <IconButton>
              <Delete onClick={() => deleteRow(row)} color={"primary"} />
            </IconButton>
          </ButtonGroup>
        );
      }
    }
  ];

  useEffect(() => {
    parseDataProducts();
  }, [products]);

  const parseDataProducts = () => {
    const dataRows = [];

    products.map(
      ({ id, name, categories, destaque, images, price, status }) => {
        dataRows.push({
          id,
          name,
          categories,
          destaque,
          images,
          price,
          status
        });
      }
    );

    setRows(dataRows);
  };

  function handleFill({ columnKey, sourceRow, targetRow }) {
    return { ...targetRow, [columnKey]: sourceRow[columnKey] };
  }

  function handlePaste({
    sourceColumnKey,
    sourceRow,
    targetColumnKey,
    targetRow
  }) {
    const incompatibleColumns = ["email", "zipCode", "date"];
    if (
      sourceColumnKey === "avatar" ||
      ["id", "avatar"].includes(targetColumnKey) ||
      ((incompatibleColumns.includes(targetColumnKey) ||
        incompatibleColumns.includes(sourceColumnKey)) &&
        sourceColumnKey !== targetColumnKey)
    ) {
      return targetRow;
    }

    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey] };
  }

  function handleCopy({ sourceRow, sourceColumnKey }) {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(sourceRow[sourceColumnKey]);
    }
  }

  function validateForm(products) {
    if (products.some(item => !item.id && !item.name)) {
      enqueueSnackbar("Hey, tem nome de produto em branco!", {
        variant: "warning"
      });
      return false;
    }

    return true;
  }

  const handleSave = async () => {
    const productsToUpdate = rows.filter(
      item => changes.includes(item.id) || !item.id
    );

    if (!validateForm(productsToUpdate)) {
      return false;
    }

    try {
      const result = await saveProducts(productsToUpdate);
      console.log("salvo", result);

      setChanges([]);
      enqueueSnackbar("Produtos atualizados", { variant: "success" });
      requestProducts();
    } catch (error) {
      console.log("ocorreu um erro ao tentar salvar");
      enqueueSnackbar("Oou! Ocorreu um erro ao tentar salvar", {
        variant: "error"
      });
    }
  };

  const summaryRows = useMemo(() => {
    const summaryRow = {
      id: rows.length
    };
    return [summaryRow];
  }, [rows]);

  const sortedRows = useMemo(() => {
    console.log(rows, sortColumns);
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  const filteredRows = useMemo(() => {
    const _rows = rows.filter(r => {
      return (
        (filters.name
          ? String(r.name)
              .toLowerCase()
              .includes(String(filters.name).toLowerCase())
          : true) &&
        (filters.price ? String(r.price).includes(filters.price) : true) &&
        (filters.categories
          ? String(r.categories.map(item => item.label).join(","))
              .toLowerCase()
              .includes(String(filters.categories).toLowerCase())
          : true)
      );
    });

    if (sortColumns.length === 0) return _rows;

    return [..._rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, filters, sortColumns]);

  function clearFilters() {
    setFilters({
      ...filters,
      enabled: !filters.enabled,
      name: "",
      categories: "",
      price: ""
    });
  }

  function toggleFilters() {
    setFilters(filters => ({
      ...filters,
      enabled: !filters.enabled
    }));

    if (filters.enabled) {
      clearFilters();
    }
  }

  const newRow = object => {
    let _row = [];

    object
      ? _row.push({ ...object, id: undefined })
      : _row.push({
          name: "",
          categories: [],
          images: [],
          price: 0,
          destaque: undefined
        });

    setRows([..._row, ...rows]);

    setTimeout(() => {
      gridRef.current.scrollToRow(0);
      gridRef.current.selectCell({ rowIdx: 0, idx: 1 }, true);
    }, 100);
  };

  const totalChanges = () => {
    const newRows = rows.filter(item => !item.id).length || 0;

    return changes.length + newRows;
  };

  return (
    <Container>
      <HeaderPage
        title="Produtos"
        actions={
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={toggleFilters}>
              {!filters.enabled ? (
                <FilterAlt color="primary" />
              ) : (
                <FilterAltOff color="primary" />
              )}
            </Button>
            <Button disabled={totalChanges() === 0} onClick={handleSave}>
              <Badge
                badgeContent={totalChanges() || undefined}
                color={"warning"}
              >
                <Save color={totalChanges() === 0 ? "inherit" : "primary"} />
              </Badge>
            </Button>

            <Button onClick={() => newRow()}>
              <AddCircleOutline color={"primary"} />
            </Button>
          </ButtonGroup>
        }
      />
      <FilterContext.Provider value={filters}>
        <DataGrid
          key={`teste-${rows.length}`}
          ref={gridRef}
          style={{
            height: "calc(100vh - 202px)"
          }}
          columns={columns}
          rows={filteredRows}
          headerRowHeight={filters.enabled ? 74 : undefined}
          rowKeyGetter={rowKeyGetter}
          onRowsChange={(rows, row) => {
            const index = row.indexes[0];
            if (rows[index].id && !changes.includes(rows[index].id))
              setChanges([...changes, rows[index].id]);
            setRows(rows);
          }}
          onFill={handleFill}
          onCopy={handleCopy}
          onPaste={handlePaste}
          rowHeight={50}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          rowClass={row => {
            return changes.includes(row.id) || !row.id ? "hightlight" : "";
          }}
          summaryRows={summaryRows}
          defaultColumnOptions={{
            sortable: true,
            resizable: true
          }}
          sortable
          sortColumns={sortColumns}
          onSortColumnsChange={setSortColumns}
          past
          // direction={direction}
        />
      </FilterContext.Provider>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    ...state.AppReducer
  };
};

export default connect(mapStateToProps, {
  ...AppActions
})(withSnackbar(SheetPage));
