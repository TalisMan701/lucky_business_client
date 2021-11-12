import React, {useEffect, useState} from 'react';
import classes from './AdminPanel.module.css'
import MainTitle from "../../Components/CabinetComponents/MainTitle/MainTitle";
import {TabPanel, TabView} from "primereact/tabview";
import {Card} from "primereact/card";
import {adminAPI, productsAPI} from "../../Api/api";
import {Avatar} from "primereact/avatar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
const AdminPanel = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [users, setUsers] = useState([])
	const [fetchGetUsers, setFetchGetUsers] = useState(true)
	const [products, setProducts] = useState([])
	const [fetchGetAllProducts, setFetchGetAllProducts] = useState(true)
	useEffect(()=>{
		if(activeIndex === 0){
			setFetchGetUsers(true)
			adminAPI.getAllUsers()
				.then(response => {
					setUsers(response.data)
					setFetchGetUsers(false)
				})
				.catch(error => {
					setFetchGetUsers(false)
				})
		}
		if(activeIndex === 1){
			setFetchGetAllProducts(true)
			productsAPI.getAllProducts()
				.then(response => {
					console.log(response.data)
					setProducts(response.data)
					setFetchGetAllProducts(false)
				})
				.catch(error => {
					setFetchGetAllProducts(false)
				})
		}
	},[activeIndex])

	const avatarBodyTemplate = (rowData) => {
		return(
			<Avatar image={rowData.pathAvatar} size="normal"  shape="circle"/>
		)
	}

	const formatCurrency = (value) => {
		return value.toLocaleString('en-US', {style: 'currency', currency: 'RUS'});
	}

	const priceBodyTemplate = (rowData) => {
		return formatCurrency(rowData.balance);
	}

	return (
		<>
			<MainTitle>Админ панель</MainTitle>
			<div className={classes.card}>
				<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
					<TabPanel header="Пользователи">
						<div>
							<DataTable
								header={"Все пользователи:"}
								value={users}
								responsiveLayout="scroll"
								loading={fetchGetUsers}
								removableSort
							>
								<Column header="Аватар" body={avatarBodyTemplate}/>
								<Column field="name" header="Имя" sortable/>
								<Column field="surname" header="Фамилия" sortable/>
								<Column field="email" header="Email" sortable/>
								<Column field="balance" header="Баланс" body={priceBodyTemplate} sortable/>
							</DataTable>
						</div>
					</TabPanel>
					<TabPanel header="Продукты">
						Все продукты:
						<div>
							{fetchGetAllProducts ?
								<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>:
								<>
									{products.map(product => {
										return(
											<div>
												{product.name}
												<div>{product.description}</div>
												<div>{product.price}</div>
											</div>
										)
									})}
								</>
							}
						</div>
					</TabPanel>
				</TabView>
			</div>
		</>
	);
};

export default AdminPanel;
