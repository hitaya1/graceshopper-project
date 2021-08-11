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
export const fetchSingleUser = (userId, history) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const response = await axios.get(`/api/users/` + userId, {
				headers: {
					authorization: token
				}
			});

			dispatch(setUser(response.data));
		} catch (e) {
			window.location.replace('/error');
			console.error(e);
		}
	};
};

export const editUser = (editting, history) => {
	return async (dispatch) => {
		try{
			const token = window.localStorage.getItem('token');
			const { data: edited } = await axios.put( `/api/users/${editting.id}`, editting, {
					headers: {
						authorization: token
					}
				});
			dispatch(_editUser(edited));
			history.push(`/users/${editting.id}`);
		} catch(e) {
			window.location.replace('/error');
			console.error(e);
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
