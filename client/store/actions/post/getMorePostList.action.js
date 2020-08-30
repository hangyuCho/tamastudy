import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_MORE_POST_LIST_FAIL,
  GET_MORE_POST_LIST_REQUEST,
  GET_MORE_POST_LIST_SUCCESS,
} from '../../type';

export const getMorePostListRequestAction = (data) => ({
  type: GET_MORE_POST_LIST_REQUEST,
  data,
});

const getMorePostListAPI = (data) => {
  return axios.get(
    `/post/all?cursor=${data.cursor}&limit=${data.limit}${
      data.title ? `&title=${data.title}` : ''
    }`
  );
};

export function* getMorePostList(action) {
  try {
    const result = yield call(getMorePostListAPI, action.data);
    yield put({
      type: GET_MORE_POST_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_MORE_POST_LIST_FAIL,
      error: err.response.data,
    });
  }
}
