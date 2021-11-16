import React, {useEffect, useState} from 'react';
import classes from './PartnerProgram.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {partnerProgramAPI, productsAPI} from "../../../Api/api";
import {TabPanel, TabView} from "primereact/tabview";
import {Accordion, AccordionTab} from "primereact/accordion";
import {InputText} from "primereact/inputtext";
import {connect} from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Button} from "primereact/button";
import getProfit from "../../../utils/calculator";
import {Dropdown} from "primereact/dropdown";
import clsx from "clsx";
const PartnerProgram = (props) => {
	const [referals, setReferals] = useState([])
	const [activeIndex, setActiveIndex] = useState(0)
	const [profit, setProfit] = useState(0)
	const [selectRefProduct, setSelectRefProduct] = useState(null)
	const [selectMyProduct, setSelectMyProduct] = useState(null)
	const [products, setProducts] = useState([])
	const [countPeople, setCountPeople] = useState(0)

	const [fetchGetReferals, setFetchGetReferals] = useState(true)
	const [fetchGetAllProducts, setFetchGetAllProducts] = useState(true)


	useEffect(()=> {
		if(activeIndex === 0){
			getReferals()
		}
		if(activeIndex === 1){
			getProducts()
		}
	},[activeIndex])

	const getProducts = () => {
		setFetchGetAllProducts(true)
		productsAPI.getAllProducts()
			.then(response => {
				let tempDataProducts = []
				response.data.forEach((product, index) => {
					tempDataProducts.push({
						index: index,
						price: product.price,
						name: product.name
					})
				})
				setProducts(tempDataProducts)
				setFetchGetAllProducts(false)
			})
			.catch(error => {
				setFetchGetAllProducts(false)
			})
	}

	const getReferals = () => {
		setFetchGetReferals(true)
		partnerProgramAPI.getReferals()
			.then(response => {
				if(response.status === 200){
					setReferals(response.data)
				}
				setFetchGetReferals(false)
			})
			.catch(error => {
				setFetchGetReferals(false)
			})
	}

	const RefItem = (ref) => {
		return(
			<div className={classes.ref}>
				<span className={classes.refLastname}>{ref?.surname} </span>
				<span className={classes.refName}>{ref?.name}</span>
			</div>
		)
	}

	return (
		<>
			<MainTitle>Партнерская программа</MainTitle>
			<div className={classes.card}>
				<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
					<TabPanel header="Ваши рефералы">
						{fetchGetReferals ?
							<div>
								<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
							</div>:
							<>
								<div>Ваша ссылка:</div>
								<div className={classes.row}>
									<InputText
										readOnly
										value={`https://lucky-business-test.herokuapp.com/ref?uuid=${props.user.refLinkhash}`}
										className={classes.inputRef}
									/>
									<CopyToClipboard text={`https://lucky-business-test.herokuapp.com/ref?uuid=${props.user.refLinkhash}`}
													 onCopy={() => props.toast.current.show({severity: 'success', summary: 'Копирование', detail: 'Прошло успешно!'})}>
										<i className={`pi pi-copy ${classes.copyIcon}`}/>
									</CopyToClipboard>
								</div>
								<Accordion multiple>
									<AccordionTab header={`Линия 1: ${referals.line1?.length}чел.`}>
										{referals.line1?.length !== 0 ?
											<>
												{referals.line1?.map(ref => {
													return(
														RefItem(ref)
													)
												})}
											</>:
											<div>Нет рефералов!</div>
										}
									</AccordionTab>
									{referals.line2.length !== 0 &&
									<AccordionTab header={`Линия 2: ${referals.line2?.length}чел.`}>
										{referals.line2?.map(ref => {
											return(
												RefItem(ref)
											)
										})}
									</AccordionTab>
									}
									{referals.line3.length !== 0 &&
									<AccordionTab header={`Линия 3: ${referals.line3?.length}чел.`}>
										{referals.line3?.map(ref => {
											return(
												RefItem(ref)
											)
										})}
									</AccordionTab>
									}
									{referals.line4.length !== 0 &&
									<AccordionTab header={`Линия 4: ${referals.line4?.length}чел.`}>
										{referals.line4?.map(ref => {
											return(
												RefItem(ref)
											)
										})}
									</AccordionTab>
									}
									{referals.line5.length !== 0 &&
									<AccordionTab header={`Линия 5: ${referals.line5?.length}чел.`}>
										{referals.line5?.map(ref => {
											return(
												RefItem(ref)
											)
										})}
									</AccordionTab>
									}
									{referals.line6.length !== 0 &&
									<AccordionTab header={`Линия 6: ${referals.line6?.length}чел.`}>
										{referals.line6?.map(ref => {
											return(
												RefItem(ref)
											)
										})}
									</AccordionTab>
									}
								</Accordion>
							</>
						}
					</TabPanel>
					<TabPanel header="Калькулятор доходности">
						{fetchGetAllProducts ?
							<div>
								<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
							</div> :
							<>
								<Dropdown
									optionLabel="name"
									value={selectMyProduct}
									options={products}
									onChange={(e) => setSelectMyProduct(e.value)}
									placeholder="Выберете свой пакет"
									showClear
									className={classes.dropDown}
								/>
								<Dropdown
									optionLabel="name"
									value={selectRefProduct}
									options={products}
									onChange={(e) => setSelectRefProduct(e.value)}
									placeholder="Минимальный пакет рефералов"
									showClear
									className={classes.dropDown}
								/>
								<span className={clsx("p-float-label", classes.inputInner)}>
									<InputText
										className={classes.input}
										id="countPeople" value={countPeople}
										onChange={(e) => setCountPeople(e.target.value)}
									/>
									<label htmlFor="nameProduct" className={classes.label}>Количество приглашённых каждым</label>
								</span>
								<Button
									onClick={()=>{setProfit(getProfit(selectMyProduct.index, selectRefProduct.price, countPeople))}}
									label={"Рассчитать прибыль"}
								/>
								<div>
									Ваша примерная прибыль: {profit.toLocaleString()} RUB
								</div>
							</>
						}

					</TabPanel>
				</TabView>
			</div>
		</>
	);
};

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps, {})(PartnerProgram);
