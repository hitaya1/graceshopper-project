import axios from 'axios';

//action type
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';

//action creator
const makeUser = (user) => ({ type: CREATE_USER, user });
const _deleteUser = (user) => ({ type: DELETE_USER, user });

//thunks
export const createUser = (user) => {
	return async (dispatch) => {
		const { data: created } = await axios.post('/api/users', user);
		dispatch(makeUser(created));
	};
};

export const deleteUser = (id) => {
	return async (dispatch) => {
		const { data: user } = await axios.delete(`/api/users/${id}`);
		dispatch(_deleteUser(user));
	};
};

//initialstate
const initialState = [];

//reducer
export default function (state = initialState, action) {
	switch (action.type) {
		case CREATE_USER:
			return [...state, action.user];
		case DELETE_USER:
			return state.filter((user) => user.id !== action.user.id);
		default:
			return state;
	}
}
