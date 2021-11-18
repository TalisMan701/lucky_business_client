import React from 'react';
import classes from './NewHeader.module.css'
import {Link} from "react-router-dom";
import clsx from "clsx";

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
					<Link to={'/'} className={classes.navLink}>Тарифы</Link>
				</div>
				}
				{!props.isMobile ?
					<div className={classes.lkInner}>
						{!props.isAuth ?
							<>
								<Link to={'/auth'} className={classes.btnAuth}>
									Войти
								</Link>
								<Link to={'/signup'} className={classes.btnSignUp}>
									Заказать консультацию
								</Link>
							</>:
							<Link to={'/cabinet'}>
								Личный кабинет
							</Link>
						}
					</div>:
					<div className={classes.lkInnerMobile}>
						{!props.isAuth ?
							<>
								<Link to={'/auth'}>Войти</Link>
							</>:
							<>
								<Link to={"cabinet"}>Личный кабинет</Link>
							</>
						}
					</div>
				}
			</div>
		</header>
	);
};

export default NewHeader;
