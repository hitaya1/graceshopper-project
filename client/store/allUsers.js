import axios from 'axios';

//action type
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';
const GET_ALL_USERS = 'GET_ALL_USERS';

//action creator
const makeUser = (user) => ({ type: CREATE_USER, user });
const _deleteUser = (user) => ({ type: DELETE_USER, user });
const fetchAllUsers = (users) => ({ type: GET_ALL_USERS, users })

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

export const getAllUsers = () =>{
	return async (dispatch) =>{
		const { data: users } = await axios.get(`/api/users`);
		dispatch(fetchAllUsers(users));
	}
}

//initialstate
const initialState = [];

//reducer
export default function (state = initialState, action) {
	switch (action.type) {
		case CREATE_USER:
			return [...state, action.user];
		case DELETE_USER:
			return state.filter((user) => user.id !== action.user.id);
		case GET_ALL_USERS:
			return action.users;
		default:
			return state;
	}
}
