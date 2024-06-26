// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const GET_SUB_STATUS = 'session/GET_SUB_STATUS'
const TOGGLE_SUB_STATUS = 'session/TOGGLE_SUB_STATUS'
const GET_SINGLE_USER = 'session/GET_SINGLE_USER'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const getSingleUser = (user) => ({
  type: GET_SINGLE_USER,
  payload: user
})

const removeUser = () => ({
  type: REMOVE_USER,
})

const getSubStatus = (status) => ({
    type: GET_SUB_STATUS,
    payload: status

})

const toggleSubStatus = (status) => ({
  type: TOGGLE_SUB_STATUS,
  payload: status
})


export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, firstName, lastName, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}


// thunk for handling user subscriptions
export const toggleSubcription = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/subscribe/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userId)
  })
  if (res.ok) {
    const data = await res.json()
    console.log('gotheregotheregotheregothere', data)
    dispatch(getSubStatus(data))
  }
}

export const checkSubStatus = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/subscribe/${userId}`)
  const data = await res.json()
  if (res.ok) {
    dispatch(getSubStatus(data))
  }
}


export const getSingleUserThunk = (userId) => async(dispatch) => {
  const res = await fetch(`/api/users/${userId}`)
  const data = await res.json()
  if (res.ok) {
    dispatch(getSingleUser(data))
  }
}






const initialState = { user: null,
                       subStatus:{},
                       channelOwner: {}};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload }
    case REMOVE_USER:
      return { ...state, user: null }
    case GET_SUB_STATUS:
      return { ...state, subStatus: action.payload}
    case GET_SINGLE_USER:
      return { ...state, channelOwner: action.payload}
    default:
      return state;
  }
}
