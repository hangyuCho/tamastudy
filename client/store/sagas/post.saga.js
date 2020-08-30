import { all, fork, takeLatest, throttle } from 'redux-saga/effects';
import {
  CREATE_POST_REQUEST,
  DELETE_POST_REQUEST,
  EDIT_POST_REQUEST,
  GET_MORE_POST_LIST_REQUEST,
  GET_POST_LIST_REQUEST,
  GET_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
} from '../type';
import { createPost } from '../actions/post/createPost.action';
import { getPostList } from '../actions/post/getPostList.action';
import { getPost } from '../actions/post/getPost.action';
import { editPost } from '../actions/post/editPost.action';
import { deletePost } from '../actions/post/deletePost.action';
import { likePost } from '../actions/post/likePost.action';
import { unLikePost } from '../actions/post/unLikePost.action';
import { getMorePostList } from '../actions/post/getMorePostList.action';

function* watchCreatePost() {
  yield takeLatest(CREATE_POST_REQUEST, createPost);
}

function* watchGetPostList() {
  yield takeLatest(GET_POST_LIST_REQUEST, getPostList);
}

function* watchGetMorePostList() {
  yield takeLatest(GET_MORE_POST_LIST_REQUEST, getMorePostList);
}

function* watchGetPost() {
  yield takeLatest(GET_POST_REQUEST, getPost);
}

function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost);
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchLikePost() {
  yield throttle(1000, LIKE_POST_REQUEST, likePost);
}

function* watchUnLikePost() {
  yield throttle(1000, UNLIKE_POST_REQUEST, unLikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchCreatePost),
    fork(watchGetPostList),
    fork(watchGetMorePostList),
    fork(watchGetPost),
    fork(watchEditPost),
    fork(watchDeletePost),
    fork(watchLikePost),
    fork(watchUnLikePost),
  ]);
}
