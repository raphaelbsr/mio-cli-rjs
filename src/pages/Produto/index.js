import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  NotificationContainer
} from 'react-notifications';

import { Creators as _ProdutoActions } from '~/store/ducks/produto';

import Form from './components/Form';
import Table from './components/Table';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
    top: 'auto',
    right: theme.spacing(4),
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
}));

const initialsFormValues = {
  _id: null,
  nome: '',
  ativo: 1
};

const Produtos = props => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialsFormValues);
  const { requestList } = props.ProdutoActions;
  const { data, isLoading } = props;

  useEffect(() => {
    requestList();
  }, [requestList]);

  const openForm = () => {
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
  };

  const handleClickEditItem = formValues => {
    setFormValues(formValues);
    openForm();
  };

  const handleClickItem = (event, data) => {
    const functions = {
      edit: handleClickEditItem
    };
    functions[event](data);
  };

  const handleClickAddItem = () => {
    setFormValues(initialsFormValues);
    openForm();
  };

  return (
    <Box>
      <NotificationContainer />
      <Form isOpen={isOpen} handleClose={closeForm} formValues={formValues} />
      <Table data={data} onItemClick={handleClickItem} isLoading={isLoading} />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleClickAddItem}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

const mapStateToProps = state => ({
  data: state.produto.data,
  isLoading: state.produto.loading
});

const mapDispatchToProps = dispatch => ({
  ProdutoActions: bindActionCreators(_ProdutoActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Produtos);
