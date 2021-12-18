import React, {useEffect, useState} from 'react';
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
import classes from './MyProducts.module.css'
import {myProductsAPI} from "../../../Api/api";
import ProductBuy from "../../Products/ProductBuy/ProductBuy";
import Product from "../../Products/Product/Product";
import Video from "../../Video/Video";
import {Card} from "primereact/card";
import Curse from "../../Video/Curse";

const urlsForProduct = {
	"WHITE": [
		{
			title: "МЛМ",
			video: [
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/1.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/2.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/3.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/4.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/5.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/6.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/7.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/8.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/9.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/10.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/11.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/12.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/13.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/14.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/15.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/16.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/mlm/17.mp4"
			]
		}
	],
	"YELLOW": [
		{
			title: "Финансовая грамотность",
			video: [
				"https://lucky-business.s3.us-east-2.amazonaws.com/finance/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+1.+%D0%A3%D1%80%D0%BE%D0%BA+1.+%D0%90%D0%BA%D1%82%D0%B8%D0%B2%D1%8B+%D0%B8+%D0%BF%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D1%8B+.mov",
				"https://lucky-business.s3.us-east-2.amazonaws.com/finance/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+1.+%D0%A3%D1%80%D0%BE%D0%BA+2+%D0%A2%D0%BE%D1%87%D0%BA%D0%B0+%D0%BE%D1%82%D1%81%D1%87%D0%B5%D1%82%D0%B0.MOV",
				"https://lucky-business.s3.us-east-2.amazonaws.com/finance/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+2.+%D0%A3%D1%80%D0%BE%D0%BA+1.+%D0%9F%D0%BE%D0%B4%D1%83%D1%88%D0%BA%D0%B0+%D0%B1%D0%B5%D0%B7%D0%BE%D0%BF%D0%B0%D1%81%D0%BD%D0%BE%D1%81%D1%82%D0%B8.MOV",
				"https://lucky-business.s3.us-east-2.amazonaws.com/finance/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+2.+%D0%A3%D1%80%D0%BE%D0%BA+2.+%D0%A2%D0%B5%D0%BC%D0%B0+%D0%9A%D0%B0%D0%BF%D0%B8%D1%82%D0%B0%D0%BB.MOV",
				"https://lucky-business.s3.us-east-2.amazonaws.com/finance/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+2.+%D0%A3%D1%80%D0%BE%D0%BA+3.+%D0%A1%D0%BB%D0%BE%D0%B6%D0%BD%D1%8B%D0%B9+%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D0%BD%D1%82.mov",
				"https://lucky-business.s3.us-east-2.amazonaws.com/finance/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+3.+%D0%A3%D1%80%D0%BE%D0%BA+1.+%D0%9F%D1%81%D0%B8%D1%85%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F+%D0%BA%D1%80%D0%B5%D0%B4%D0%B8%D1%82%D0%BE%D0%B2.mov",
				"https://lucky-business.s3.us-east-2.amazonaws.com/finance/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+3.+%D0%A3%D1%80%D0%BE%D0%BA+2.+%D0%9A%D1%80%D0%B5%D0%B4%D0%B8%D1%82%D1%8B+%D0%B2+%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D0%BA%D0%B5.MOV",
				"https://lucky-business.s3.us-east-2.amazonaws.com/finance/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+4.+%D0%A3%D1%80%D0%BE%D0%BA+1.+%D0%98%D0%BD%D1%84%D0%BB%D1%8F%D1%86%D0%B8%D1%8F+%D0%B8+%D0%9A%D0%A1+%D0%A6%D0%91.mov.mov",
				"https://lucky-business.s3.us-east-2.amazonaws.com/finance/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+4.+%D0%A3%D1%80%D0%BE%D0%BA+2.+%D0%98%D0%BD%D1%84%D0%BB%D1%8F%D1%86%D0%B8%D1%8F+%D0%B2+%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D0%BA%D0%B5.MOV",
			]
		}
	],
	"GREEN": [
		{
			title: "Эмоциональный интеллект",
			video: [
				"https://lucky-business.s3.us-east-2.amazonaws.com/Curse1/%D0%9A%D0%A3%D0%A0%D0%A11+%D1%871.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/Curse1/%D0%9A%D0%A3%D0%A0%D0%A11+%D1%872.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/Curse1/%D0%9A%D0%A3%D0%A0%D0%A11+%D1%873.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/Curse1/%D0%9A%D0%A3%D0%A0%D0%A11+%D1%874.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/Curse1/%D0%9A%D0%A3%D0%A0%D0%A11+%D1%875.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/Curse1/%D0%9A%D0%A3%D0%A0%D0%A11+%D1%876.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/Curse1/%D0%9A%D0%A3%D0%A0%D0%A11+%D1%877.mp4",
			]
		}
	],
	"DARK-BLUE": [
		{
			title: "Инстаграм",
			video: [
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/1.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/2.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/3.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/4.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/5.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/6.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/7.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/8.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/9.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/10.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/11.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/12.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/13.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/14.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/inst/15.mp4",
			]
		},
		{
			title: "ТикТок",
			video: [
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/1-1.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/1-2.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/1-3.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/1-4.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/2-1.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/2-2.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/2-3.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/3-1.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/3-2.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/4-1.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/4-2.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/4-3.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/4-4.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/6-1.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/tiktok/6-2.mp4",
			]
		}
	],
	"PURPLE": [
		{
			title: "Продажи",
			video: [
				"https://lucky-business.s3.us-east-2.amazonaws.com/Prodaji/%D0%9A%D0%B0%D0%BA+%D1%8D%D1%84%D1%84%D0%B5%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D0%BE+%D0%BF%D1%80%D0%BE%D0%B9%D1%82%D0%B8+%D0%BE%D0%B1%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5_.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/Prodaji/%D0%91%D0%B0%D0%B7%D0%BE%D0%B2%D1%8B%D0%B5+%D0%BE%D1%88%D0%B8%D0%B1%D0%BA%D0%B8+%D0%BD%D0%B0%D1%87%D0%B8%D0%BD%D0%B0%D1%8E%D1%89%D0%B5%D0%B3%D0%BE+%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B2%D1%86%D0%B0.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/Prodaji/%D0%9A%D0%93%D0%A6+%2B+%D0%9F%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF+%D0%BF%D0%BE%D0%B4%D0%BA%D1%80%D0%B5%D0%BF%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F_.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/Prodaji/%D0%A1%D0%B8%D0%BD%D0%B4%D1%80%D0%BE%D0%BC+%D1%81%D0%B0%D0%BC%D0%BE%D0%B7%D0%B2%D0%B0%D0%BD%D1%86%D0%B0_.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/Prodaji/%D0%A2%D0%B5%D1%85%D0%BD%D0%B8%D0%BA%D0%B0+%D0%A1%D0%9F%D0%98%D0%9D+%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B6%D0%B8.mp4",
			]
		}
	],
	"RED": [
		{
			title: "Криптовалюта",
			video: [
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/1%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+1%D0%B9+%D0%A3%D1%80+(%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82%D1%81%D1%82%D0%B2%D0%B8%D0%B5+%2B+1%D0%B9+%D1%83%D1%80%D0%BE%D0%BA).mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/1%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+2%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/1%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+3%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/1%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+4%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/1%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+5%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/1%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+6%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/1%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+7%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/2%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+1%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/2%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+1%D0%B9.1+%D0%A2%D0%95%D0%A0%D0%9C%D0%98%D0%9D%D0%AB.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/3%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+1%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA+(%D0%A4%D0%90).mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/3%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+2.1.+%D0%A3%D1%80%D0%BE%D0%BA+(%D0%A2%D0%B5%D0%BE%D1%80%D0%B8%D1%8F+%D0%A2%D0%90)-007.mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/3%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+2.2.+%D0%A3%D1%80%D0%BE%D0%BA+(%D0%A2%D0%90).mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/3%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+3%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA+(ICO).mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/3%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+4%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA+(NFT).mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/3%D0%B9+%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C+5%D0%B9+%D0%A3%D1%80%D0%BE%D0%BA+(STAKING).mp4",
				"https://lucky-business.s3.us-east-2.amazonaws.com/crypto/Wrap(%D0%98%D0%A2%D0%9E%D0%93%D0%98).mp4",
			]
		}
	],
}

