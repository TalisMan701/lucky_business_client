import * as axios from "axios";

const instanceWithToken = () => axios.create({
	withCredentials: true,
	baseURL: `https://luckly-bus.herokuapp.com/api/v1/`,
	headers: {
		"Authorization": "Bearer " + localStorage.getItem("token")
	}
});

const instanceWithTokenFile = () => axios.create({
	withCredentials: true,
	baseURL: `http://192.168.3.4:8080/api/v1/`,
	headers: {
		"Authorization": "Bearer " + localStorage.getItem("token"),
		'Content-Type': 'multipart/form-data'
	}
});

const instance = () => axios.create({
	withCredentials: true,
	baseURL: `https://luckly-bus.herokuapp.com/api/v1/`,
});

export const authAPI = {
	login(email,password){
		return  instance().post(`oauth/tokens`, {email, password});
	},
	logout(){
		return instanceWithToken().get(`users/logout`);
	},
	me(){
		return  instanceWithToken().get(`users/sync`);
	},
	refresh(){
		return  instance().post(`oauth/refresh`, {refreshToken: localStorage.getItem("tokenRefresh")});
	},
	sendLinkResetPassword(userEmail){
		return instance().post(`reset/getLink`, {userEmail})
	},
	resetPassword(code, password){
		return instance().post(`reset/password`, {code, password})
	}
}

export const registrationAPI = {
	signup(name, surname, email, password, refCode = localStorage.getItem("refCode") || '' , role='user'){
		return  instance().post(`signUp/user`, {name, surname, email, refCode, password, role});
	},
	/*checkEmail(email){
		return instance().post(`users/auth/sign_up/check_email/`, {email})
	},
	confirmEmail(token){
		return instance().get(`users/auth/sign_up/confirm_email/${token}?redirect_url=${process.env.REACT_APP_CURRENT_DOMEN_NAME}`)
	},
	sendConfirmEmail(email){
		return instance().post(`users/auth/sign_up/confirm_email/`, {email})
	}*/
}

export const settingsAPI = {
	sendImage(file){
		return instanceWithTokenFile().post(`users/settings/uploadAvatar`, file)
	},
	resetPassword(olDpassword, neWpassword){
		return instanceWithToken().post(`users/settings/changePassword`,{olDpassword, neWpassword})
	},
	sendLinkConfirmEmail(email){
		return instanceWithToken().post(`users/settings/getCodeForEmail`, {email})
	}
}

export const productsAPI = {
	getAllProducts(){
		return instanceWithToken().get(`users/getAllProducts`)
	}
}

export const adminAPI = {
	getAllUsers(){
		return instanceWithToken().get(`users/root/getAllUsers`)
	},
	createProduct(formData){
		return instanceWithTokenFile().post(`users/root/createProduct`, formData)
	}
}
