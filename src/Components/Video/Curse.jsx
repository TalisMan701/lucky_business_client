import React, {useRef, useState} from 'react';
import MainTitle from "../CabinetComponents/MainTitle/MainTitle";
import {Card} from "primereact/card";
import classes from './Curse.module.css'
import Video from "./Video";

const Curse = (props) => {
	const refPlayer = useRef(null)
	const [indexState, setIndexState] = useState(0)
	return (
		<>
			<MainTitle>{props.data.title}</MainTitle>
			<Card className={classes.card}>
				<Video refPlayer={refPlayer} url={props.data.video[indexState]}/>
				<div className={classes.panel}>
					<div
						className={classes.arrow}
						onClick={()=>{
							refPlayer.current.load()
							setIndexState(prev => prev - 1)
						}}
					>Назад</div>
					<div>{indexState + 1} из {props.data.video.length}</div>
					<div
						className={classes.arrow}
						onClick={()=>{
							refPlayer.current.load()
							setIndexState(prev => prev + 1)
						}}
					>Дальше</div>
				</div>
			</Card>
		</>
	);
};

export default Curse;
