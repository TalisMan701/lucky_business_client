import React, {useEffect, useState} from 'react';
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import classes from './MyProducts.module.css'
import {myProductsAPI} from "../../../Api/api";
import ProductBuy from "../../Products/ProductBuy/ProductBuy";
import Product from "../../Products/Product/Product";
const MyProducts = (props) => {
	const [myProducts, setMyProducts] = useState([])
	const [fetchGetAllProducts, setFetchGetAllProducts] = useState(true)
	const [fetchMyProducts, setFetchMyProducts] = useState(true)

	useEffect(()=>{
		getMyProducts()
	},[])

	const getMyProducts = () => {
		setFetchMyProducts(true)
		myProductsAPI.getMyProducts()
			.then(response => {
				setMyProducts(response.data)
				setFetchMyProducts(false)
			})
			.catch(error => {
				setFetchMyProducts(false)
			})
	}

	return (
		<>
			<MainTitle>Мои продукты</MainTitle>
			{fetchMyProducts ?
				<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>:
				<>
					{myProducts.length === 0 ?
						<div>Нет продуктов</div>:
						<div className={classes.products}>
							{myProducts.map(product => {
								return(
									<Product data={product.product}/>
								)
							})}
						</div>
					}
				</>
			}
		</>
	);
};

export default MyProducts;
