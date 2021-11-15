import {authAPI} from "../Api/api";

const SET_USER_DATA = "SET_USER_DATA";
const UPDATE_USER_DATA = "UPDATE_USER_DATA";
const SET_FETCH_GET_AUTH_USER_DATA = "SET_FETCH_GET_AUTH_USER_DATA";
const SET_GO_LOGIN = "SET_GO_LOGIN";
const SET_ERRORS = "SET_ERRORS";
const LOGOUT = "LOGOUT";
const SET_FETCH_LOGIN = "SET_FETCH_LOGIN"

let initialState = {
	isAuth: false,
	user: null,
	fetchGetAuthUserData: true,
	fetchConfirmEmail: true,
	fetchLogin: false,
	goLogin: false,
	errors: null
}

const authReducer = (state = initialState, action) =>{
	switch (action.type){
		case SET_USER_DATA:
			return {
				...state,
				user: action.user,
				fetchGetAuthUserData: false,
				isAuth: true
			}
		case UPDATE_USER_DATA:
			return {
				...state,
				user: action.user
			}
		case SET_FETCH_GET_AUTH_USER_DATA:
			return {
				...state,
				fetchGetAuthUserData: action.fetchGetAuthUserData
			}
		case SET_FETCH_LOGIN:
			return {
				...state,
				fetchLogin: action.fetchLogin
			}
		case SET_GO_LOGIN:{
			return {
				...state,
				fetchGetAuthUserData: false,
				goLogin: action.goLogin
			}
		}
		case SET_ERRORS:
			return {
				...state,
				errors: action.errors
			}
		case LOGOUT:
			return {
				...initialState,
				fetchGetAuthUserData: false
			}
		default:
			return state
	}
}

const setUser = (user) => ({type: SET_USER_DATA, user})
export const updateUser = (user) => ({type: UPDATE_USER_DATA, user})
const setFetchGetAuthUserData = (fetchGetAuthUserData) => ({type: SET_FETCH_GET_AUTH_USER_DATA, fetchGetAuthUserData})
const setFetchLogin = (fetchLogin) => ({type: SET_FETCH_LOGIN, fetchLogin})
const setGoLogin = (goLogin) => ({type: SET_GO_LOGIN, goLogin})
const setErrors = (errors) => ({type: SET_ERRORS, errors})
export const logoutAction = () => ({type: LOGOUT})

export const getAuthUserData = () => dispatch =>{
	dispatch(setFetchGetAuthUserData(true))
	authAPI.me()
		.then(response => {
			if(response.status === 200){
				dispatch(setUser(response.data))
			}
		}).catch(error => {
			dispatch(setFetchGetAuthUserData(false))
	})
}

export const login = (email, password) => (dispatch) =>{
	dispatch(setFetchLogin(true))
	authAPI.login(email, password)
		.then(response => {
			console.log(response)
			if(response.status === 200){
				localStorage.setItem("token", response.data.accessToken);
				localStorage.setItem("tokenRefresh", response.data.refreshToken);
				dispatch(setGoLogin(false))
				dispatch(getAuthUserData())
			}else{
				dispatch(setErrors(response.data?.message))
			}
			dispatch(setFetchLogin(false))
		}).catch( (error) => {
		if(error?.response?.status === 401){
			dispatch(setErrors("Неправильный логин или пароль!"))
		}else{
			dispatch(setErrors(error.response.data?.message))
		}
		dispatch(setFetchLogin(false))
	})
}

export const logout = () => (dispatch) =>{
	authAPI.logout()
		.then(response => {
			if(response.status === 200){
				localStorage.removeItem("token");
				localStorage.removeItem("tokenRefresh");
				dispatch(logoutAction())
			}
		})
}


export default authReducer;