const MyProducts = (props) => {
	const [myProducts, setMyProducts] = useState([])
	const [fetchGetAllProducts, setFetchGetAllProducts] = useState(true)
	const [fetchMyProducts, setFetchMyProducts] = useState(true)
	const [showProductContent, setShowProductContent] = useState({bool: false, content: {}})

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

	if(showProductContent.bool){
		return (
			<>
				<Card className={classes.card}>
					<div className={classes.titleInner}>
						<div className={classes.title}>{showProductContent.content.name}</div>
						<div
							style={{cursor: "pointer"}}
							onClick={()=>{setShowProductContent({bool: false, content: {}})}}
						>Назад</div>
					</div>
				</Card>
				{showProductContent.content.main.map(block => {
					return(
						<Curse data={block}/>
					)
				})}
			</>
		)
	}

	return (
		<>
			<MainTitle>Мои продукты</MainTitle>
			{fetchMyProducts ?
				<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>:
				<>
					{myProducts.length === 0 ?
						<div className={classes.noProducts}>Нет продуктов</div>:
						<div className={classes.products}>
							{myProducts.map(product => {
								return(
									<Product
										urlsForProduct={urlsForProduct[`${product.product.name}`]}
										data={product.product}
										setShowProductContent={setShowProductContent}
									/>
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
