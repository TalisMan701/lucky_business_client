import React, {useEffect, useRef, useState} from 'react';
import classes from './AdminPanel.module.css'
import MainTitle from "../../Components/CabinetComponents/MainTitle/MainTitle";
import {TabPanel, TabView} from "primereact/tabview";
import {Card} from "primereact/card";
import {adminAPI, productsAPI} from "../../Api/api";
import {Avatar} from "primereact/avatar";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {FileUpload} from "primereact/fileupload";
import clsx from "clsx";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import Product from "../../Components/Products/Product/Product";
import {InputNumber} from "primereact/inputnumber";
const AdminPanel = (props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [users, setUsers] = useState([])
	const [fetchGetUsers, setFetchGetUsers] = useState(true)
	const [products, setProducts] = useState([])
	const [fetchGetAllProducts, setFetchGetAllProducts] = useState(true)
	const [nameProduct, setNameProduct] = useState('')
	const [priceProduct, setPriceProduct] = useState('')
	const [selectRefProduct, setSelectRefProduct] = useState(null)
	const [fetchCreateProduct, setFetchCreateProduct] = useState(false)

	const [userSelect, setUserSelect] = useState(null)
	const [addBalance, setAddBalance] = useState(null)
	const [fetchAddBalance, setFetchAddBalance] = useState(false)

	const [surpriseDesc, setSurpriseDesc] = useState(null)
	const [surprisePrice, setSurprisePrice] = useState(null)
	const [surpriseCvalNum, setSurpriseCvalNum] = useState(null)
	const [fetchAddSurprise, setFetchAddSurprise] = useState(false)

	const uploadRef = useRef(null)

	useEffect(()=>{
		if(activeIndex === 0){
			getUsers()
		}
		if(activeIndex === 1){
			getProducts()
		}
	},[activeIndex])

	const getUsers = () => {
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

	const getProducts = () => {
		setFetchGetAllProducts(true)
		productsAPI.getAllProducts()
			.then(response => {
				setProducts(response.data)
				setFetchGetAllProducts(false)
			})
			.catch(error => {
				setFetchGetAllProducts(false)
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
		return formatCurrency(rowData.balance);
	}

	const headerTemplate = (options) => {
		const { className, chooseButton, uploadButton, cancelButton } = options;

		return (
			<div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
				{chooseButton}
				{cancelButton}
			</div>
		);
	}

	const createProduct = () => {
		setFetchCreateProduct(true)
		let formData = new FormData();
		formData.append('file',  uploadRef.current?.files[0]);
		formData.append('name', nameProduct)
		formData.append('price', priceProduct)
		formData.append('refProduct', selectRefProduct?.id)
		adminAPI.createProduct(formData)
			.then(response => {
				setNameProduct('')
				setPriceProduct('')
				setSelectRefProduct(null)
				uploadRef.current.clear()
				props.toast.current.show({severity: 'success', summary: 'Создание продукта', detail: 'Продукт успешно создан!'})
				setFetchCreateProduct(false)
				getProducts()
			})
			.catch(error => {
				props.toast.current.show({severity: 'error', summary: 'Создание продукта', detail: 'Произошла ошибка, попробуйте снова!'})
				setFetchCreateProduct(false)
			})
	}

	const selectedCountryTemplate = (option, props) => {
		if (option) {
			return (
				<div className="country-item country-item-value">
					<div>{option.name} {option.surname}</div>
					<div>{option.email}</div>
				</div>
			);
		}

		return (
			<span>
            {props.placeholder}
        </span>
		);
	}

	const countryOptionTemplate = (option) => {
		return (
			<div className="country-item">
				<div>{option.name} {option.surname}</div>
				<div>{option.email}</div>
			</div>
		);
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
								<Column field="level" header="Квалификация"/>
							</DataTable>
						</div>
					</TabPanel>
					<TabPanel header="Продукты">
						<div>
							{fetchGetAllProducts ?
								<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>:
								<>
									{products.length === 0 ?
										<div>Нет продуктов</div>:
										<div className={classes.products}>
											{products.map(product => {
												return(
													<Product data={product}/>
												)
											})}
										</div>
									}
								</>
							}
							<Card title={"Добавить продукт:"}>
								<span className={clsx("p-float-label", classes.inputInner)}>
									<InputText
										className={classes.input}
										id="nameProduct" value={nameProduct}
										onChange={(e) => setNameProduct(e.target.value)}
									/>
									<label htmlFor="nameProduct" className={classes.label}>Название продукта</label>
								</span>
								<span className={clsx("p-float-label", classes.inputInner)}>
									<InputText
										className={classes.input}
										id="priceProduct" value={priceProduct}
										onChange={(e) => setPriceProduct(e.target.value)}
									/>
									<label htmlFor="priceProduct" className={classes.label}>Цена</label>
								</span>
								<Dropdown
									optionLabel="name"
									value={selectRefProduct}
									options={products}
									onChange={(e) => setSelectRefProduct(e.value)}
									placeholder="Выбрать встроенный пакет"
									showClear
									className={classes.dropDown}
								/>
								<FileUpload
									ref={uploadRef}
									name="demo"
									accept="image/*"
									chooseLabel={"Выбрать"}
									headerTemplate={headerTemplate}
									cancelLabel={"Отменить"}
								/>
								<Button
									className={classes.btn}
									label={fetchCreateProduct ? <i className={`pi pi-spin pi-spinner`}/>:<span>Создать продукт</span>}
									onClick={createProduct}
								/>
							</Card>
						</div>
					</TabPanel>
					<TabPanel header="Добавить баланс">
						<div>
							<Dropdown value={userSelect} options={users} onChange={(e) => setUserSelect(e.value)} optionLabel="name"
									  placeholder="Выберите пользователя" itemTemplate={countryOptionTemplate} valueTemplate={selectedCountryTemplate} showClear={true} filter filterBy="email"/>
							<InputNumber
								style={{marginLeft: 16}}
								value={addBalance}
								onChange={(e)=>{setAddBalance(e.value)}}
								placeholder={"Введите сумму"}
							/>
							<Button
								style={{marginLeft: 16, height: 52, width: 150}}
								onClick={()=>{
									setFetchAddBalance(true)
									adminAPI.addBalanceUser(userSelect.id, addBalance)
										.then(response => {
											setFetchAddBalance(false)
											setUserSelect(null)
											setAddBalance(null)
											props.toast.current.show({severity: 'success', summary: 'Добавление баланса', detail: 'Баланс успешно добавлен!'})
										})
										.catch(error => {
											setFetchAddBalance(false)
											props.toast.current.show({severity: 'error', summary: 'Добавление баланса', detail: 'Произошла ошибка, попробуйте снова!'})
										})
								}}
								label={fetchAddBalance ? <i className={`pi pi-spin pi-spinner`}/> : <span>Добавить</span>}
							/>
						</div>

					</TabPanel>
					<TabPanel header="Добавить подарок">
						<div>
							<InputNumber
								style={{marginLeft: 16}}
								value={surprisePrice}
								onChange={(e)=>{setSurprisePrice(e.value)}}
								placeholder={"Введите сумму"}
							/>
							<InputText
								style={{marginLeft: 16}}
								value={surpriseDesc}
								onChange={(e)=>{setSurpriseDesc(e.target.value)}}
								placeholder={"Введите описание"}
							/>
							<InputNumber
								style={{marginLeft: 16}}
								value={surpriseCvalNum}
								onChange={(e)=>{setSurpriseCvalNum(e.value)}}
								placeholder={"Введите квалификацию"}
							/>
							<Button
								style={{marginLeft: 16, height: 52, width: 150}}
								onClick={()=>{
									setFetchAddSurprise(true)
									adminAPI.addSurprise(surpriseDesc, surprisePrice, surpriseCvalNum)
										.then(response => {
											setFetchAddSurprise(false)
											setSurpriseCvalNum(null)
											setSurprisePrice(null)
											setSurpriseDesc(null)
											props.toast.current.show({severity: 'success', summary: 'Добавление подарка', detail: 'Подарок успешно добавлен!'})
										})
										.catch(error => {
											setFetchAddSurprise(false)
											props.toast.current.show({severity: 'error', summary: 'Добавление подарка', detail: 'Произошла ошибка, попробуйте снова!'})
										})
								}}
								label={fetchAddSurprise ? <i className={`pi pi-spin pi-spinner`}/> : <span>Добавить</span>}
							/>
						</div>
					</TabPanel>
				</TabView>
			</div>
		</>
	);
};

export default AdminPanel;
