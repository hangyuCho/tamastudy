import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_POST_LIST_FAIL,
  GET_POST_LIST_REQUEST,
  GET_POST_LIST_SUCCESS,
} from '../../type';

export const getPostListRequestAction = (data) => ({
  type: GET_POST_LIST_REQUEST,
  data,
});

const getPostListAPI = (data) => {
  if (data) {
    if (data.title && data.CategoryId) {
      return axios.get(
        `/post/all?title=${data.title}&CategoryId=${data.CategoryId}`
      );
    }
    if (data.title) {
      return axios.get(`/post/all?title=${data.title}`);
    }
    if (data.CategoryId) {
      return axios.get(`/post/all?CategoryId=${data.CategoryId}`);
    }
  }
  return axios.get(`/post/all`);
};

export function* getPostList(action) {
  try {
    const result = yield call(getPostListAPI, action.data);
    yield put({
      type: GET_POST_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_POST_LIST_FAIL,
      error: err.response.data,
    });
  }
}
