import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER';
const EDIT_USER = 'EDIT_USER';

/**
 * ACTION CREATORS
 */
const setUser = (user) => ({ type: SET_USER, user });
const _editUser = (user) => ({ type: EDIT_USER, user });

/**
 * THUNK CREATORS
 */
export const fetchSingleUser = (userId) => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/api/users/` + userId);

			dispatch(setUser(response.data));
		} catch (e) {
			//dispatch(errorRobot());
			console.error("You don't exist. Sorry.");
			console.error(e);
		}
	};
};

export const editUser = (user) => {
	return async (dispatch) => {
		const { data: edited } = await axios.put(`/api/users/${users.id}`, user);
		dispatch(_editUser(edited));
	};
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
	switch (action.type) {
		case SET_USER:
			return action.user;
		case EDIT_USER:
			return state.map((user) =>
				user.id === action.user.id ? action.user : user
			);
		default:
			return state;
	}
}
