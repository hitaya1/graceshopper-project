import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleUser from './singleUser';
import products from './products';
import singleProduct from './singleProduct';
import allUsers from './allUsers';
import cartReducer from './cart';

const reducer = combineReducers({
	auth,
	singleUser,
	products,
	singleProduct,
	allUsers,
	cartReducer,
});
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './singleUser';
export * from './products';
export * from './singleProduct';
export * from './allUsers';
export * from './cart';
