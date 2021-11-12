import React from 'react';
import classes from './Sidebar.module.css'
import LogoSvg from "../../Images/SVG/Logo.svg";
import {Link, NavLink} from "react-router-dom";
import {Badge} from "primereact/badge";
import {connect} from "react-redux";
import {logout} from "../../Store/auth-reducer";

const Sidebar = (props) => {
	return (
		<div className={classes.sidebar}>
			<Link to={"/"} className={classes.logoInner}>
				<img src={LogoSvg} alt="logo" className={classes.logoImg}/>
				<span className={classes.logoTitle}>Lucky Business</span>
			</Link>
			<div className={classes.content}>
				<NavLink
					exact
					activeClassName={classes.activeNav}
					to={'/cabinet'}
					className={classes.navItem}
				>
					<i className="pi pi-home"/>
					<span>Мой кабинет</span>
				</NavLink>
				<NavLink
					activeClassName={classes.activeNav}
					to={"/cabinet/products"}
					className={classes.navItem}
				>
					<i className="pi pi-shopping-bag"/>
					<span>Продукты компании</span>
				</NavLink>
				<NavLink
					activeClassName={classes.activeNav}
					to={'/cabinet/my_products'}
					className={classes.navItem}
				>
					<i className="pi pi-shopping-cart"/>
					<span>Мои покупки</span>
				</NavLink>
				<NavLink
					activeClassName={classes.activeNav}
					to={'/cabinet/partner_program'}
					className={classes.navItem}
				>
					<i className="pi pi-sitemap"/>
					<span>Партнерская программа</span>
				</NavLink>
				<NavLink
					activeClassName={classes.activeNav}
					to={'/cabinet/leaders'}
					className={classes.navItem}
				>
					<i className="pi pi-users"/>
					<span>Арена лидеров</span>
				</NavLink>
				<NavLink
					activeClassName={classes.activeNav}
					to={'/cabinet/wallet'}
					className={classes.navItem}
				>
					<i className="pi pi-wallet"/>
					<span>Колешёк</span>
				</NavLink>
				<NavLink
					activeClassName={classes.activeNav}
					to={'/cabinet/notification'}
					className={classes.navItem}
				>
					<i className="pi pi-bell"/>
					<span>Уведомления</span>
					<div>
						<Badge value="1" severity="danger"/>
					</div>

				</NavLink>
				<NavLink
					activeClassName={classes.activeNav}
					to={'/cabinet/materials'}
					className={classes.navItem}
				>
					<i className="pi pi-book"/>
					<span>Полезные материалы</span>
				</NavLink>
				<NavLink
					activeClassName={classes.activeNav}
					to={'/cabinet/settings'}
					className={classes.navItem}
				>
					<i className="pi pi-cog"/>
					<span>Настройки</span>
				</NavLink>
				<NavLink
					activeClassName={classes.activeNav}
					to={'/cabinet/chat'}
					className={classes.navItem}
				>
					<i className="pi pi-send"/>
					<span>Чат с поддержкой</span>
				</NavLink>
				{props.user.role === "admin" &&
					<NavLink
						activeClassName={classes.activeNav}
						to={'/cabinet/admin'}
						className={classes.navItem}
					>
						<i className="pi pi-lock"/>
						<span>Админ панель</span>
					</NavLink>
				}
				<div
					onClick={()=>{
						props.logout()
					}}
					className={classes.navItem}
				>
					<i className="pi pi-sign-out"/>
					<span>Выйти</span>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state =>({
	user: state.auth.user
})

export default connect(mapStateToProps, {logout})(Sidebar);