import React from 'react';
import classes from './Product.module.css'
import {Card} from "primereact/card";
const Product = (props) => {
	return (
		<Card className={classes.card}>
			{props.data.pathIcon?.split('.').pop() === "svg" ?
				<object type="image/svg+xml" data={props.data.pathIcon} className={classes.img}/>:
				<img src={props.data?.pathIcon} alt="img" className={classes.img}/>
			}
			<div className={classes.overlay}
				onClick={()=>{
					props.setShowProductContent({
						bool: true,
						content: {
							name: props.data.name,
							main: props.urlsForProduct
						}
					})
				}}
			/>
		</Card>
	);
};

export default Product;
