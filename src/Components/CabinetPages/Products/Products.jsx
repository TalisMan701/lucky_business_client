import React, {useEffect, useState} from 'react';
import classes from './Products.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {productsAPI} from "../../../Api/api";
import Product from "../../Products/Product/Product";
import ProductBuy from "../../Products/ProductBuy/ProductBuy";
const Products = (props) => {
	const [products, setProducts] = useState([])
	const [fetchGetAllProducts, setFetchGetAllProducts] = useState(true)
	useEffect(()=>{
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
	},[])

	return (
		<>
			<MainTitle>Продукты компании</MainTitle>
			{fetchGetAllProducts ?
				<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>:
				<>
					{products.length === 0 ?
						<div>Нет продуктов</div>:
						<div className={classes.products}>
							{products.map(product => {
								return(
									<ProductBuy data={product} toast={props.toast}/>
								)
							})}
						</div>
					}
				</>
			}
		</>
	);
};

export default Products;
