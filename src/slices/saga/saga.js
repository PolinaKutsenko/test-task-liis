import {
  call, takeEvery, put, /* select, */
} from 'redux-saga/effects';
import Axios from 'axios';
import { fetchData } from '../hotelsSlice.js';
import { /* setUrl, */fetchFailed } from '../searchSlice.js';
import sagaActions from './sagaActions.js';

const callAPI = async ({ url, method, data }) => {
  const result = await Axios({ url, method, data });
  return result;
};

/* const callAPI = async (url) => {
  const result = await axios.get(url, {
    params: {
      location: 'Moscow',
      currency: 'rub',
      checkIn: '2023-01-30',
      checkOut: '2023-01-31',
      limit: '10',
    },
  });
  return result;
}; */

export function* fetchDataSaga() {
  // yield put(setUrl());
  // const url = yield select(({ searchParams }) => searchParams.url);
  try {
    console.log('saga try before fetch');
    const result = yield call(() => callAPI({
      url: 'http://engine.hotellook.com/api/v2/cache.json?location=Moscow&currency=rub&checkIn=2023-02-10&checkOut=2023-02-12&limit=10',
    }));
    console.log('saga try', result.data);
    yield put(fetchData(result.data));
  } catch (e) {
    console.log(e);
    yield put(fetchFailed());
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.fetch_data, fetchDataSaga);
}
