import React from 'react';
import classes from "../StylesForPages/Landing.module.css"
import LogoSvg from "../Images/SVG/Logo.svg"
import EmtyImg from "../Images/Other/emtyGray.jpg"
import CalendarSvg from "../Images/SVG/Calendar.svg"
import EyeSvg from "../Images/SVG/Eye.svg"
import EyeWhiteSvg from "../Images/SVG/eyeWhite.svg"
import HumenSvg from "../Images/SVG/Humen.svg"
import CalendarWhiteSvg from "../Images/SVG/CalendarWhite.svg"
import EmtyZImg from "../Images/Other/emtyZ.png"
import clsx from "clsx";
import {Link} from "react-router-dom";
import ButtonMain from "../Components/Buttons/ButtonMain/ButtonMain";

const Landing = () => {
	return (
		<>
			<header className={classes.header}>
				<div className={clsx(classes.container, classes.headerInner)}>
					<div className={classes.logoInner}>
						<img src={LogoSvg} alt="logo" className={classes.logoImg}/>
						<span className={classes.logoTitle}>Lucky Business</span>
					</div>
					<div className={classes.nav}>
						<Link to={'/'} className={classes.navLink}>Главная</Link>
						<Link to={'/'} className={classes.navLink}>Тарифы</Link>
					</div>
					<div className={classes.lkInner}>
						<ButtonMain
							onClick={()=>{}}
							label={"Войти"}
							type={"black"}
							borderWidth={2}
							borderRadius={8}
							width={183}
							height={60}
							style={{marginRight: 20}}
						/>
						<ButtonMain
							onClick={()=>{}}
							label={"Зарегистрироваться"}
							type={"white"}
							borderWidth={2}
							borderRadius={8}
							width={268}
							height={60}
						/>
					</div>
				</div>
			</header>
			<main>
				<section className={classes.intro}>
					<div className={clsx(classes.container, classes.introInner)}>
						<div className={classes.introCol1}>
							<div className={classes.introTitle}>
								Заработок в режиме автопилота
							</div>
							<div className={classes.introDesc}>
								Первая обучающая платформа, на которой мы делимся, а ты приумножаешь
							</div>
							<ButtonMain
								onClick={()=>{}}
								label={"Начать"}
								type={"red"}
								fontSize={32}
								borderWidth={2}
								borderRadius={8}
								width={268}
								height={60}
							/>
						</div>
						<div className={classes.introCol2}>
							<img src={EmtyImg} alt="intro" className={classes.introImg}/>
							<div className={clsx(classes.introCard, classes.introCard1)}>
								<img src={CalendarSvg} alt="introCard" className={classes.introCardImg}/>
								<div className={classes.introCardText}>Доход от 50 тыс. рублей в первый месяц</div>
								<ButtonMain
									style={{minWidth: 66}}
									onClick={()=>{}}
									label={"Try"}
									type={"gray"}
									fontSize={14}
									borderWidth={2}
									borderRadius={8}
									width={66}
									height={46}
								/>
							</div>
							<div className={clsx(classes.introCard, classes.introCard2)}>
								<img src={EyeSvg} alt="introCard" className={classes.introCardImg}/>
								<div className={classes.introCardText}>Стартовый капитал - 990 рублей</div>
								<ButtonMain
									style={{minWidth: 66}}
									onClick={()=>{}}
									label={"Try"}
									type={"gray"}
									fontSize={14}
									borderWidth={2}
									borderRadius={8}
									width={66}
									height={46}
								/>
							</div>
						</div>
					</div>
				</section>
				<section className={classes.second}>
					<div className={clsx(classes.container, classes.secondInner)}>
						<div className={classes.secondRow}>
							<div className={classes.secondRowTitle}>Ты хочешь открыть своё дело, но:</div>
							<div className={classes.secondRowCard}>
								<img src={EyeWhiteSvg} alt="EyeWhiteSvg" className={classes.secondRowCardImg}/>
								<div className={classes.secondRowCardText}>У тебя мало финансов для старта</div>
							</div>
							<div className={classes.secondRowCard}>
								<img src={HumenSvg} alt="HumenSvg" className={classes.secondRowCardImg}/>
								<div className={classes.secondRowCardText}>Ты не понимаешь, как заработать первые деньги</div>
							</div>
							<div className={classes.secondRowCard}>
								<img src={CalendarWhiteSvg} alt="CalendarWhiteSvg" className={classes.secondRowCardImg}/>
								<div className={classes.secondRowCardText}>При поисковых запросах в интернете, слишком много противоречащей друг другу информации</div>
							</div>
						</div>
						<div className={classes.secondTitle}>Наш проект - это именно то, что ты давно искал!</div>
						<div className={classes.secondDesc}>скорее проходи регистрацию и присоединяйся к нам</div>
					</div>
				</section>
				<section className={classes.target}>
					<div className={clsx(classes.container, classes.targetInner)}>
						<img src={EmtyZImg} alt="target" className={classes.targetImg}/>
						<div className={classes.targetContent}>
							<div className={classes.targetTitle}>Тебе точно это нужно, если ты:</div>
							<div className={classes.targetCards}>
								<div style={{width: 272, paddingLeft: 24}} className={classes.targetCard}>Интернет-предприниматель</div>
								<div style={{width: 168}} className={classes.targetCard}>Студент</div>
								<div style={{width: 168}} className={classes.targetCard}>Стартапер</div>
								<div style={{width: 272, paddingLeft: 69}} className={classes.targetCard}>Будущий франчайзи</div>
								<div style={{width: 286, paddingLeft: 24}} className={classes.targetCard}>MLM предприниматель</div>
								<div style={{width: 426, paddingLeft: 55}} className={classes.targetCard}>Готов узнавать новое и зарабатывать уже сейчас</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Landing;
