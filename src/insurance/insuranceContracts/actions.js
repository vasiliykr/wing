import * as types from './types';
import { actionTypes as resourceActions } from 'redux-resource';

export const find = (id) => ({
  type: types.FIND,
  payload: { id },
});

export const fetchFiltered = (params) => ({
  type: types.FETCH_FILTERED,
  payload: { params },
});

export const create = (params) => ({
  type: types.CREATE,
  payload: { params },
});

export const activate = (id) => ({
  type: types.ACTIVATE,
  payload: { id },
});

export const confirm = (params) => ({
  type: types.CONFIRM,
  payload: { params },
});
