import React, {useEffect, useState} from 'react';
import classes from '../StylesForPages/Registration.module.css'
import Header from "../Components/Header/Header";
import {Card} from "primereact/card";
import clsx from "clsx";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import Footer from "../Components/Footer/Footer";
import {Checkbox} from "primereact/checkbox";
import {registrationAPI} from "../Api/api";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../Store/auth-reducer";
import NewHeader from "../Components/NewHeader/NewHeader";
const Registration = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [fetchReg, setFetchReg] = useState(false)
	const [lastname, setLastname] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [confirmPersonalData, setConfirmPersonalData] = useState(false)
	const [error, setError] = useState(null)
	const [redirectLogin, setRedirectLogin] = useState(false)

	const validateEmail = (email) =>{
		return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(email)
	}


	useEffect(()=>{
		setError(null)
	}, [email, password, name, lastname, confirmPassword, confirmPersonalData])

	const onClickSignUp = () => {
		setError(null)
		if(confirmPersonalData){
			if(password !== "" && confirmPassword !== "" && email !== "" && name !== "" && lastname !== ""){
				if(password === confirmPassword){
					if(!validateEmail(email)){
						setFetchReg(true)
						registrationAPI.signup(name, lastname, email, password)
							.then(response => {
								setFetchReg(false)
								setRedirectLogin(true)
								props.toast.current.show({severity: 'success', summary: 'Регистрация', detail: "Прошла успешно!"})
							})
							.catch(error => {
								setFetchReg(false)
								setError("Ошибка на сервере")
							})
					}else{
						setError("Некорректный Email!")
					}
				}else{
					setError("Пароли не совпадают!")
				}
			}else{
				setError("Заполните все поля!")
			}
		}else{
			setError("Подтвердите пользовательское соглашение!")
		}

	}

	if(props.isAuth){
		return <Redirect to={'/cabinet'}/>
	}

	if(redirectLogin){
		return <Redirect to={'/auth'}/>
	}

	return (
		<>
			<div className={classes.body}>
				{!props.isMobile &&
				<NewHeader isAuth={props.isAuth} isMobile={props.isMobile} isTablet={props.isTablet}/>
				}
				<main className={classes.auth}>
					<Card className={classes.card}>
						<div className={classes.title}>Создание аккаунта</div>
						<div className={classes.inputs}>
						<span className={clsx("p-float-label", classes.inputInner, classes.inputInnerHalf)}>
							<InputText
								className={classes.input}
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<label htmlFor="name" className={classes.label}>Имя</label>
						</span>
							<span className={clsx("p-float-label", classes.inputInner, classes.inputInnerHalf)}>
							<InputText
								className={classes.input}
								id="lastname"
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
							/>
							<label htmlFor="lastname" className={classes.label}>Фамилия</label>
						</span>
						</div>
						<span className={clsx("p-float-label", classes.inputInner)}>
						<InputText
							className={classes.input}
							id="email"
							value={email}
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
						<span className={clsx("p-float-label", classes.inputInner)}>
						<Password
							className={classes.inputPassword}
							inputId="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<label htmlFor="confirmPassword" className={classes.label}>Повторите пароль</label>
					</span>
						<div className={classes.checkboxInner}>
							<Checkbox
								inputId="confirmPersonalData"
								checked={confirmPersonalData}
								onChange={e => setConfirmPersonalData(e.checked)}
								className={classes.checkbox}
							/>
							<label htmlFor="confirmPersonalData" className={classes.checkboxLabel}><p style={{margin: 0}}>Я согласен с <span style={{color: "#9FA8DA", cursor: "pointer"}}>пользовательским соглашением.</span></p></label>
						</div>
						<Button
							label={!fetchReg ?
								<span>Зарегистрироваться</span>
								: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
							}
							className={classes.btn1}
							onClick={onClickSignUp}
						/>
						{error &&
						<div className={classes.errors}>{error}</div>
						}
						{props.isMobile &&
						<Link to={'/'} className={classes.linkBack}>
							<i className={`pi pi-times ${classes.linkBackIcon}`}/>
						</Link>
						}
						<div className={classes.goTo}>
							Есть аккаунт?
							<Link to={"/auth"}>Войти</Link>
						</div>
					</Card>
				</main>
			</div>
		</>
	);
};

const mapStateToProps = state =>({
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {})(Registration);
