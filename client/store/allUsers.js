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
export const createUser = (adding, user) => {
	return async (dispatch) => {
		if (user.isAdmin){
			const { data: created } = await axios.post('/api/users', adding);
			dispatch(makeUser(created));
		} else{
			console.error('create user failed. admin required.');
		}

	};
};

export const deleteUser = (id, user) => {
	return async (dispatch) => {
		if (user.isAdmin || user.id === id){
			const { data: deleted } = await axios.delete(`/api/users/${id}`);
			dispatch(_deleteUser(deleted));
		} else{
			console.error('delete user failed. admin required.');
		}

	};
};

export const getAllUsers = (user) =>{
	return async (dispatch) =>{
		if (user.isAdmin){
			const { data: users } = await axios.get(`/api/users`);
		dispatch(fetchAllUsers(users));
		} else{
			console.error('see users failed. admin required.');
		}

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
