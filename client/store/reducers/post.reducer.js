import { produce } from 'immer';
import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  EDIT_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  GET_POST_FAIL,
  GET_MORE_POST_LIST_FAIL,
  GET_MORE_POST_LIST_REQUEST,
  GET_MORE_POST_LIST_SUCCESS,
  GET_POST_LIST_FAIL,
  GET_POST_LIST_REQUEST,
  GET_POST_LIST_SUCCESS,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_FAIL,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
} from '../type';

const initialState = {
  postList: [],
  pageInfo: {},
  post: null,
  // 포스트 생성
  createPostLoading: false,
  createPostDone: false,
  createPostError: null,
  // 포스트 리스트 불러오기
  getPostListLoading: false,
  getPostListDone: false,
  getPostListError: null,
  // 포스트 리스트 (+query) 불러오기
  getMorePostListLoading: false,
  getMorePostListDone: false,
  getMorePostListError: null,
  // 포스트 불러오기
  getPostLoading: false,
  getPostDone: false,
  getPostError: null,
  // 포스트 수정하기
  editPostLoading: false,
  editPostDone: false,
  editPostError: null,
  // 포스트 삭제하기
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
  // 좋아요
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  // 좋아요 취소
  unLikePostLoading: false,
  unLikePostDone: false,
  unLikePostError: null,
};

// [action] action.type, action.payload
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // 포스트 생성
      case CREATE_POST_REQUEST: {
        draft.createPostLoading = true;
        draft.createPostDone = false;
        draft.createPostError = null;
        break;
      }
      case CREATE_POST_SUCCESS: {
        draft.createPostLoading = false;
        draft.createPostDone = true;
        draft.createPostError = null;
        draft.post = action.payload;
        break;
      }
      case CREATE_POST_FAIL: {
        draft.createPostLoading = false;
        draft.createPostDone = false;
        draft.createPostError = action.error;
        break;
      }
      // 포스트 리스트 불러오기
      case GET_POST_LIST_REQUEST: {
        draft.getPostListLoading = true;
        draft.getPostListDone = false;
        draft.getPostListError = null;
        break;
      }
      case GET_POST_LIST_SUCCESS: {
        draft.getPostListLoading = false;
        draft.getPostListDone = true;
        draft.getPostListError = null;
        draft.postList = action.payload.postList;
        draft.pageInfo = action.payload.pageInfo;
        break;
      }
      case GET_POST_LIST_FAIL: {
        draft.getPostListLoading = false;
        draft.getPostListDone = false;
        draft.getPostListError = action.error;
        break;
      }
      // 포스트 리스트 (for infinite scroll) 불러오기
      case GET_MORE_POST_LIST_REQUEST: {
        draft.getMorePostListLoading = true;
        draft.getMorePostListDone = false;
        draft.getMorePostListError = null;
        break;
      }
      case GET_MORE_POST_LIST_SUCCESS: {
        draft.getMorePostListLoading = false;
        draft.getMorePostListDone = true;
        draft.getMorePostListError = null;
        draft.postList = [...draft.postList, ...action.payload.postList];
        draft.pageInfo = action.payload.pageInfo;
        break;
      }
      case GET_MORE_POST_LIST_FAIL: {
        draft.getMorePostListLoading = false;
        draft.getMorePostListDone = false;
        draft.getMorePostListError = action.error;
        break;
      }
      // 포스트 불러오기
      case GET_POST_REQUEST: {
        draft.getPostLoading = true;
        draft.getPostDone = false;
        draft.getPostError = null;
        break;
      }
      case GET_POST_SUCCESS: {
        draft.getPostLoading = false;
        draft.getPostDone = true;
        draft.getPostError = null;
        draft.post = action.payload;
        break;
      }
      case GET_POST_FAIL: {
        draft.getPostLoading = false;
        draft.getPostDone = false;
        draft.getPostError = action.error;
        break;
      }
      // 포스트 수정하기
      case EDIT_POST_REQUEST: {
        draft.editPostLoading = true;
        draft.editPostDone = false;
        draft.editPostError = null;
        break;
      }
      case EDIT_POST_SUCCESS: {
        draft.editPostLoading = false;
        draft.editPostDone = true;
        draft.editPostError = null;
        draft.post = action.payload;
        break;
      }
      case EDIT_POST_FAIL: {
        draft.editPostLoading = false;
        draft.editPostDone = false;
        draft.editPostError = action.error;
        break;
      }
      // 포스트 삭제
      case DELETE_POST_REQUEST: {
        draft.deletePostLoading = true;
        draft.deletePostDone = false;
        draft.deletePostError = null;
        break;
      }
      case DELETE_POST_SUCCESS: {
        draft.deletePostLoading = false;
        draft.deletePostDone = true;
        draft.deletePostError = null;
        draft.postList = draft.postList.filter(
          (post) => post.id !== action.payload
        );
        draft.post = null;
        break;
      }
      case DELETE_POST_FAIL: {
        draft.deletePostLoading = false;
        draft.deletePostDone = false;
        draft.deletePostError = action.error;
        break;
      }
      // like
      case LIKE_POST_REQUEST: {
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      }
      case LIKE_POST_SUCCESS: {
        draft.likePostLoading = false;
        draft.likePostDone = true;
        draft.likePostError = null;
        draft.post.Likers.push({ id: action.payload.UserId });
        break;
      }
      case LIKE_POST_FAIL: {
        draft.likePostLoading = false;
        draft.likePostDone = false;
        draft.likePostError = action.error;
        break;
      }
      // unlike
      case UNLIKE_POST_REQUEST: {
        draft.unLikePostLoading = true;
        draft.unLikePostDone = false;
        draft.unLikePostError = null;
        break;
      }
      case UNLIKE_POST_SUCCESS: {
        draft.unLikePostLoading = false;
        draft.unLikePostDone = true;
        draft.unLikePostError = null;
        draft.post.Likers = draft.post.Likers.filter(
          (liker) => liker.id !== action.payload.UserId
        );
        break;
      }
      case UNLIKE_POST_FAIL: {
        draft.unLikePostLoading = false;
        draft.unLikePostDone = false;
        draft.unLikePostError = action.error;
        break;
      }
      default:
        break;
    }
  });

export default reducer;
