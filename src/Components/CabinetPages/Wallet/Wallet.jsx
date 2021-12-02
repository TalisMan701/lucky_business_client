import React, {useEffect, useState} from 'react';
import classes from './Wallet.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {Card} from "primereact/card";
import {connect} from "react-redux";
import {TabPanel, TabView} from "primereact/tabview";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {payAPI} from "../../../Api/api";
import moment from "moment";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
const Wallet = (props) => {
	const [balance, setBalance] = useState("Ошибка на сервере")
	const [activeIndex, setActiveIndex] = useState(0);
	const [sum, setSum] = useState(null)
	const [fetchTopUp, setFetchTopUp] = useState(false)
	const [fetchWithdraw, setFetchWithdraw] = useState(false)
	const [fetchGetWalletData, setFetchGetWalletData] = useState(true)
	const [tranz, setTranz] = useState([])


	useEffect(()=>{
		getWalletData()
	},[])

	const getActualTranz = () => {
		setFetchGetWalletData(true)
		payAPI.updateTranz()
			.then(response => {
				setBalance(response.data.balance)
				setTranz(response.data.payments)
				setFetchGetWalletData(false)
			})
			.catch(error => {
				props.toast.current.show({severity: 'error', summary: 'Обновление транзакций', detail: 'Ошибка на сервере, попробуйте снова!'})
				setFetchGetWalletData(false)
			})
	}

	const getWalletData = () => {
		setFetchGetWalletData(true)
		payAPI.getWalletDataServer()
			.then(response => {
				setBalance(response.data.balance)
				setTranz(response.data.payments)
				setFetchGetWalletData(false)
			})
			.catch(error => {
				setFetchGetWalletData(false)
			})
	}

	const topUp = () => {
		if(sum > 0){
			setFetchTopUp(true)
			payAPI.topUpBalance(sum)
				.then(response => {
					setSum(null)
					setFetchTopUp(false)
					window.location = response.data.link
				})
				.catch(error => {
					setFetchTopUp(false)
					props.toast.current.show({severity: 'error', summary: 'Пополнение баланса', detail: 'Ошибка на сервере, попробуйте снова!'})
				})
		}else{
			props.toast.current.show({severity: 'error', summary: 'Пополнение баланса', detail: 'Сумма не должна быть нулевой!'})
		}
	}

	const withdraw = () => {

	}

	const createdAtTranzTemplate = (rowData) => {
		return moment(rowData.created_at).locale("ru").format("LLL")
	}

	const sumTranzTemplate = (rowData) => {
		return rowData.amount.value + " ₽"
	}

	const statusTranzTemplate = (rowData) => {
		let tempStatus = "Успешно"
		if(rowData.status === "pending"){
			tempStatus = "Ожидание"
		}
		if(rowData.status === "canceled"){
			tempStatus = "Отменено"
		}
		return tempStatus
	}

	return (
		<>
			<MainTitle>Кошелёк</MainTitle>
			<Card
				className={classes.cardInfo}
			>
				<div className={classes.cardInfoTitle}>Баланс:</div>
				{fetchGetWalletData ?
					<div className={classes.fetchInner}>
						<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
					</div>:
					<div className={classes.cardInfoCount}>₽ {balance.toLocaleString()}</div>
				}
			</Card>

			<div className={classes.card}>
				<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
					<TabPanel header="Пополнение">
						<div className={classes.inputInner}>
							<InputNumber className={classes.input} inputId="currency-rub" value={sum} onValueChange={(e) => setSum(e.value)} min={0} suffix="₽" useGrouping={false} locale="ru-RU" />
							<Button
								disabled={fetchGetWalletData}
								className={classes.btn}
								label={!fetchTopUp ?
									<span>Пополнить</span>
									: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
								}
								onClick={topUp}
							/>
						</div>
						<div className={classes.tranzInner}>
							<div className={classes.tranzTitleInner}>
								<div className={classes.tranzTitle}>Транзакции</div>
								<Button
									disabled={fetchGetWalletData}
									/*label={!fetchGetWalletData ?
										<span>Обновить</span>
										: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
									}*/
									label={'Обновить'}
									className={classes.tranzTitleBtn}
									onClick={getActualTranz}
								/>
							</div>
							<DataTable
								value={tranz}
								responsiveLayout="scroll"
								loading={fetchGetWalletData}
								removableSort
							>
								<Column field="created_at" header="Дата" body={createdAtTranzTemplate}/>
								<Column field="amount" header="Сумма" body={sumTranzTemplate}/>
								<Column field="status" header="Статус" body={statusTranzTemplate}/>
							</DataTable>
						</div>
					</TabPanel>
					<TabPanel header="Вывод">
						<div className={classes.inputInner}>
							<InputNumber className={classes.input} inputId="currency-rub" value={sum} onValueChange={(e) => setSum(e.value)} min={0} suffix="₽" useGrouping={false} locale="ru-RU" />
							<Button
								className={classes.btn}
								label={!fetchWithdraw ?
									<span>Вывести</span>
									: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
								}
								onClick={withdraw}
							/>
						</div>
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
