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
export const fetchSingleUser = (userId, user, history) => {
	return async (dispatch) => {
		try {
			if (user.isAdmin || user.id === id) {
				const response = await axios.get(`/api/users/` + userId);

				dispatch(setUser(response.data));
			} else {
				history.push('/error');
				console.error('get user failed. admin required.');
			}
		} catch (e) {
			//dispatch(errorRobot());
			console.error("You don't exist. Sorry.");
			console.error(e);
		}
	};
};

export const editUser = (editting, user, history) => {
	return async (dispatch) => {
		if (user.isAdmin) {
			const { data: edited } = await axios.put(
				`/api/users/${editting.id}`,
				editting
			);
			dispatch(_editUser(edited));
			history.push(`/users/${editting.id}`);
		} else {
			history.push('/error');
			console.error('edit user failed. admin required.');
		}
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
			return action.user;
		default:
			return state;
	}
}
