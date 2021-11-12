import React, {useState} from 'react';
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
const Settings = (props) => {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [email, setEmail] = useState(props.user.email)

	const uploadInvoice = async (file) => {
		console.log(file)
		let formData = new FormData();
		formData.append('file', file);
		settingsAPI.sendImage(formData)
			.then(response => {

			})
			.catch(error => {

			})
	};

	const uploadHandler = ({files}) => {
		const [file] = files;
		const fileReader = new FileReader()
		fileReader.onload = (e) => {
			uploadInvoice(file);
		};
		fileReader.readAsDataURL(file);
	}

	return (
		<>
			<MainTitle>Настройки</MainTitle>
			<Card title="Изменить фотографию" className={classes.card}>
				<Avatar image={props.user.pathAvatar} size="large"  shape="circle"/>
				<FileUpload
					name="demo"
					url={'http://192.168.3.4:8080/api/v1/users/settings/uploadAvatar'}
					accept="image/*"
					customUpload={true}
					uploadHandler={uploadHandler}
				/>
			</Card>
			<Card title="Подтвердить почту" className={classes.card}>
				<div className={classes.emailConfirm}>
					<div className="p-col-12 p-md-3" style={{marginRight: 16}}>
						{props.user?.confirmedEmail ?
							<Message severity="success" text="Email подтверждён!" />
							: <Message severity="error" text="Email не подтверждён!" />
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
						label={"Подтвердить Email"}
					/>
				</div>
			</Card>
			<Card title="Сменить пароль" className={classes.card}>
				<div className={classes.passwords}>
					<span className={clsx("p-float-label", classes.inputInner)}>
						<Password
							className={classes.inputPassword}
							inputId="password"
							value={password}
							toggleMask
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label htmlFor="password" className={classes.label}>Старый пароль</label>
					</span>
					<span className={clsx("p-float-label", classes.inputInner)}>
						<Password
							className={classes.inputPassword}
							inputId="newPassword"
							value={newPassword}
							toggleMask
							onChange={(e) => setNewPassword(e.target.value)}
						/>
						<label htmlFor="password" className={classes.label}>Новый пароль</label>
					</span>
					<span className={clsx("p-float-label", classes.inputInner)}>
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
						className={classes.resetPasswordBtn}
						label={"Сменить пароль"}
					/>
				</div>

			</Card>
		</>
	);
};

const mapStateToProps = state =>({
	user: state.auth.user
})

export default connect(mapStateToProps,{})(Settings);
