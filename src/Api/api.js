import axios from "axios";
import {store} from '../index'
import {logoutAction} from "../Store/auth-reducer";
import socket from "../Socket/socket";


const instanceWithToken = axios.create({
	withCredentials: true,
	baseURL: `https://lucky-business.ru/api/v1/`
});

const instanceWithTokenFile = axios.create({
	withCredentials: true,
	baseURL: `https://lucky-business.ru/api/v1/`,
	headers: {
		'Content-Type': 'multipart/form-data'
	}
});

const instance = axios.create({
	withCredentials: true,
	baseURL: `https://lucky-business.ru/api/v1/`,
});

instanceWithToken.interceptors.request.use(config => {
	config.headers.Authorization = "Bearer " + localStorage.getItem("token")
	return config
})

instanceWithTokenFile.interceptors.request.use(config => {
	config.headers.Authorization = "Bearer " + localStorage.getItem("token")
	return config
})

instanceWithToken.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if(error.response.status === 401 && error.config && !error._isRetry){
			originalRequest._isRetry = true
			try {
				const response = await authAPI.refresh()
				localStorage.setItem('token', response.data.accessToken)
				localStorage.setItem('tokenRefresh', response.data.refreshToken)
				socket.io.opts.query = {
					token: response.data.accessToken
				}
				socket.disconnect().connect()
				return instanceWithToken.request(originalRequest)
			}
			catch (e){
				localStorage.removeItem('token')
				localStorage.removeItem('tokenRefresh')
				socket.io.opts.query = {
					token: null
				}
				socket.disconnect().connect()
				store.dispatch(logoutAction())
			}
		}
		throw error
	}
)

instanceWithTokenFile.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if(error.response.status === 401 && error.config && !error._isRetry){
			originalRequest._isRetry = true
			try {
				const response = await authAPI.refresh()
				localStorage.setItem('token', response.data.accessToken)
				localStorage.setItem('tokenRefresh', response.data.refreshToken)
				socket.io.opts.query = {
					token: response.data.accessToken
				}
				socket.disconnect().connect()
				return instanceWithTokenFile.request(originalRequest)
			}
			catch (e){
				localStorage.removeItem('token')
				localStorage.removeItem('tokenRefresh')
				socket.io.opts.query = {
					token: null
				}
				socket.disconnect().connect()
				store.dispatch(logoutAction())
			}
		}
		throw error
	}
)

export const authAPI = {
	login(email,password){
		return  instance.post(`oauth/tokens`, {email, password});
	},
	logout(){
		return instanceWithToken.get(`users/logout`);
	},
	me(){
		return  instanceWithToken.get(`users/sync`);
	},
	refresh(){
		return  instance.post(`oauth/refresh`, {refreshToken: localStorage.getItem("tokenRefresh")});
	},
	sendLinkResetPassword(userEmail){
		return instance.post(`reset/getLink`, {userEmail})
	},
	resetPassword(code, password){
		return instance.post(`reset/password`, {code, password})
	}
}

export const registrationAPI = {
	signup(name, surname, email, password, refCode = localStorage.getItem("refCode") || '' , role='user'){
		return  instance.post(`signUp/user`, {name, surname, email, refCode, password, role});
	},
	/*checkEmail(email){
		return instance.post(`users/auth/sign_up/check_email/`, {email})
	},
	confirmEmail(token){
		return instance.get(`users/auth/sign_up/confirm_email/${token}?redirect_url=${process.env.REACT_APP_CURRENT_DOMEN_NAME}`)
	},
	sendConfirmEmail(email){
		return instance.post(`users/auth/sign_up/confirm_email/`, {email})
	}*/
}

export const settingsAPI = {
	sendImage(file){
		return instanceWithTokenFile.post(`users/settings/uploadAvatar`, file)
	},
	resetPassword(olDpassword, neWpassword){
		return instanceWithToken.post(`users/settings/changePassword`,{olDpassword, neWpassword})
	},
	sendLinkConfirmEmail(email){
		return instanceWithToken.post(`users/settings/getCodeForEmail`, {email})
	}
}

export const productsAPI = {
	getAllProducts(){
		return instanceWithToken.get(`users/getAllProducts`)
	},
	buy(idProduct){
		return instanceWithToken.post(`users/buyProduct`,{productId: idProduct})
	}
}

export const adminAPI = {
	getAllUsers(){
		return instanceWithToken.get(`users/root/getAllUsers`)
	},
	createProduct(formData){
		return instanceWithTokenFile.post(`users/root/createProduct`, formData)
	},
	addBalanceUser(userId, sum){
		return instanceWithToken.post(`users/root/updateBalance`, {summa: sum, userId})
	},
	addSurprise(desc, sum, numCval){
		return instanceWithToken.post(`users/root/createSurprise`, {summa: sum, description: desc, flag: numCval})
	},
	getAllPayouts(status = "all"){
		return instanceWithToken.get(`users/root/getAllPayoutUser/${status}`)
	},
	updateStatusPayout(idPayout, status){
		return instanceWithToken.post(`users/root/setStatusForPayout`, {payoutId: idPayout, status})
	}
}

export const arenaLeadersAPI = {
	getLeaders(){
		return instanceWithToken.get(`users/getRating`)
	}
}

export const partnerProgramAPI = {
	getReferals(){
		return instanceWithToken.get(`users/getAllReferal`)
	},
	activateFastBonus(){
		return instanceWithToken.get(`users/activeBonusStart`)
	},
	getSurprise(id){
		return instanceWithToken.post(`users/getSurprise`, {id})
	}
}

export const myProductsAPI = {
	getMyProducts(){
		return instanceWithToken.get(`users/getHistoryBuy`)
	}
}

export const notificationsAPI = {
	getMyNotifications(){
		return instanceWithToken.get(`users/getAllNotifications`)
	},
	readAllNotifications(){
		return instanceWithToken.get(`users/setStatusRead`)
	}
}

export const payAPI = {
	topUpBalance(sum){
		return instanceWithToken.post(`users/updateBalance`, {sum})
	},
	getWalletDataServer(){
		return instanceWithToken.get(`users/getWallet`)
	},
	updateTranz(){
		return instanceWithToken.get(`users/getWalletActualInfo`)
	},
	createPayout(userInfo, summa, numberCard){
		return instanceWithToken.post(`users/createPayout`,{userInfo, summa, numberCard})
	},
	getAllPayout(){
		return instanceWithToken.get(`users/getAllPayout`)
	}
}
