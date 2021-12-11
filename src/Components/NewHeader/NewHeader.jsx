import React from 'react';
import classes from './NewHeader.module.css'
import {Link} from "react-router-dom";
import clsx from "clsx";
import {HashLink} from "react-router-hash-link";

const NewHeader = (props) => {
	return (
		<header className={classes.header}>
			<div className={clsx(classes.container, classes.headerInner)}>
				<div className={classes.logoInner}>
					<span className={classes.logoTitle}>Lucky Business</span>
				</div>
				{!props.isMobile &&
				<div className={classes.nav}>
					<Link to={'/'} className={classes.navLink}>Главная</Link>
					<HashLink smooth to={'/#tarifs'} className={classes.navLink}>Тарифы</HashLink>
				</div>
				}
				<div className={classes.lkInner}>
					{!props.isAuth ?
						<>
							<Link to={'/auth'} className={classes.btnAuth}>
								Войти
							</Link>
							<Link to={'/signup'} className={classes.btnSignUp}>
								Зарегистрироваться
							</Link>
						</>:
						<Link to={'/cabinet'} className={classes.btnAuth}>
							Личный кабинет
						</Link>
					}
				</div>
			</div>
		</header>
	);
};

export default NewHeader;
