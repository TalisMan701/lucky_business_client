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
import {InputText} from "primereact/inputtext";
import clsx from "clsx";
import {InputMask} from "primereact/inputmask";

const Wallet = (props) => {
	const [balance, setBalance] = useState("Ошибка на сервере")
	const [activeIndex, setActiveIndex] = useState(0);
	const [sum, setSum] = useState(null)
	const [sum2, setSum2] = useState(null)
	const [fetchTopUp, setFetchTopUp] = useState(false)
	const [fetchWithdraw, setFetchWithdraw] = useState(false)
	const [fetchGetWalletData, setFetchGetWalletData] = useState(true)
	const [tranz, setTranz] = useState([])
	const [tranzPayout, setTranzPayout] = useState([])

	const [name, setName] = useState(null)
	const [surname, setSurname] = useState(null)
	const [patronymic, setPatronymic] = useState(null)
	const [numberCard, setNumberCard] = useState(null)
	const [invalidPayout, setInvalidPayout] = useState({
		surname: '',
		name: '',
		patronymic: '',
		numberCard: '',
		sum2: ''
	})
	const [fetchPayout, setFetchPayout] = useState(false)


	const initialInvalidPayload = {
		surname: '',
		name: '',
		patronymic: '',
		numberCard: '',
		sum2: ''
	}


	useEffect(()=>{
		if(activeIndex === 0){
			getActualTranz()
		}else{
			getAllPayload()
		}
	},[activeIndex])

	const getAllPayload = () => {
		setFetchGetWalletData(true)
		payAPI.getAllPayout()
			.then(response => {
				setBalance(response.data.balance)
				setTranzPayout(response.data.payouts)
				setFetchGetWalletData(false)
			})
			.catch(error => {
				setFetchGetWalletData(false)
			})
	}

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

	const payout = () => {
		setFetchPayout(true)
		if(surname && name && patronymic && numberCard && sum2){
			payAPI.createPayout(`${surname} ${name} ${patronymic}`, sum2, numberCard)
				.then(response => {
					props.toast.current.show({severity: 'success', summary: 'Пополнение баланса', detail: 'Прошло успешно'})
					getAllPayload()
					setTranzPayout(prev => [response.data, ...prev])
					setSurname(prev => "")
					setName(prev => "")
					setPatronymic(prev => "")
					setNumberCard(prev => null)
					setSum2(prev => null)
					setFetchPayout(false)
				})
				.catch(error => {
					props.toast.current.show({severity: 'error', summary: 'Заказ выплаты', detail: 'Ошибка на сервере, попробуйте снова!'})
					setFetchPayout(false)
				})
		}else{
			if(!surname){
				setInvalidPayout(prev => ({...prev, surname: "Заполните поле!"}))
			}
			if(!name){
				setInvalidPayout(prev => ({...prev, name: "Заполните поле!"}))
			}
			if(!patronymic){
				setInvalidPayout(prev => ({...prev, patronymic: "Заполните поле!"}))
			}
			if(!numberCard){
				setInvalidPayout(prev => ({...prev, numberCard: "Заполните поле!"}))
			}
			if(!sum2){
				setInvalidPayout(prev => ({...prev, sum2: "Заполните поле!"}))
			}
			setFetchPayout(false)
		}
	}

	const createdAtTranzTemplate = (rowData) => {
		return moment(rowData?.created_at ?? rowData?.date).locale("ru").format("LLL")
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

	const statusTranzTemplate2 = (rowData) => {
		let tempStatus = "Успешно"
		if(rowData.status === "pending"){
			tempStatus = "Ожидание"
		}
		if(rowData.status === "cancel"){
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
							<span className={clsx("p-float-label", classes.inputPayoutInner)}>
									<InputNumber
										className={clsx(classes.inputPayout, invalidPayout.sum2 && 'p-invalid')}
										inputId={"currency-rub"}
										value={sum}
										onValueChange={(e) => {
											setSum(e.value)
										}}
										min={0}
										suffix="₽"
										useGrouping={false}
										locale="ru-RU"
									/>
									<label htmlFor="currency-rub" className={classes.label}>Сумма</label>
								</span>
							<Button
								disabled={fetchGetWalletData}
								className={classes.btnPayout}
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
						<div className={classes.Payout}>
							<div className={classes.row}>
								<span className={clsx("p-float-label", classes.inputPayoutInner)}>
									<InputText
										className={clsx(classes.inputPayout, invalidPayout.surname && 'p-invalid')}
										id={"surname"}
										value={surname}
										onChange={(e) => {
											setInvalidPayout(prev => ({...prev, surname: ""}))
											setSurname(e.target.value)
										}}
									/>
									<label htmlFor="surname" className={classes.label}>Фамилия</label>
								</span>
								<span className={clsx("p-float-label", classes.inputPayoutInner)}>
									<InputText
										className={clsx(classes.inputPayout, invalidPayout.name && 'p-invalid')}
										id={"name"}
										value={name}
										onChange={(e) => {
											setInvalidPayout(prev => ({...prev, name: ""}))
											setName(e.target.value)
										}}
									/>
									<label htmlFor="name" className={classes.label}>Имя</label>
								</span>
								<span className={clsx("p-float-label", classes.inputPayoutInner)}>
									<InputText
										className={clsx(classes.inputPayout, invalidPayout.patronymic && 'p-invalid')}
										id={"patronymic"}
										value={patronymic}
										onChange={(e) => {
											setInvalidPayout(prev => ({...prev, patronymic: ""}))
											setPatronymic(e.target.value)
										}}
									/>
									<label htmlFor="patronymic" className={classes.label}>Отчество</label>
								</span>
							</div>
							<div className={classes.row}>
								<span className={clsx("p-float-label", classes.inputPayoutInner)}>
									<InputMask
										className={clsx(classes.inputPayout, invalidPayout.numberCard && 'p-invalid')}
										mask="9999-9999-9999-9999"
										id={'numberCard'}
										value={numberCard}
										onChange={(e) => {
											setInvalidPayout(prev => ({...prev, numberCard: ""}))
											setNumberCard(e.value)
										}}
									/>
									<label htmlFor="numberCard" className={classes.label}>Номер карты</label>
								</span>
							</div>
							<div className={classes.row}>
								<span className={clsx("p-float-label", classes.inputPayoutInner)}>
									<InputNumber
										className={clsx(classes.inputPayout, invalidPayout.sum2 && 'p-invalid')}
										inputId={"currency-rub"}
										value={sum2}
										onValueChange={(e) => {
											setInvalidPayout(prev => ({...prev, sum2: ""}))
											setSum2(e.value)
										}}
										min={0}
										max={props.user?.balance}
										suffix="₽"
										useGrouping={false}
										locale="ru-RU"
									/>
									<label htmlFor="currency-rub" className={classes.label}>Сумма</label>
								</span>
								<Button
									className={classes.btnPayout}
									label={!fetchPayout ?
										<span>Заказать выплату</span>
										: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
									}
									onClick={payout}
								/>
							</div>
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
									onClick={getAllPayload}
								/>
							</div>
							<DataTable
								value={tranzPayout}
								responsiveLayout="scroll"
								loading={fetchGetWalletData}
								removableSort
							>
								<Column field="date" header="Дата" body={createdAtTranzTemplate}/>
								<Column field="card" header="Номер карты"/>
								<Column field="amount" header="Сумма" body={sumTranzTemplate}/>
								<Column field="status" header="Статус" body={statusTranzTemplate2}/>
							</DataTable>
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
