import React, {useRef, useState} from 'react';
import classes from '../StylesForPages/Auth.module.css'
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import clsx from "clsx";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {authAPI} from "../Api/api";
import {connect} from "react-redux";
import {login} from "../Store/auth-reducer";
import {Redirect} from "react-router-dom";
import {Toast} from "primereact/toast";

const Auth = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [sendLink, setSendLink] = useState(false)
	const [fetchSendLink, setFetchSendLink] = useState(false)

	const toast = useRef(null)

	const onClickLogin = () => {
		props.login(email, password)
	}

	const sendLinkEmail = () => {
		setFetchSendLink(true)
		authAPI.sendLinkResetPassword(email)
			.then(response => {
				setEmail('')
				toast.current.show({severity: 'success', summary: 'Отправка письма на Email', detail: 'Прошла успешно!'})
				setFetchSendLink(false)
			})
			.catch(error => {
				toast.current.show({severity: 'error', summary: 'Отправка письма на Email', detail: 'Произошла ошибка, попробуйте снова'})
				setFetchSendLink(false)
			})
	}

	if(props.isAuth){
		return <Redirect to={'/'}/>
	}

	if(sendLink){
		return (
			<>
				<Header isAuth={props.isAuth}/>
				<main className={classes.auth}>
					<Card className={classes.card}>
						<div className={classes.title}>Смена пароля</div>
						<span className={clsx("p-float-label", classes.inputInner)}>
							<InputText
								className={classes.input}
								id="email" value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label htmlFor="email" className={classes.label}>Email</label>
						</span>
						<div className={classes.btns}>
							<Button
								label={!fetchSendLink ?
									<span>Отправить письмо</span>
									: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
								}
								className={classes.btn3}
								onClick={sendLinkEmail}
							/>
							<Button
								label="Вернуться"
								className={clsx("p-button-outlined", classes.btn4)}
								onClick={()=>{setSendLink(false)}}
							/>
						</div>
					</Card>
				</main>
				<Footer/>
				<Toast ref={toast} position="bottom-right"/>
			</>
		)
	}

	return (
		<>
			<Header isAuth={props.isAuth}/>
			<main className={classes.auth}>
				<Card className={classes.card}>
					<div className={classes.title}>Вход</div>
					<span className={clsx("p-float-label", classes.inputInner)}>
						<InputText
							className={classes.input}
							id="email" value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label htmlFor="email" className={classes.label}>Email</label>
					</span>
					<span className={clsx("p-float-label", classes.inputInner)}>
						<Password
							className={classes.inputPassword}
							inputId="password"
							value={password}
							toggleMask
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label htmlFor="password" className={classes.label}>Пароль</label>
					</span>
					<div className={classes.btns}>
						<Button
							label={!props.fetchLogin ?
								<span>Войти</span>
								: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
							}
							className={classes.btn1}
							onClick={onClickLogin}
						/>
						<Button
							label="Забыли пароль?"
							className={clsx("p-button-outlined", classes.btn2)}
							onClick={()=>{setSendLink(true)}}
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

export default connect(mapStateToProps, {login})(Auth);
