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
	return (
		<>
			<MainTitle>Админ панель</MainTitle>
			<div className={classes.card}>
				<TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
					<TabPanel header="Пользователи">
						Все пользователи:
						<div>
							{fetchGetUsers ?
								<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>:
								<>
									{/*{users.map(user=>{
										return(
											<div className={classes.user}>
												<Avatar image={user.pathAvatar} shape="circle"/>
												<div className={classes.userContent}>
													<div className={classes.userName}>
														{user.name}<span> </span>
														{user.surname}
													</div>
													<div className={classes.userEmail}>
														{user.email}
													</div>
													<div className={classes.userBalance}>
														{user.balance}₽
													</div>
												</div>
											</div>
										)
									})}*/}
									<DataTable value={users} responsiveLayout="scroll">
										<Column field="name" header="Имя"/>
										<Column field="surname" header="Фамилия"/>
										<Column field="email" header="Email"/>
										<Column field="balance" header="Баланс"/>
									</DataTable>
								</>
							}
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
