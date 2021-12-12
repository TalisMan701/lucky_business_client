import React from 'react';
import classes from './Materials.module.css'
import MainTitle from "../../CabinetComponents/MainTitle/MainTitle";
const Materials = () => {
	return (
		<>
			<MainTitle>Полезные материалы</MainTitle>
			<div className={classes.card}>
				<a className={classes.link} href="https://lucky-business.s3.us-east-2.amazonaws.com/materials/presentation.pdf" target={"_blank"}>Презентация</a>
				<a className={classes.link} href="https://lucky-business.s3.us-east-2.amazonaws.com/materials/oferta.pdf" target={"_blank"}>Договор оферты</a>
			</div>
		</>
	);
};

export default Materials;
