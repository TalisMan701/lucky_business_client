import React, {useRef, useState} from 'react';
import classes from './Settings.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {Card} from "primereact/card";
import {Avatar} from "primereact/avatar";
import {FileUpload} from "primereact/fileupload";
import {Password} from "primereact/password";
import clsx from "clsx";
import {Button} from "primereact/button";
import {Message} from "primereact/message";
import {InputText} from "primereact/inputtext";
import {connect} from "react-redux";
import {settingsAPI} from "../../../Api/api";
import {Toast} from "primereact/toast";
import {refreshUserData} from "../../../Store/auth-reducer";
const Settings = (props) => {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [email, setEmail] = useState(props.user.email)
	const [fetchSendImg, setFetchSendImg] = useState(false)
	const [fetchResetPassword, setFetchResetPassword] = useState(false)
	const [fetchSendEmail, setFetchSendEmail] = useState(false)
	const [pathAvatar, setPathAvatar] = useState(props.user.pathAvatar)

	const uploadRef = useRef(null)
	const toast = useRef(null)

	const uploadInvoice = async (file) => {
		console.log(file)
		let formData = new FormData();
		formData.append('file', file);
		settingsAPI.sendImage(formData)
			.then(response => {
				if(response.status === 200){
					setPathAvatar(response.data?.pathAvatar)
					uploadRef.current.clear()
					toast.current.show({severity: 'success', summary: 'Загрузка фотографии', detail: 'Прошла успешно!'})
				}
				setFetchSendImg(false)
			})
			.catch(error => {
				toast.current.show({severity: 'error', summary: 'Загрузка фотографии', detail: 'Произошла ошибка, попробуйте снова'})
				setFetchSendImg(false)
			})
	};

	const uploadHandler = ({files}) => {
		const [file] = files;
		const fileReader = new FileReader()
		setFetchSendImg(true)
		fileReader.onload = (e) => {
			uploadInvoice(file);
		};
		fileReader.readAsDataURL(file);
	}

	const resetPassword = () => {
		setFetchResetPassword(true)
		settingsAPI.resetPassword(password, newPassword)
			.then(response => {
				if(response.status === 200){
					setPassword('')
					setConfirmPassword('')
					setNewPassword('')
					toast.current.show({severity: 'success', summary: 'Смена пароля', detail: 'Прошла успешно!'})
				}
				setFetchResetPassword(false)
			})
			.catch(error => {
				toast.current.show({severity: 'error', summary: 'Смена пароля', detail: error.response.data.message})
				setFetchResetPassword(false)
			})
	}

	const sendLinkConfirmEmail = () => {
		setFetchSendEmail(true)
		settingsAPI.sendLinkConfirmEmail(email)
			.then(response => {
				toast.current.show({severity: 'success', summary: 'Отправка письма на Email', detail: 'Прошла успешно!'})
				setFetchSendEmail(false)
			})
			.catch(error => {
				setFetchSendEmail(false)
				toast.current.show({severity: 'error', summary: 'Отправка письма на Email', detail: 'Произошла ошибка, попробуйте снова'})
			})
	}

	return (
		<>
			<MainTitle>Настройки</MainTitle>
			<Card title="Изменить фотографию" className={classes.card}>
				<Avatar image={pathAvatar} size="large"  shape="circle"/>
				<FileUpload
					headerClassName={classes.fileUploadHeader}
					ref={uploadRef}
					name="demo"
					accept="image/*"
					customUpload={true}
					uploadHandler={uploadHandler}
					chooseLabel={"Выбрать"}
					uploadLabel={fetchSendImg ? <i className={`pi pi-spin pi-spinner`}/>:<span>Загрузить</span>}
					cancelLabel={"Отменить"}
				/>
			</Card>
			<Card title="Подтвердить почту" className={classes.card}>
				<div className={classes.emailConfirm}>
					<div className="p-col-12 p-md-3" style={{marginRight: props.isMobile ? 0 : 16, width: props.isMobile ? "100%" : "auto"}}>
						{props.user?.confirmedEmail ?
							<Message severity="success" text="Email подтверждён!" className={classes.messageEmail}/>
							: <Message severity="error" text="Email не подтверждён!" className={classes.messageEmail}/>
						}
					</div>
					<span className={clsx("p-float-label", classes.inputInner)}>
						<InputText
							disabled={props.user.confirmedEmail}
							className={classes.input}
							id="email" value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label htmlFor="email" className={classes.label}>Email</label>
					</span>
				</div>
				<div className={classes.btnContainer}>
					<Button
						disabled={props.user.confirmedEmail}
						className={classes.resetPasswordBtn}
						label={fetchSendEmail ? <i className={`pi pi-spin pi-spinner`}/>:<span>Подтвердить Email</span>}
						onClick={sendLinkConfirmEmail}
					/>
				</div>
			</Card>
			<Card title="Сменить пароль" className={classes.card}>
				<div className={classes.passwords}>
					<span className={clsx("p-float-label", classes.inputInner, classes.inputInnerPassword)}>
						<Password
							className={classes.inputPassword}
							inputId="password"
							value={password}
							toggleMask
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label htmlFor="password" className={classes.label}>Старый пароль</label>
					</span>
					<span className={clsx("p-float-label", classes.inputInner, classes.inputInnerPassword)}>
						<Password
							className={classes.inputPassword}
							inputId="newPassword"
							value={newPassword}
							toggleMask
							onChange={(e) => setNewPassword(e.target.value)}
						/>
						<label htmlFor="password" className={classes.label}>Новый пароль</label>
					</span>
					<span className={clsx("p-float-label", classes.inputInner, classes.inputInnerPassword)}>
						<Password
							className={classes.inputPassword}
							inputId="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<label htmlFor="confirmPassword" className={classes.label}>Повторите новый пароль</label>
					</span>
				</div>
				<div className={classes.btnContainer}>
					<Button
						onClick={resetPassword}
						className={classes.resetPasswordBtn}
						label={fetchResetPassword ? <i className={`pi pi-spin pi-spinner`}/>:<span>Сменить пароль</span>}
					/>
				</div>

			</Card>
			<Toast ref={toast} position="bottom-right"/>
		</>
	);
};

const mapStateToProps = state =>({
	user: state.auth.user
})

export default connect(mapStateToProps,{refreshUserData})(Settings);
