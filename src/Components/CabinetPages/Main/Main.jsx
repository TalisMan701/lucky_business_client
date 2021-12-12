import React, {useEffect, useState} from 'react';
import classes from './Main.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {Card} from "primereact/card";
import {connect} from "react-redux";
import {Avatar} from "primereact/avatar";
import photoCval from "../../../Images/Other/photo_2021-12-01_16-11-51.jpg"
import {ProgressBar} from "primereact/progressbar";
import clsx from "clsx";
import {Button} from "primereact/button";
import {partnerProgramAPI} from "../../../Api/api";
import Countdown, {zeroPad} from "react-countdown";
import BonusImg from "../../../Images/Other/bonus.png";
import {TabPanel, TabView} from "primereact/tabview";
import {refreshUserData} from "../../../Store/auth-reducer";
const Main = (props) => {
	const [showCval, setShowCval] = useState(false)
	const [dateOldFastBonusEnd, setDateOldFastBonusEnd] = useState(null)
	const [token, setToken] = useState(null)
	const [fetchActivateFastBonus, setFetchActivateFastBonus] = useState(false)
	const [fetchGetSurprise, setFetchGetSurprise] = useState([])

	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(()=>{
		setToken(props.user.token)
	},[])

	useEffect(()=>{
		setToken(props.user.token)
	}, [props.user])

	const activateFastBonus = () => {
		setFetchActivateFastBonus(true)
		partnerProgramAPI.activateFastBonus()
			.then(response => {
				setDateOldFastBonusEnd(response.data.token.date_end)
				setToken(response.data.token)
				setFetchActivateFastBonus(false)
			})
			.catch(error => {
				props.toast.current.show({severity: 'error', summary: 'Бонус быстрого старта', detail: 'Ошибка на сервере, попробуйте снова!'})
				setFetchActivateFastBonus(false)
			})
	}

	const getSurprise = (id, index) => {
		setFetchGetSurprise(prev => [...prev, index])
		partnerProgramAPI.getSurprise(id)
			.then(response => {
				props.refreshUserData()
				setFetchGetSurprise(prev => prev.filter(indexOld => indexOld !== index))
				props.toast.current.show({severity: 'success', summary: 'Получение бонуса', detail: 'Бонус успешно получен!'})
			})
			.catch(error => {
				setFetchGetSurprise(prev => prev.filter(indexOld => indexOld !== index))
				props.toast.current.show({severity: 'error', summary: 'Получение бонуса', detail: 'Ошибка на сервере, попробуйте снова!'})
			})
	}

	if(showCval){
		return (
			<>
				<div className={classes.row}>
					<MainTitle>Ваша квалификация: {props.user?.level}</MainTitle>
					<div
						className={classes.back}
						onClick={()=>{
							setShowCval(false)
						}}
					>
						Назад
					</div>
				</div>
				<div className={classes.card}>
					<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
						<TabPanel header="1" headerClassName={clsx(props.user?.level >= 1 && classes.headerCval)}>
							<div className={clsx(classes.CvalItem)}>
								<div className={classes.CvalItemNumber}>
									1
								</div>
								<div>Наличие WHITE пакета</div>
							</div>
						</TabPanel>
						<TabPanel header="2" headerClassName={clsx(props.user?.level >= 2 && classes.headerCval)}>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									1
								</div>
								<div>Наличие YELLOW пакета</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									2
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>5 партнеров на 1-ой линии:</div>
									<ProgressBar value={props.user?.countPartnersOfLine1?.all * 100 / 5} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{props.user?.countPartnersOfLine1?.all}
										</div>
										<div style={{fontSize: 12}}>
											5
										</div>
									</div>
								</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									3
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>₽20тыс. оборот с 1-ой линии:</div>
									<ProgressBar value={props.user?.totalTurnover?.line1 * 100 / 20000} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{props.user?.totalTurnover?.line1}₽
										</div>
										<div style={{fontSize: 12}}>
											20000₽
										</div>
									</div>
								</div>
							</div>
							<div className={classes.priz}>Награда:</div>
							<div className={classes.prizPrice}>1000₽</div>
						</TabPanel>
						<TabPanel header="3" headerClassName={clsx(props.user?.level >= 3 && classes.headerCval)}>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									1
								</div>
								<div>Наличие GREEN пакета</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									2
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>1 партнер с 2-ой квалификацией на 1-ой линии:</div>
									<ProgressBar value={props.user?.countPartnersOfLine1?.level2 * 100 / 1} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{props.user?.countPartnersOfLine1?.level2}
										</div>
										<div style={{fontSize: 12}}>
											1
										</div>
									</div>
								</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									3
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>₽50тыс. оборот с 2-х линий:</div>
									<ProgressBar value={(props.user?.totalTurnover?.line2 + props.user?.totalTurnover?.line1 )* 100 / 50000} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{(props.user?.totalTurnover?.line2 + props.user?.totalTurnover?.line1 )}₽
										</div>
										<div style={{fontSize: 12}}>
											50000₽
										</div>
									</div>
								</div>
							</div>
							<div className={classes.priz}>Награда:</div>
							<div className={classes.prizPrice}>3000₽</div>
						</TabPanel>
						<TabPanel header="4" headerClassName={clsx(props.user?.level >= 4 && classes.headerCval)}>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									1
								</div>
								<div>Наличие DARK-BLUE пакета</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									2
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>3 партнерa с 2-ой квалификацией на 1-ой линии:</div>
									<ProgressBar value={props.user?.countPartnersOfLine1?.level2 * 100 / 3} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{props.user?.countPartnersOfLine1?.level2}
										</div>
										<div style={{fontSize: 12}}>
											3
										</div>
									</div>
								</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									3
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>₽200тыс. оборот с 2-х линий:</div>
									<ProgressBar value={(props.user?.totalTurnover?.line2 + props.user?.totalTurnover?.line1 ) * 100 / 200000} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{(props.user?.totalTurnover?.line2 + props.user?.totalTurnover?.line1 )}₽
										</div>
										<div style={{fontSize: 12}}>
											200000₽
										</div>
									</div>
								</div>
							</div>
							<div className={classes.priz}>Награда:</div>
							<div className={classes.prizPrice}>10000₽</div>
						</TabPanel>
						<TabPanel header="5" headerClassName={clsx(props.user?.level >= 5 && classes.headerCval)}>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									1
								</div>
								<div>Наличие PURPLE пакета</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									2
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>1 партнер с 4-ой квалификацией на 1-ой линии:</div>
									<ProgressBar value={props.user?.countPartnersOfLine1?.level4 * 100 / 1} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{props.user?.countPartnersOfLine1?.level4}
										</div>
										<div style={{fontSize: 12}}>
											1
										</div>
									</div>
								</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									3
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>₽500тыс. оборот с 3-х линий:</div>
									<ProgressBar value={(props.user?.totalTurnover?.line3 + props.user?.totalTurnover?.line2 + props.user?.totalTurnover?.line1 ) * 100 / 500000} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{(props.user?.totalTurnover?.line3 + props.user?.totalTurnover?.line2 + props.user?.totalTurnover?.line1 )}₽
										</div>
										<div style={{fontSize: 12}}>
											500000₽
										</div>
									</div>
								</div>
							</div>
							<div className={classes.priz}>Награда:</div>
							<div className={classes.prizPrice}>AirPods Pro</div>
						</TabPanel>
						<TabPanel header="6" headerClassName={clsx(props.user?.level >= 6 && classes.headerCval)}>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									1
								</div>
								<div>Наличие RED пакета</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									2
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>2 партнерa с 5-ой квалификацией на 1-ой линии:</div>
									<ProgressBar value={props.user?.countPartnersOfLine1?.level5 * 100 / 2} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{props.user?.countPartnersOfLine1?.level5}
										</div>
										<div style={{fontSize: 12}}>
											2
										</div>
									</div>
								</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									3
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>₽1млн. оборот с 4-х линий:</div>
									<ProgressBar value={(props.user?.totalTurnover?.line4 + props.user?.totalTurnover?.line3 + props.user?.totalTurnover?.line2 + props.user?.totalTurnover?.line1 ) * 100 / 1000000} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{(props.user?.totalTurnover?.line4 + props.user?.totalTurnover?.line3 + props.user?.totalTurnover?.line2 + props.user?.totalTurnover?.line1 )}₽
										</div>
										<div style={{fontSize: 12}}>
											1млн ₽
										</div>
									</div>
								</div>
							</div>
							<div className={classes.priz}>Награда:</div>
							<div className={classes.prizPrice}>Apple watch</div>
						</TabPanel>
						<TabPanel header="7" headerClassName={clsx(props.user?.level >= 7 && classes.headerCval)}>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									1
								</div>
								<div>Наличие RED пакета</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									2
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>2 партнерa с 6-ой квалификацией на 1-ой линии:</div>
									<ProgressBar value={props.user?.countPartnersOfLine1?.level6 * 100 / 2} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{props.user?.countPartnersOfLine1?.level6}
										</div>
										<div style={{fontSize: 12}}>
											2
										</div>
									</div>
								</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									3
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>₽5млн. оборот с 6 линий:</div>
									<ProgressBar value={props.user?.totalTurnover?.main * 100 / 5000000} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{props.user?.totalTurnover?.main}₽
										</div>
										<div style={{fontSize: 12}}>
											5млн ₽
										</div>
									</div>
								</div>
							</div>
							<div className={classes.priz}>Награда:</div>
							<div className={classes.prizPrice}>Iphone 13 Pro</div>
						</TabPanel>
						<TabPanel header="8" headerClassName={clsx(props.user?.level >= 8 && classes.headerCval)}>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									1
								</div>
								<div>Наличие RED пакета</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									2
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>2 партнерa с 7-ой квалификацией на 1-ой линии:</div>
									<ProgressBar value={props.user?.countPartnersOfLine1?.level7 * 100 / 2} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{props.user?.countPartnersOfLine1?.level7}
										</div>
										<div style={{fontSize: 12}}>
											2
										</div>
									</div>
								</div>
							</div>
							<div className={classes.CvalItem}>
								<div className={classes.CvalItemNumber}>
									3
								</div>
								<div className={classes.CvalItemProgressInner}>
									<div className={classes.CvalItemProgressText}>₽10млн. оборот с 6 линий:</div>
									<ProgressBar value={props.user?.totalTurnover?.main * 100 / 10000000} className={classes.progressBar} style={{width: "100%"}}/>
									<div className={classes.progressBarDescInner} style={{marginTop: 2}}>
										<div style={{fontSize: 12}}>
											{props.user?.totalTurnover?.main}₽
										</div>
										<div style={{fontSize: 12}}>
											10млн ₽
										</div>
									</div>
								</div>
							</div>
							<div className={classes.priz}>Награда:</div>
							<div className={classes.prizPrice}>Mac Apple</div>
						</TabPanel>
					</TabView>
				</div>
			</>
		)
	}
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
					<div className={classes.cardInfoTitle}>Баланс:</div>
					{props.fetchRefreshUserData ?
						<div className={classes.fetch}>
							<i className={`pi pi-spin pi-spinner`}/>
						</div>:
						<div className={classes.cardInfoCount}>₽ {props.user?.balance.toLocaleString()}</div>
					}

				</Card>
				<div
					style={{width: "50%", position: "relative"}}
					onClick={()=>{
						setActiveIndex(props.user?.level === 8 ? 7 : props.user?.level)
						setShowCval(true)
					}}
				>
					<Card
						className={clsx(classes.cardInfo, classes.cardInfoCval)}
						style={{width: "100%"}}
					>
						<div className={classes.cardInfoTitle}>Квалификация:</div>
						{props.fetchRefreshUserData ?
							<div className={classes.fetch}>
								<i className={`pi pi-spin pi-spinner`}/>
							</div>:
							<div className={classes.cardInfoCount}>{props.user?.level}</div>
						}
					</Card>
					{/*<div className={classes.cardInfoCvalIcon}>
						<i className={`pi pi-info-circle`}/>
					</div>*/}
				</div>
			</div>
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
					<div className={classes.cardInfoTitle}>Оборот:</div>
					{props.fetchRefreshUserData ?
						<div className={classes.fetch}>
							<i className={`pi pi-spin pi-spinner`}/>
						</div>:
						<div className={classes.cardInfoCount}>₽ {props.user?.totalTurnover?.main.toLocaleString()}</div>
					}

				</Card>
			</div>
			<Card
				title={"Бонус личного товарооборота"}
				className={classes.cardHeader}
				style={{marginBottom: 24}}
			>
				<ProgressBar value={props.user.rangePay/100} className={classes.progressBar}/>
				<div className={classes.progressBarDescInner}>
					<div>
						{props.user.rangePay}₽
					</div>
					<div>
						10000₽
					</div>
				</div>
				{/*<img style={{width: "100%"}} src={photoCval} alt=""/>*/}
			</Card>

			<Card
				title={"Бонус: каждое 5-ое подключение одноименного пакета"}
				className={classes.cardHeader}
				style={{marginBottom: 24}}
			>
				<ProgressBar value={props?.user?.countBonuse5x * 100/5} className={classes.progressBar}/>
				<div className={classes.progressBarDescInner}>
					<div>
						{props?.user?.countBonuse5x}
					</div>
					<div>
						5
					</div>
				</div>
				{/*<img style={{width: "100%"}} src={photoCval} alt=""/>*/}
			</Card>

			<Card
				title={"Бонус быстрого старта"}
				className={classes.cardHeader}
				style={{marginBottom: 24}}
			>
				{props.fetchRefreshUserData ?
					<div>
						<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
					</div>:
					<>
						{!token ?
							<div className={classes.fastBonusOne}>
								<div className={classes.fastBonusOneTextInner}>
									<div>
										<div className={classes.fastBonusOneText}>
											Первые 3 приглашения на пакет, равный собственному, суммарно дает бонус 100%
										</div>
										<div className={classes.fastBonusOneText2}>
											При активации, у Вас будет <span>14 дней</span>, чтобы воспользоваться этим бонусом!
										</div>
									</div>
									<img src={BonusImg} alt="" className={classes.bonusItemImg}/>
								</div>
								<Button
									onClick={activateFastBonus}
									label={!fetchActivateFastBonus ?
										<span>Активировать</span>
										: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
									}
									style={{width: 140}}
								/>
							</div>:
							<>
								{token.status === "Pending" &&
								<div className={classes.fastBonusTwo}>
									<Countdown
										date={Date.parse(token?.date_end)}
										renderer={props =>
											<div>
												<span className={classes.timeText}>{zeroPad(props.days)}Д </span>
												<span className={classes.timeText}>{zeroPad(props.hours)}Ч </span>
												<span className={classes.timeText}>{zeroPad(props.minutes)}М </span>
												<span className={classes.timeText}>{zeroPad(props.seconds)}С </span>
											</div>
										}
									/>
									<div className={classes.fastBonusTwoRow}>
										<div
											className={clsx(classes.fastBonusTwoPerson, token.count >= 1 && classes.fastBonusTwoPersonActive)}>
											<i className="pi pi-user" style={{'fontSize': '26px'}}/>
										</div>
										<div
											className={clsx(classes.fastBonusTwoPerson, token.count >= 2 && classes.fastBonusTwoPersonActive)}>
											<i className="pi pi-user" style={{'fontSize': '26px'}}/>
										</div>
										<div
											className={clsx(classes.fastBonusTwoPerson, token.count >= 3 && classes.fastBonusTwoPersonActive)}>
											<i className="pi pi-user" style={{'fontSize': '26px'}}/>
										</div>
									</div>
								</div>
								}
								{token.status === "canceled" &&
								<div className={classes.fastBonus3}>
									<div>Время истекло :(</div>
									<div className={classes.fastBonusTwoRow}>
										<div className={clsx(classes.fastBonusTwoPersonError, token.count >= 1 && classes.fastBonusTwoPersonActive)}>
											<i className="pi pi-user" style={{'fontSize': '26px'}}/>
										</div>
										<div className={clsx(classes.fastBonusTwoPersonError, token.count >= 2 && classes.fastBonusTwoPersonActive)}>
											<i className="pi pi-user" style={{'fontSize': '26px'}}/>
										</div>
										<div className={clsx(classes.fastBonusTwoPersonError, token.count >= 3 && classes.fastBonusTwoPersonActive)}>
											<i className="pi pi-user" style={{'fontSize': '26px'}}/>
										</div>
									</div>
								</div>
								}
								{token.status === "susces" &&
								<div className={classes.fastBonus3}>
									<div>Успешно использован! :)</div>
									<div className={classes.fastBonusTwoRow}>
										<div className={clsx(classes.fastBonusTwoPersonError, token.count >= 1 && classes.fastBonusTwoPersonActive)}>
											<i className="pi pi-user" style={{'fontSize': '26px'}}/>
										</div>
										<div className={clsx(classes.fastBonusTwoPersonError, token.count >= 2 && classes.fastBonusTwoPersonActive)}>
											<i className="pi pi-user" style={{'fontSize': '26px'}}/>
										</div>
										<div className={clsx(classes.fastBonusTwoPersonError, token.count >= 3 && classes.fastBonusTwoPersonActive)}>
											<i className="pi pi-user" style={{'fontSize': '26px'}}/>
										</div>
									</div>
								</div>
								}

							</>
						}
					</>
				}
			</Card>
			<Card
				title={"Мои подарки"}
				className={classes.cardHeader}
			>
				{props.fetchRefreshUserData ?
					<div className={classes.fetch}>
						<i className={`pi pi-spin pi-spinner`}/>
					</div>:
					<>
						{props.user?.surprise.length >= 1 ?
							<>
								{props.user?.surprise.map((surp, index) => {
									return(
										<div className={classes.surpInner}>
											<div className={classes.surpText}>{surp?.surprise?.description}</div>
											{surp.status ?
												<Button
													disabled={true}
													label={<i className="pi pi-check" style={{'fontSize': '24px'}}/>}
													className={classes.surpBtn}
												/>:
												<Button
													label={fetchGetSurprise.indexOf(index) == -1 ?
														<span>Получить</span>
														: <i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
													}
													className={classes.surpBtn}
													onClick={() => getSurprise(surp?.id, index)}
												/>
											}
										</div>

									)
								})}
							</>:
							<div>У Вас нет подарков :(</div>
						}
					</>
				}
			</Card>
		</>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user,
	fetchRefreshUserData: state.auth.fetchRefreshUserData
})


export default connect(mapStateToProps,{refreshUserData})(Main);
