import React from 'react';
import classes from './Main.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {Card} from "primereact/card";
import {connect} from "react-redux";
import {Avatar} from "primereact/avatar";
import photoCval from "../../../Images/Other/photo_2021-12-01_16-11-51.jpg"
const Main = (props) => {
	return (
		<>
			<MainTitle>Мой кабинет</MainTitle>
			<Card className={classes.mi}>
				<div className={classes.miInner}>
					<Avatar image={props.user.pathAvatar} size="large"  shape="circle"/>
					<div style={{marginLeft: 16}}>
						<div style={{marginBottom: 4}}><span>{props.user.name} </span> <span>{props.user.surname}</span></div>
						<div>{props.user.email}</div>
					</div>
				</div>
			</Card>
			<div className={classes.info}>
				<Card
					className={classes.cardInfo}
				>
					<div className={classes.cardInfoTitle}>Общий доход:</div>
					{props.fetchRefreshUserData ?
						<div className={classes.fetch}>
							<i className={`pi pi-spin pi-spinner`}/>
						</div>:
						<div className={classes.cardInfoCount}>₽ {props.user?.salesAmountReferal.toLocaleString()}</div>
					}

				</Card>
				<Card
					className={classes.cardInfo}
				>
					<div className={classes.cardInfoTitle}>Квалификация:</div>
					{props.fetchRefreshUserData ?
						<div className={classes.fetch}>
							<i className={`pi pi-spin pi-spinner`}/>
						</div>:
						<div className={classes.cardInfoCount}>{props.user?.level}</div>
					}
				</Card>
			</div>
			<Card
				title={"Lucky Business"}
				className={classes.cardHeader}
			>
				<img style={{width: "100%"}} src={photoCval} alt=""/>
			</Card>

		</>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user,
	fetchRefreshUserData: state.auth.fetchRefreshUserData
})


export default connect(mapStateToProps,{})(Main);
