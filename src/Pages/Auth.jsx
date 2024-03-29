import React, {useEffect, useRef, useState} from 'react';
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
import {login, setErrors} from "../Store/auth-reducer";
import {Link, Redirect} from "react-router-dom";
import {Toast} from "primereact/toast";
import NewHeader from "../Components/NewHeader/NewHeader";

const Auth = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [sendLink, _setSendLink] = useState(false)
	const [fetchSendLink, setFetchSendLink] = useState(false)

	const sendLinkRef = useRef(sendLink)

	const setSendLink = data => {
		sendLinkRef.current = data
		_setSendLink(data)
	}

	const listener = event => {
		if (event.code === "Enter" || event.code === "NumpadEnter") {
			event.preventDefault();
			if(sendLinkRef.current){
				sendLinkEmail()
			}else{
				onClickLogin()
			}
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", listener);
		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [email, password]);

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
		return <Redirect to={'/cabinet'}/>
	}

	if(sendLink){
		return (
			<>
				<div className={classes.body}>
					{!props.isMobile &&
					<NewHeader isAuth={props.isAuth}  isMobile={props.isMobile} isTablet={props.isTablet}/>
					}
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
							{props.isMobile &&
							<Link to={'/'} className={classes.linkBack}>
								<i className={`pi pi-times ${classes.linkBackIcon}`}/>
							</Link>
							}
						</Card>
					</main>
				</div>
				<Toast ref={toast} position="bottom-right"/>
			</>
		)
	}

	return (
		<>
			<div className={classes.body}>
				{!props.isMobile &&
				<NewHeader isAuth={props.isAuth} isMobile={props.isMobile} isTablet={props.isTablet}/>
				}
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
						{props.isMobile &&
						<Link to={'/'} className={classes.linkBack}>
							<i className={`pi pi-times ${classes.linkBackIcon}`}/>
						</Link>
						}
						{props.errors &&
							<div className={classes.errors}>
								{props.errors}
							</div>
						}
						<div className={classes.goTo}>
							Нет аккаунта?
							<Link onClick={()=>{props.setErrors(null)}} to={"/signup"}>Зарегистрироваться</Link>
						</div>
					</Card>
				</main>
			</div>
			<Toast ref={toast} position="bottom-right"/>
		</>
	);
};
const mapStateToProps = state =>({
	fetchLogin: state.auth.fetchLogin,
	isAuth: state.auth.isAuth,
	errors: state.auth.errors
})

export default connect(mapStateToProps, {login, setErrors})(Auth);
