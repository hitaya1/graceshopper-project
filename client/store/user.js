import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'

/**
 * ACTION CREATORS
 */
const setUser = user => ({type: SET_USER, user})

/**
 * THUNK CREATORS
 */
export const fetchUser = (userId, username) => async dispatch => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users`);

      dispatch(setUser(response.data));
    } catch (e) {
      dispatch(errorRobot());
      console.error('You don\'t exist. Sorry.');
      console.error(e);
    }
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}
