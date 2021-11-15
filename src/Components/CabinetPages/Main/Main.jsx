import React from 'react';
import classes from './Main.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {Card} from "primereact/card";
import {connect} from "react-redux";
const Main = (props) => {
	return (
		<>
			<MainTitle>Мой кабинет</MainTitle>
			<div className={classes.info}>
				<Card
					className={classes.cardInfo}
				>
					<div className={classes.cardInfoTitle}>Общий доход:</div>
					<div className={classes.cardInfoCount}>₽ {props.user?.salesAmountReferal.toLocaleString()}</div>
				</Card>
				<Card
					className={classes.cardInfo}
				>
					<div className={classes.cardInfoTitle}>Квалификация:</div>
					<div className={classes.cardInfoCount}>{props.user?.level}</div>
				</Card>
			</div>
			<Card
				title={"Lucky Business"}
				className={classes.cardHeader}
			>
				<div>
					Lucky Business - это Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem modi quis quos.
				</div>
			</Card>

		</>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
})


export default connect(mapStateToProps,{})(Main);
