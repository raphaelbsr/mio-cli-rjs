import React, { useState } from 'react';

import { Box, TableCell } from '@material-ui/core';
import DataTable from '~/components/DataTable';
import { Edit as EditIcon, ThumbUp, ThumbDown } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  },
  paper: {
    width: '100%',
    height: '100%'
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  inativo: {
    color: theme.palette.error.light
  },
  ativo: {
    color: theme.palette.secondary.dark
  },
  tableCellToRigh: {
    textAlign: 'right'
  }
}));

const Table = props => {
  const { data: apps, onItemClick, isLoading } = props;
  const [searchText, setSearchText] = useState('');
  const classes = useStyles();

  const columns = [
    {
      name: 'nome',
      label: 'Nome'
    },
    {
      name: 'ativo',
      label: 'Ativo',
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowIndex } = tableMeta;
          const app = apps[rowIndex];
          return (
            <Box className={classes.box}>
              {app.ativo ? (
                <ThumbUp className={classes.ativo} />
              ) : (
                <ThumbDown className={classes.inativo} />
              )}
            </Box>
          );
        }
      }
    },
    {
      name: 'opcoes',
      label: 'Ações',
      options: {
        filter: true,
        sort: false,
        empty: true,
        customHeadRender: ({ index, ...column }) => {
          return (
            <TableCell className={classes.tableCellToRigh} key={index}>
              {column.label}
            </TableCell>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData, rowIndex } = tableMeta;
          return (
            <Box className={classes.tableCellToRigh}>
              <IconButton
                color="primary"
                aria-label="Editar"
                onClick={() => {
                  const app = apps[rowIndex];
                  onItemClick('edit', app);
                }}
              >
                <EditIcon color="primary" />
              </IconButton>
            </Box>
          );
        }
      }
    }
  ];

  const options = {
    filterType: 'textField',
    selectableRows: 'none',
    searchText,
    onSearchChange: search => {
      setSearchText(search);
    },
    responsive: 'stacked',
    print: false,
    download: false
  };

  return (
    <DataTable
      title="Pessoas"
      data={apps}
      columns={columns}
      options={options}
      isLoading={isLoading}
    />
  );
};

export default Table;
