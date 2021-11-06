import React, {useState} from 'react';
import classes from '../StylesForPages/Auth.module.css'
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import clsx from "clsx";
import {Card} from "primereact/card";
import {Button} from "primereact/button";

const Auth = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	return (
		<>
			<Header/>
			<main className={classes.auth}>
				<Card className={classes.card}>
					<div className={classes.title}>Вход</div>
					<span className={clsx("p-float-label", classes.inputInner)}>
						<InputText className={classes.input} id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						<label htmlFor="email" className={classes.label}>Email</label>
					</span>
					<span className={clsx("p-float-label", classes.inputInner)}>
						<Password className={classes.inputPassword} inputId="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
						<label htmlFor="password" className={classes.label}>Пароль</label>
					</span>
					<div className={classes.btns}>
						<Button
							label="Войти"
							className={classes.btn1}
						/>
						<Button
							label="Забыли пароль?"
							className={clsx("p-button-outlined", classes.btn2)}
						/>
					</div>
				</Card>
			</main>
			<Footer/>
		</>
	);
};

export default Auth;
