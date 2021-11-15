import React, {useEffect, useState} from 'react';
import classes from './PartnerProgram.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {partnerProgramAPI} from "../../../Api/api";
import {TabPanel, TabView} from "primereact/tabview";
import {Accordion, AccordionTab} from "primereact/accordion";
import {InputText} from "primereact/inputtext";
import {connect} from "react-redux";
import {CopyToClipboard} from 'react-copy-to-clipboard';
const PartnerProgram = (props) => {
	const [referals, setReferals] = useState([])
	const [activeIndex, setActiveIndex] = useState(0)

	const [fetchGetReferals, setFetchGetReferals] = useState(true)


	useEffect(()=> {
		getReferals()
	},[])

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
						Калькулятор:
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
