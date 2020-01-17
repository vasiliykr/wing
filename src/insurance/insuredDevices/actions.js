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

export const create = (attrs) => ({
  type: types.CREATE,
  payload: { attrs },
});
