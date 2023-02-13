import {
  call, takeEvery, put, select,
} from 'redux-saga/effects';
import Axios from 'axios';
import { fetchData } from '../hotelsSlice.js';
import { setUrl, fetchFailed, setSearchParams } from '../searchSlice.js';
import sagaActions from './sagaActions.js';

const callAPI = async ({ url, method, data }) => {
  const result = await Axios({ url, method, data });
  return result;
};

export function* fetchDataSaga() {
  yield put(setUrl());
  const url = yield select(({ searchParams }) => searchParams.url);
  try {
    const result = yield call(() => callAPI({ url }));
    yield put(fetchData(result.data));
  } catch (e) {
    yield put(fetchFailed());
  }
}

function* initialSaga() {
  const date = yield select(({ calendar }) => calendar.date);
  const initialValues = {
    location: 'Москва',
    date,
    days: '1',
  };
  yield put(setSearchParams(initialValues));
  yield call(fetchDataSaga);
}

export default function* rootSaga() {
  yield call(initialSaga);
  yield takeEvery(sagaActions.fetch_data, fetchDataSaga);
}
