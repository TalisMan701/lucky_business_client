import React from 'react';
import classes from './Header.module.css'
import clsx from "clsx";
import LogoSvg from "../../Images/SVG/Logo.svg";
import {Link} from "react-router-dom";
import ButtonMain from "../Buttons/ButtonMain/ButtonMain";
const Header = () => {
	return (
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
					<Link to={'/auth'}>
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
					</Link>
					<Link to={'/signup'}>
						<ButtonMain
							onClick={()=>{}}
							label={"Зарегистрироваться"}
							type={"white"}
							borderWidth={2}
							borderRadius={8}
							width={268}
							height={60}
						/>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;