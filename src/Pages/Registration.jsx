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
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../Store/auth-reducer";
const Registration = (props) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [lastname, setLastname] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [confirmPersonalData, setConfirmPersonalData] = useState(false)
	const [error, setError] = useState(null)
	const [redirectLogin, setRedirectLogin] = useState(false)


	useEffect(()=>{
		setError(null)
	}, [email, password, name, lastname, confirmPassword, confirmPersonalData])

	const onClickSignUp = () => {
		if(confirmPersonalData){
			registrationAPI.signup(name, lastname, email, password)
				.then(response => {
					setRedirectLogin(true)
				})
				.catch(error => {

				})
		}else{
			setError("Подтвердите пользовательское соглашение!")
		}

	}

	if(redirectLogin){
		return <Redirect to={'/auth'}/>
	}

	return (
		<>
			<Header isAuth={props.isAuth}/>
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
						label="Зарегистрироваться"
						className={classes.btn1}
						onClick={onClickSignUp}
					/>
					{error &&
						<div style={{color: "red"}}>{error}</div>
					}
				</Card>
			</main>
			<Footer/>
		</>
	);
};

const mapStateToProps = state =>({
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {})(Registration);
