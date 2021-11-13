import React, {useEffect, useState} from 'react';
import classes from './PartnerProgram.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {partnerProgramAPI} from "../../../Api/api";
const PartnerProgram = () => {
	const [referals, setReferals] = useState([])

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

	return (
		<>
			<MainTitle>Партнерская программа</MainTitle>
			<div>
				{referals.length === 0 ?
					<span>Нет рефералов</span>:
					<span>Есть рефералы</span>
				}
			</div>
		</>
	);
};

export default PartnerProgram;
