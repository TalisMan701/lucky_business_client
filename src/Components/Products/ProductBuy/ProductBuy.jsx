import React from 'react';
import classes from './ProductBuy.module.css'
import {Card} from "primereact/card";
import {Button} from "primereact/button";
const ProductBuy = (props) => {
	const buyProduct = () => {

	}
	return (
		<Card className={classes.card}>
			{props.data.pathIcon.split('.').pop() === "svg" ?
				<object type="image/svg+xml" data={props.data.pathIcon} className={classes.img}/>:
				<img src={props.data.pathIcon} alt="img" className={classes.img}/>
			}
			<Button
				className={classes.btn}
				label={"Купить"}
				onClick={buyProduct}
			/>
		</Card>
	);
};

export default ProductBuy;
