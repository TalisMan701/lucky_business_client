import React from 'react';
import classes from './NewHeader.module.css'
import {Link} from "react-router-dom";
import clsx from "clsx";
import {HashLink} from "react-router-hash-link";
import {connect} from "react-redux";
import {logout} from "../../Store/auth-reducer";

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
							<Link to={'/signup'} onClick={()=>{props.logout()}} className={classes.btnSignUp}>
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

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {logout})(NewHeader);
