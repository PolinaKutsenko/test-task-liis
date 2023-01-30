import {
  call, takeEvery, put, select,
} from 'redux-saga/effects';
import Axios from 'axios';
import { fetchData } from '../hotelsSlice.js';
import { setUrl, fetchFailed, setSearchParams } from '../searchSlice.js';
import sagaActions from './sagaActions.js';
import { formatDate } from '../../components/HotelPage/HotelPage.jsx';

const callAPI = async ({ url, method, data }) => {
  const result = await Axios({ url, method, data });
  return result;
};

export function* fetchDataSaga() {
  yield put(setUrl());
  const url = yield select(({ searchParams }) => searchParams.url);
  try {
    const result = yield call(() => callAPI({ url }));
    console.log('saga successful', result.data);
    yield put(fetchData(result.data));
  } catch (e) {
    console.log(e);
    yield put(fetchFailed());
  }
}

function* initialSaga() {
  const date = yield select(({ calendar }) => calendar.date);
  const initialValues = {
    location: 'Moscow',
    date: formatDate(date),
    days: '1',
  };
  yield put(setSearchParams(initialValues));
  yield fetchDataSaga();
}

export default function* rootSaga() {
  yield initialSaga();
  yield takeEvery(sagaActions.fetch_data, fetchDataSaga);
}
