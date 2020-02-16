import Immutable from 'seamless-immutable';

export const Types = {
  REQUEST_DATA: 'Pessoa/REQUEST_DATA',
  SUCCESS_DATA: 'Pessoa/SUCCESS_DATA',
  FAILURE_DATA: 'Pessoa/FAILURE_DATA',

  ADICIONAR_ITEM: 'Pessoa/ADICIONAR_ITEM',
  ATUALIZAR_ITEM: 'Pessoa/ATUALIZAR_ITEM'
};

const initialState = Immutable({
  data: [],
  loading: false,
  error: null
});

export default function aplicativo(state = initialState, action) {
  switch (action.type) {
    case Types.REQUEST_DATA:
      return {
        ...state,
        loading: true
      };
    case Types.SUCCESS_DATA:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    case Types.ERROR_DATA:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case Types.ADICIONAR_ITEM:
      return {
        ...state,
        data: [...state.data, action.payload.data]
      };

    case Types.ATUALIZAR_ITEM:
      return {
        ...state,
        data: state.data.map(item => {
          if (item._id === action.payload.data._id) return action.payload.data;
          return item;
        })
      };

    default:
      return state;
  }
}

export const Creators = {
  requestList: () => ({
    type: Types.REQUEST_DATA
  }),
  successList: data => ({
    type: Types.SUCCESS_DATA,
    payload: { data }
  }),
  errorList: error => ({
    type: Types.SUCCESS_DATA,
    payload: error
  }),

  adicionarItem: data => ({
    type: Types.ADICIONAR_ITEM,
    payload: { data }
  }),

  atualizarItem: data => {
    return {
      type: Types.ATUALIZAR_ITEM,
      payload: { data }
    };
  }
};
