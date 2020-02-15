import { call, put } from 'redux-saga/effects';
import api from '~/services/api';

import { Creators as PessoaActions } from '../ducks/pessoa';

export function* carregarLista(action) {
  try {
    const response = yield call(api.get, '/lowerName');
    yield put(PessoaActions.successList(response.data));
  } catch ({ response }) {
    if (response) {
      yield put(PessoaActions.errorList(response.data));
    } else {
      yield put(
        PessoaActions.errorList('Não foi possível completar a requisição')
      );
    }
  }
}
