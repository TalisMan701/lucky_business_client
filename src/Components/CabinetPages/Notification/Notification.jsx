import React, {useEffect, useState} from 'react';
import classes from './Notification.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {notificationsAPI} from "../../../Api/api";
import clsx from "clsx";
import {connect} from "react-redux";
import {updateUser} from "../../../Store/auth-reducer";
import moment from "moment";
import 'moment/locale/ru';
const Notification = (props) => {
	const [notifications, setNotifications] = useState([])
	const [fetchGetNotifications, setFetchGetNotifications] = useState(true)

	useEffect(()=>{
		getMyNotifications()
	},[])

	const getMyNotifications = () =>{
		setFetchGetNotifications(true)
		notificationsAPI.getMyNotifications()
			.then(response => {
				setNotifications(response.data)
				setFetchGetNotifications(false)
				notificationsAPI.readAllNotifications()
					.then(response => {
						props.updateUser({
							...props.user,
							countNotif: 0
						})
					})
			})
			.catch(error => {
				setFetchGetNotifications(false)
			})
	}

	return (
		<>
			<MainTitle>Уведомления</MainTitle>
			{fetchGetNotifications ?
				<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>:
				<div className={classes.notifications}>
					{notifications.map(notif => {
						return(
							<div className={clsx(classes.notif, notif.read && classes.notifRead)}>
								{/*<i className="pi pi-bell"/>*/}
								<div className={classes.notifDesc}>{notif.description}</div>
								{notif.type === "newRefBuy" &&
									<div className={classes.notifPrice}>+{notif.getMoney?.toLocaleString()} RUB</div>
								}
								<div className={classes.notifDate}>{moment(notif.date).locale("ru").format("LLL")}</div>
							</div>
						)
					})}
				</div>
			}
		</>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps, {updateUser})(Notification);
