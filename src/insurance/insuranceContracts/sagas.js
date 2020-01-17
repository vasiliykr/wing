import { put, call, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as types from './types';
import * as api from './api';
// import * as actions from './actions';
import * as actions from '../../helpers/resourceSagas/actions';
import * as deviceActions from '../insuredDevices/actions';
import { setInsuranceContract as setSprintContract } from 'subscriptions/sprint/actions';
import { setInsuranceContract as setAttContract } from 'subscriptions/att/actions';

import { findGenerator, getAllGenerator, updateGenerator, createGenerator } from 'helpers/resourceSagas';

export const find = findGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.find
});

export const fetchFiltered = getAllGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.fetchFiltered,
  endpointArgs: (payload) => [ payload.params ],
});

export const create = createGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.create,
  endpointArgs: (payload) => [ payload.params ],
});

export const activate = updateGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.activate,
});

export function* watchFind() {
  yield takeEvery(types.FIND, find);
}

export function* watchFetchFiltered() {
  yield takeLatest(types.FETCH_FILTERED, fetchFiltered);
}

export function* watchCreate() {
  yield takeLatest(types.CREATE, create);
}

export function* watchActivate() {
  yield takeLatest(types.ACTIVATE, activate);
}

export function* confirm(action) {
  const sub = [ action.payload.params.sub ];
  const { dev } = action.payload.params;
  let id, activateStatus;
  
  try {
    // create contract
    yield put(actions.createPending('insuranceContracts', {}));
    const createResponse = yield call(api.create, ...sub);
    id = createResponse.data.id;
    yield put(actions.createSucceeded('insuranceContracts', createResponse));

    // create insured device
    yield put(deviceActions.create({ contract: id, device_specs: dev.sku, plan_type: dev.insPlanId }));

    // activate contract
    yield put(actions.updatePending('insuranceContracts', {}));
    const activateResponse = yield call(api.activate, id);
    activateStatus = activateResponse.data;
    yield put(actions.updateSucceeded('insuranceContracts', activateResponse));
  }
  catch (err) {
    yield put(actions.createFailed('insuranceContracts', err));
  }
}

export function* watchConfirm() {
  yield takeLatest(types.CONFIRM, confirm);
}

export function* watchInsuranceContracts() {
  yield all([
    call(watchFind),
    call(watchFetchFiltered),
    call(watchCreate),
    call(watchActivate),
    call(watchConfirm),
  ]);
}
