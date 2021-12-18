import React, {useState} from 'react';
import classes from './ConfirmEmail.module.css'
import {Message} from "primereact/message";
import clsx from "clsx";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {connect} from "react-redux";
import NewHeader from "../../Components/NewHeader/NewHeader";
import {Link} from "react-router-dom";
import {settingsAPI} from "../../Api/api";
import {logout} from "../../Store/auth-reducer";

const ConfirmEmail = (props) => {

	const [fetchSendEmail, setFetchSendEmail] = useState(false)
	const [email, setEmail] = useState(props.user.email)

	const sendLinkConfirmEmail = () => {
		setFetchSendEmail(true)
		settingsAPI.sendLinkConfirmEmail(email)
			.then(response => {
				props.toast.current.show({severity: 'success', summary: 'Отправка письма на Email', detail: 'Прошла успешно!'})
				setFetchSendEmail(false)
			})
			.catch(error => {
				setFetchSendEmail(false)
				props.toast.current.show({severity: 'error', summary: 'Отправка письма на Email', detail: 'Произошла ошибка, попробуйте снова'})
			})
	}

	return (
		<>
			<div className={classes.body}>
				{!props.isMobile &&
				<NewHeader isAuth={props.isAuth}  isMobile={props.isMobile} isTablet={props.isTablet}/>
				}
				<main className={classes.auth}>
					<Card className={classes.card}>
						<div className={classes.title}>Подтверждение почты</div>
						<span className={clsx("p-float-label", classes.inputInner)}>
							<InputText
								className={classes.input}
								id="email" value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label htmlFor="email" className={classes.label}>Email</label>
						</span>
						<Button
							label={!fetchSendEmail ?
								<span>Отправить письмо</span>
								: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
							}
							className={classes.btn3}
							onClick={sendLinkConfirmEmail}
						/>
						<div className={classes.goTo}>
							Сменить аккаунт?
							<Link onClick={()=>{
								props.logout()
							}} to={"/signup"}>Выход</Link>
						</div>
						{props.isMobile &&
						<Link to={'/'} className={classes.linkBack}>
							<i className={`pi pi-times ${classes.linkBackIcon}`}/>
						</Link>
						}
					</Card>
				</main>
			</div>
		</>
	)
};

const mapStateToProps = state =>({
	user: state.auth.user,
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {logout})(ConfirmEmail);
