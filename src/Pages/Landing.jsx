import React from 'react';
import classes from "../StylesForPages/Landing.module.css"
import LogoSvg from "../Images/SVG/Logo.svg"
import EmtyImg from "../Images/Other/emtyGray.jpg"
import CalendarSvg from "../Images/SVG/Calendar.svg"
import EyeSvg from "../Images/SVG/Eye.svg"
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
			</main>
		</>
	);
};

export default Landing;
