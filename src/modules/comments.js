import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as commentsAPI from "../lib/api/comments";
import { takeLatest } from "redux-saga/effects";

// Action Types
const [LOAD_COMMENTS, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE] =
  createRequestActionTypes("comments/LOAD_COMMENTS");
const [ADD_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE] =
  createRequestActionTypes("comments/ADD_COMMENT");
const UNLOAD_COMMENTS = "comments/UNLOAD_COMMENTS";

// Action Creators
export const loadComments = createAction(LOAD_COMMENTS, (postId) => postId);
export const addComment = createAction(
  ADD_COMMENT,
  ({ postId, user, body }) => ({ postId, user, body })
);
export const unloadComments = createAction(UNLOAD_COMMENTS);

// Sagas
const loadCommentsSaga = createRequestSaga(
  LOAD_COMMENTS,
  commentsAPI.loadComments
);

const addCommentSaga = createRequestSaga(ADD_COMMENT, commentsAPI.addComment);

export function* commentsSaga() {
  yield takeLatest(LOAD_COMMENTS, loadCommentsSaga);
  yield takeLatest(ADD_COMMENT, addCommentSaga);
}

// Initial State
const initialState = {
  comments: [],
  error: null,
};

// Reducer
const comments = handleActions(
  {
    [LOAD_COMMENTS_SUCCESS]: (state, { payload: comments }) => ({
      ...state,
      comments,
    }),
    [LOAD_COMMENTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [ADD_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comments: [...state.comments, comment],
    }),
    [ADD_COMMENT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_COMMENTS]: () => initialState,
  },
  initialState
);

export default comments;
