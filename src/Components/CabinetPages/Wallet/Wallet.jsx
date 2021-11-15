import React, {useState} from 'react';
import classes from './Wallet.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {Card} from "primereact/card";
import {connect} from "react-redux";
import {TabPanel, TabView} from "primereact/tabview";
const Wallet = (props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<>
			<MainTitle>Кошелёк</MainTitle>
			<Card
				className={classes.cardInfo}
			>
				<div className={classes.cardInfoTitle}>Баланс:</div>
				<div className={classes.cardInfoCount}>₽ {props.user?.balance?.toLocaleString()}</div>
			</Card>

			<div className={classes.card}>
				<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
					<TabPanel header="Пополнить">
						Пополнить
					</TabPanel>
					<TabPanel header="Вывести">
						Вывести
					</TabPanel>
				</TabView>
			</div>
		</>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps, {})(Wallet);
