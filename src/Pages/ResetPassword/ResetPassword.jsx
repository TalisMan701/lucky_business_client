import React, {useRef, useState} from 'react';
import classes from './ResetPassword.module.css'
import {Redirect, withRouter} from "react-router-dom";
import Header from "../../Components/Header/Header";
import {Card} from "primereact/card";
import clsx from "clsx";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import Footer from "../../Components/Footer/Footer";
import {connect} from "react-redux";
import {Toast} from "primereact/toast";
import {compose} from "redux";
import {authAPI} from "../../Api/api";
const ResetPassword = (props) => {
	const [confirmPassword, setConfirmPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [code, setCode] = useState(new URLSearchParams(props.location.search).get("code"))
	const [fetchResetPassword, setFetchResetPassword] = useState(false)
	const [redirectAuth, setRedirectAuth] = useState(false)

	const resetPassword = () => {
		setFetchResetPassword(true)
		authAPI.resetPassword(code, newPassword)
			.then(response => {
				props.toast.current.show({severity: 'success', summary: 'Смена пароля', detail: 'Прошла успешно!'})
				setFetchResetPassword(false)
				setRedirectAuth(true)
			})
			.catch(error => {
				props.toast.current.show({severity: 'error', summary: 'Смена пароля', detail: error.response.data.message})
				setFetchResetPassword(false)
				if(error.status === 409){
					setRedirectAuth(true)
				}
			})
	}

	if(redirectAuth){
		return <Redirect to={'/auth'}/>
	}

	if(props.isAuth){
		return <Redirect to={'/'}/>
	}

	return (
		<>
			<Header isAuth={props.isAuth}/>
			<main className={classes.auth}>
				<Card className={classes.card}>
					<div className={classes.title}>Смена пароля</div>
					<span className={clsx("p-float-label", classes.inputInner)}>
						<Password
							className={classes.inputPassword}
							inputId="newPassword"
							value={newPassword}
							toggleMask
							onChange={(e) => setNewPassword(e.target.value)}
						/>
						<label htmlFor="newPassword" className={classes.label}>Новый пароль</label>
					</span>
					<span className={clsx("p-float-label", classes.inputInner)}>
						<Password
							className={classes.inputPassword}
							inputId="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<label htmlFor="confirmPassword" className={classes.label}>Повторите пароль</label>
					</span>
					<div className={classes.btns}>
						<Button
							label={!fetchResetPassword ?
								<span>Сменить</span>
								: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
							}
							className={classes.btn1}
							onClick={resetPassword}
						/>
					</div>
				</Card>
			</main>
			<Footer/>
		</>
	);
};

const mapStateToProps = state =>({
	fetchLogin: state.auth.fetchLogin,
	isAuth: state.auth.isAuth
})

export default compose(
	connect(mapStateToProps, {}),
	withRouter
)(ResetPassword);
