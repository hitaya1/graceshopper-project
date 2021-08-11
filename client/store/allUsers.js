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
export const createUser = (adding, history) => {
	return async (dispatch) => {
		try{
			const token = window.localStorage.getItem('token');
			const { data: created } = await axios.post('/api/users', adding, {
				headers: {
					authorization: token
				}
			});
			dispatch(makeUser(created));
			history.push('/users');
		} catch(e){
			history.push('/error');
			console.error('create user failed. admin required.');
		}
	};
};

export const deleteUser = (id, history) => {
	return async (dispatch) => {
		try{
			const token = window.localStorage.getItem('token');
			if (token){
				const { data: deleted } = await axios.delete(`/api/users/${id}`, {
					headers: {
						authorization: token
					}
				});
				dispatch(_deleteUser(deleted));
			}
		}catch(e){
			history.push('/error');
			console.error(e)
		}
	};
};

export const getAllUsers = (history) =>{
	return async (dispatch) =>{
		try{
			const token = window.localStorage.getItem('token');
			if (token){
				const { data: users } = await axios.get(`/api/users`, {
					headers: {
						authorization: token
					}
				});
				dispatch(fetchAllUsers(users));
			}
		}catch(e){
			history.push('/error');
			console.error(e)
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
