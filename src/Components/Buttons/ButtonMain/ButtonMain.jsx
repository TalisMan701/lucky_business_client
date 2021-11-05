import React from 'react';
import classes from './ButtonMain.module.css'
import clsx from "clsx";

const ButtonMain = (props) => {
	if(props.type === "black"){
		return (
			<div
				className={clsx(classes.inner ,classes.innerBlack)}
				onClick={props.onClick}
				style={{
					...props.style,
					borderStyle: "solid",
					width: props.width - props.borderWidth * 2,
					height: props.height - props.borderWidth * 2,
					borderWidth: props.borderWidth,
					borderRadius: props.borderRadius
				}}
			>
				<div
					className={clsx(classes.text, classes.textBlack)}
					style={{
						fontSize: props.fontSize,
					}}
				>
					{props.label}
				</div>
			</div>
		)
	}
	if(props.type === "white"){
		return (
			<div
				className={clsx(classes.inner ,classes.innerWhite)}
				onClick={props.onClick}
				style={{
					...props.style,
					borderStyle: "solid",
					width: props.width - props.borderWidth * 2,
					height: props.height - props.borderWidth * 2,
					borderWidth: props.borderWidth,
					borderRadius: props.borderRadius
				}}
			>
				<div
					className={clsx(classes.text, classes.textWhite)}
					style={{
						fontSize: props.fontSize,
					}}
				>
					{props.label}
				</div>
			</div>
		)
	}
	if(props.type === "gray"){
		return (
			<div
				className={clsx(classes.inner ,classes.innerGray)}
				onClick={props.onClick}
				style={{
					...props.style,
					borderStyle: "solid",
					width: props.width - props.borderWidth * 2,
					height: props.height - props.borderWidth * 2,
					borderWidth: props.borderWidth,
					borderRadius: props.borderRadius
				}}
			>
				<div
					className={clsx(classes.text, classes.textGray)}
					style={{
						fontSize: props.fontSize,
					}}
				>
					{props.label}
				</div>
			</div>
		)
	}
	if(props.type === "red"){
		return (
			<div
				className={clsx(classes.inner ,classes.innerRed)}
				onClick={props.onClick}
				style={{
					...props.style,
					borderStyle: "solid",
					width: props.width - props.borderWidth * 2,
					height: props.height - props.borderWidth * 2,
					borderWidth: props.borderWidth,
					borderRadius: props.borderRadius
				}}
			>
				<div
					className={clsx(classes.text, classes.textRed)}
					style={{
						fontSize: props.fontSize,
					}}
				>
					{props.label}
				</div>
			</div>
		)
	}
	return (
		<div
			className={classes.inner}
			onClick={props.onClick}
			style={{
				...props.style,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				cursor: "pointer",
				borderStyle: "solid",
				width: props.width - props.borderWidth * 2,
				height: props.height - props.borderWidth * 2,
				borderColor: props.borderColor,
				borderWidth: props.borderWidth,
				backgroundColor: props.backgroundColor,
				borderRadius: props.borderRadius
			}}
		>
			<div
				className={classes.text}
				style={{
					fontSize: props.fontSize,
					color: props.fontColor
				}}
			>
				{props.label}
			</div>
		</div>
	);
};

export default ButtonMain;
