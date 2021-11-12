import React, {useEffect, useState} from 'react';
import classes from './Products.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import {productsAPI} from "../../../Api/api";
const Products = () => {
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
	);
};

export default Products;
