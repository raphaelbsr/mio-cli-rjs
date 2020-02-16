import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { withFormik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Grid, FormControlLabel, Switch } from '@material-ui/core';

import { ActionDialog } from 'mio-library-ui';

import { Creators as _PessoaActions } from '~/store/ducks/pessoa';
import api from '~/services/api';

import { InputTextField } from '~/components/Inputs';

const InputSwitch = ({ field, ...props }) => (
  <FormControlLabel
    control={<Switch color="primary" {...field} {...props} />}
    label="Ativo"
  />
);

const Form = props => {
  const { isSubmitting, submitForm, values, isOpen, handleClose } = props;
  return (
    <ActionDialog
      title="Cadastro de Pessoa"
      isOpen={isOpen}
      onClose={handleClose}
      onCancelClick={handleClose}
      okLabel="Salvar"
      onOkClick={submitForm}
      isOkProcessing={isSubmitting}
    >
      <>
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Field
              label="Nome"
              placeholder="Nome"
              name="nome"
              value={values?.nome}
              component={InputTextField}
            />
            <ErrorMessage name="nome" />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="row" justify="flex-end">
          <Grid item xl={2} lg={2} md={2} sm={2} xs={12}>
            <Field
              name="ativo"
              label="Ativo"
              checked={values.ativo}
              component={InputSwitch}
            />
          </Grid>
        </Grid>
      </>
    </ActionDialog>
  );
};

const salvar = async values => {
  try {
    const { data, status } = await api.post('/pessoa', values);
    if (status === 200) {
      NotificationManager.success(
        'Pessoa adicionada com sucesso',
        'Tudo certo!',
        4000
      );
      return data;
    }
    const { message } = data.error;
    NotificationManager.error(message, 'Ops!', 4000);
    return false;
  } catch (err) {
    NotificationManager.error(err.message, 'Ops!', 4000);
  }
};

const atualizar = async values => {
  try {
    const { data, status } = await api.put(`/pessoa/${values._id}`, values);

    if (status === 200) {
      NotificationManager.success(
        'Pessoa atualizado com sucesso',
        'Tudo certo!',
        4000
      );
      return data;
    }
    const { message } = data.error;
    NotificationManager.error(message, 'Ops!', 4000);
    return false;
  } catch (err) {
    NotificationManager.error(err.message, 'Ops!', 4000);
  }
};

const schema = Yup.object().shape({
  identificador: Yup.string().required('Informe o identificador'),
  nome: Yup.string().required('Informe o nome')
});

const comFormik = withFormik({
  mapPropsToValues: props => {
    if (props.formValues) {
      const { _id, nome, ativo } = props.formValues;
      return {
        _id,
        nome,
        ativo
      };
    }
  },
  handleSubmit: async (values, actions) => {
    const { handleClose } = actions.props;
    const { adicionarItem, atualizarItem } = actions.props.PessoaActions;
    const { resetForm } = actions;

    if (values._id) {
      const item = await atualizar(values);
      if (item) {
        atualizarItem(item);
        resetForm();
        handleClose();
      }
    } else {
      const item = await salvar(values);
      if (item) {
        adicionarItem(item);
        resetForm();
        handleClose();
      }
    }

    actions.setSubmitting(false);
  },
  enableReinitialize: true,
  isInitialValid: false,
  validateOnChange: true,
  validateOnBlur: true,
  displayName: 'PessoaForm',
  validationSchema: schema
});

Form.defaultProps = {
  formValues: {
    _id: null,
    identificador: '',
    nome: '',
    ativo: true
  }
};

const mapDispatchToProps = dispatch => ({
  PessoaActions: bindActionCreators(_PessoaActions, dispatch)
});

export default connect(null, mapDispatchToProps)(comFormik(Form));
