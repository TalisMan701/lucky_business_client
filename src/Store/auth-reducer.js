import {authAPI} from "../Api/api";
import socket from "../Socket/socket";

const SET_USER_DATA = "SET_USER_DATA";
const UPDATE_USER_DATA = "UPDATE_USER_DATA";
const SET_FETCH_GET_AUTH_USER_DATA = "SET_FETCH_GET_AUTH_USER_DATA";
const SET_FETCH_REFRESH_USER_DATA = "SET_FETCH_REFRESH_USER_DATA";
const SET_GO_LOGIN = "SET_GO_LOGIN";
const SET_ERRORS = "SET_ERRORS";
const LOGOUT = "LOGOUT";
const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
const SET_FETCH_LOGIN = "SET_FETCH_LOGIN"
const UPDATE_PRICE_USER = "UPDATE_PRICE_USER"

let initialState = {
	isAuth: false,
	user: null,
	fetchGetAuthUserData: true,
	fetchRefreshUserData: false,
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
		case SET_NOTIFICATIONS:{
			return {
				...state,
				user: {
					...state.user,
					countNotif: state.user.countNotif + 1
				}
			}
		}
		case UPDATE_PRICE_USER:{
			return {
				...state,
				user: {
					...state.user,
					balance: state.user.balance - action.buyPrice
				}
			}
		}
		case SET_FETCH_GET_AUTH_USER_DATA:
			return {
				...state,
				fetchGetAuthUserData: action.fetchGetAuthUserData
			}
		case SET_FETCH_REFRESH_USER_DATA:
			return {
				...state,
				fetchRefreshUserData: action.fetchRefreshUserData
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
const setFetchRefreshUserData = (fetchRefreshUserData) => ({type: SET_FETCH_REFRESH_USER_DATA, fetchRefreshUserData})
const setFetchLogin = (fetchLogin) => ({type: SET_FETCH_LOGIN, fetchLogin})
const setGoLogin = (goLogin) => ({type: SET_GO_LOGIN, goLogin})
export const setErrors = (errors) => ({type: SET_ERRORS, errors})
export const logoutAction = () => ({type: LOGOUT})

export const updatePriceUser = (buyPrice) => ({type: UPDATE_PRICE_USER, buyPrice})
export const setNotifications = () => ({type: SET_NOTIFICATIONS})

/*export const addNotif = (toast) => dispatch => {
	socket.on("newNotification", (arg) => {
		console.log(arg)
		dispatch(setNotifications())
		/!*props.updateUser({
			...props.user,
			countNotif: props.user?     .countNotif + 1
		})*!/
		toast.current.show({severity: 'success', summary: 'Уведомления', detail: 'Произошло уведомление!'})
	});
}*/

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

export const refreshUserData = () => dispatch => {
	dispatch(setFetchRefreshUserData(true))
	authAPI.me()
		.then(response => {
			if(response.status === 200){
				dispatch(setUser(response.data))
			}
			dispatch(setFetchRefreshUserData(false))
		}).catch(error => {
		dispatch(setFetchRefreshUserData(false))
	})
}

export const login = (email, password) => (dispatch) =>{
	dispatch(setFetchLogin(true))
	dispatch(setErrors(null))
	authAPI.login(email, password)
		.then(response => {
			console.log(response)
			if(response.status === 200){
				localStorage.setItem("token", response.data.accessToken);
				localStorage.setItem("tokenRefresh", response.data.refreshToken);
				socket.io.opts.query = {
					token: response.data.accessToken
				}
				socket.disconnect().connect()
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
			dispatch(setErrors("Ошибка на сервере, попробуйте позже!"))
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
				socket.io.opts.query = {
					token: null
				}
				socket.disconnect().connect()
				dispatch(logoutAction())
			}
		})
}


export default authReducer;
