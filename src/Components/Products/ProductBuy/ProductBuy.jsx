import React, {useState} from 'react';
import classes from './ProductBuy.module.css'
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {productsAPI} from "../../../Api/api";
import {connect} from "react-redux";
import {refreshUserData, updatePriceUser} from "../../../Store/auth-reducer";
const ProductBuy = (props) => {
	const [fetchBuyProduct, setFetchBuyProduct] = useState(false)
	const buyProduct = () => {
		setFetchBuyProduct(true)
		productsAPI.buy(props.data.id)
			.then(response => {
				//props.updatePriceUser(props.data.price)
				props.toast.current.show({severity: 'success', summary: 'Покупка продукта', detail: `Продукт ${props.data.name} успешно приобретен!`})
				setFetchBuyProduct(false)
			})
			.catch(error => {
				if(error.response.status === 400 || error.response.status === 402){
					props.toast.current.show({severity: 'error', summary: 'Покупка продукта', detail: error.response.data.message})
				}else{
					props.toast.current.show({severity: 'error', summary: 'Покупка продукта', detail: `Продукт ${props.data.name} не был куплен, попробуйте снова!`})
				}
				setFetchBuyProduct(false)
			})
	}
	return (
		<Card className={classes.card}>
			{props.data.pathIcon?.split('.').pop() === "svg" ?
				<object type="image/svg+xml" data={props.data.pathIcon} className={classes.img}/>:
				<img src={props.data?.pathIcon} alt="img" className={classes.img}/>
			}
			<Button
				className={classes.btn}
				label={fetchBuyProduct ? <i className={`pi pi-spin pi-spinner`}/>:<span>Купить</span>}
				onClick={buyProduct}
			/>
		</Card>
	);
};

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {updatePriceUser, refreshUserData})(ProductBuy);
