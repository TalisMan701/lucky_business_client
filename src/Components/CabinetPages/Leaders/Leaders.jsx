import React, {useEffect, useState} from 'react';
import classes from './Leaders.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {arenaLeadersAPI} from "../../../Api/api";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Avatar} from "primereact/avatar";
const Leaders = () => {
	const [users, setUsers] = useState([])
	const [fetchGetUsers, setFetchGetUsers] = useState(true)

	useEffect(()=>{
		getLeaders()
	},[])

	const getLeaders = () => {
		setFetchGetUsers(true)
		arenaLeadersAPI.getLeaders()
			.then(response => {
				setUsers(response.data)
				setFetchGetUsers(false)
			})
			.catch(error => {
				setFetchGetUsers(false)
			})
	}

	const avatarBodyTemplate = (rowData) => {
		return(
			<Avatar image={rowData.pathAvatar} size="normal"  shape="circle"/>
		)
	}

	const formatCurrency = (value) => {
		return value.toLocaleString('en-US', {style: 'currency', currency: 'RUS'});
	}

	const priceBodyTemplate = (rowData) => {
		return formatCurrency(rowData.salesAmountReferal);
	}

	return (
		<>
			<MainTitle>Арена лидеров</MainTitle>

			<DataTable
				value={users}
				responsiveLayout="scroll"
				loading={fetchGetUsers}
				removableSort
			>
				<Column header="Аватар" body={avatarBodyTemplate}/>
				<Column field="name" header="Имя"/>
				<Column field="surname" header="Фамилия"/>
				<Column field="salesAmountReferal" header="Заработано" body={priceBodyTemplate}/>
				<Column field="level" header="Квалификация"/>
			</DataTable>
		</>
	);
};

export default Leaders;
