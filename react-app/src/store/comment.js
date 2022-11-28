//constants
const GET_ALL_COMMENTS = "comments/all";
const GET_USER_COMMENTS = "comments/user";
const GET_SINGLE_COMMENT = "comments/single";
const CREATE_COMMENT = "comments/new";
const EDIT_COMMENT = "comments/edit";
const DELETE_COMMENT = "comments/delete";

//actions
const getAllComments = (comments) => {
  return {
    type: GET_ALL_COMMENTS,
    comments,
  };
};

const getUserComments = (comments) => {
  return {
    type: GET_USER_COMMENTS,
    comments,
  };
};

const getSingleComment = (comment) => {
  return {
    type: GET_SINGLE_COMMENT,
    comment,
  };
};

const createComment = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment,
  };
};

const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
  };
};

const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
  };
};

//thunks
export const fetchAllComments = (videoId) => async (dispatch) => {
  const res = await fetch(`/api/comments/videos/${videoId}`);
  if (res.ok) {
    const comments = await res.json();
    dispatch(getAllComments(comments));
  }
};

export const fetchUserComments = (userId) => async (dispatch) => {
  const res = await fetch(`/api/comments/users/${userId}`);
  if (res.ok) {
      console.log('===============')
      const comments = await res.json();
    dispatch(getUserComments(comments));
  }
};

export const createCommentThunk = (payload) => async (dispatch) => {
  const res = await fetch(`/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    const newComment = await res.json();
    dispatch(createComment(newComment));
  }
};

export const editCommentThunk = (payload, commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editComment(data));
  }
};


export const deleteCommentThunk = (commentId) => async(dispatch)=> {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    if(res.ok) {
        dispatch(deleteComment(commentId))
    }
}


//reducer

const initialState = {
    videoComments: {},
    userComments: {}
}


const commentReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_ALL_COMMENTS:
            newState = {...state, videoComments:{}, userComments:{}}
            action.comments.forEach((comment)=> newState.videoComments[comment.id] = comment)
            return newState

        case GET_USER_COMMENTS:
            newState = {...state, videoComments:{}, userComments:{}}
            action.comments.forEach((comment)=>newState.userComments[comment.id] = comment)
            return newState

        case EDIT_COMMENT:
            newState = {...state}
            newState.videoComments[action.comment.id] = action.comment
            return newState

        case DELETE_COMMENT:
            newState = {
                videoComments:{...state.videoComments},
                userComments:{...state.userComments}
            }
            delete newState.videoComments[action.commentId]
            delete newState.userComments[action.commentId]
            return newState

        default:
            return state
    }
}


export default commentReducer
