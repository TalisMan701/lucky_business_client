import React from 'react';
import classes from './Sidebar.module.css'
import LogoSvg from "../../Images/SVG/Logo.svg";
import {Link, NavLink} from "react-router-dom";
import {Badge} from "primereact/badge";
import {connect} from "react-redux";
import {logout, refreshUserData} from "../../Store/auth-reducer";

const SidebarMy = (props) => {
	return (
		<div className={classes.sidebar}>
			{props.isMobile &&
				<div
					className={classes.burgerInner}
					onClick={()=>{props.setVisible(false)}}
				>
					<i className={`pi pi-times ${classes.burger}`}/>
				</div>
			}
			<Link to={"/"} className={classes.logoInner}>
				<img src={LogoSvg} alt="logo" className={classes.logoImg}/>
				<span className={classes.logoTitle}>Lucky Business</span>
			</Link>
			<div className={classes.content}>
				<NavLink
					exact
					onClick={()=>{
						props.refreshUserData()
						props.setVisible(false)
					}}
					activeClassName={classes.activeNav}
					to={'/cabinet'}
					className={classes.navItem}
				>
					<i className="pi pi-home"/>
					<span>Мой кабинет</span>
				</NavLink>
				<NavLink
					onClick={()=>{props.setVisible(false)}}
					activeClassName={classes.activeNav}
					to={"/cabinet/products"}
					className={classes.navItem}
				>
					<i className="pi pi-shopping-bag"/>
					<span>Продукты компании</span>
				</NavLink>
				<NavLink
					onClick={()=>{props.setVisible(false)}}
					activeClassName={classes.activeNav}
					to={'/cabinet/my_products'}
					className={classes.navItem}
				>
					<i className="pi pi-shopping-cart"/>
					<span>Мои покупки</span>
				</NavLink>
				<NavLink
					onClick={()=>{props.setVisible(false)}}
					activeClassName={classes.activeNav}
					to={'/cabinet/partner_program'}
					className={classes.navItem}
				>
					<i className="pi pi-sitemap"/>
					<span>Партнерская программа</span>
				</NavLink>
				<NavLink
					onClick={()=>{props.setVisible(false)}}
					activeClassName={classes.activeNav}
					to={'/cabinet/leaders'}
					className={classes.navItem}
				>
					<i className="pi pi-users"/>
					<span>Арена лидеров</span>
				</NavLink>
				<NavLink
					onClick={()=>{props.setVisible(false)}}
					activeClassName={classes.activeNav}
					to={'/cabinet/wallet'}
					className={classes.navItem}
				>
					<i className="pi pi-wallet"/>
					<span>Кошелёк</span>
				</NavLink>
				<NavLink
					onClick={()=>{props.setVisible(false)}}
					activeClassName={classes.activeNav}
					to={'/cabinet/notification'}
					className={classes.navItem}
				>
					<i className="pi pi-bell"/>
					<span>Уведомления</span>
					{props.user?.countNotif > 0 &&
						<div>
							<Badge value={props.user.countNotif} severity="danger"/>
						</div>
					}

				</NavLink>
				<NavLink
					onClick={()=>{props.setVisible(false)}}
					activeClassName={classes.activeNav}
					to={'/cabinet/materials'}
					className={classes.navItem}
				>
					<i className="pi pi-book"/>
					<span>Полезные материалы</span>
				</NavLink>
				<NavLink
					onClick={()=>{props.setVisible(false)}}
					activeClassName={classes.activeNav}
					to={'/cabinet/settings'}
					className={classes.navItem}
				>
					<i className="pi pi-cog"/>
					<span>Настройки</span>
				</NavLink>
				<a
					href={'https://t.me/Luckybsupport'}
					target={"_blank"}
					className={classes.navItem}
				>
					<i className="pi pi-send"/>
					<span>Чат с поддержкой</span>
				</a>
				{props.user.role === "admin" &&
					<NavLink
						onClick={()=>{props.setVisible(false)}}
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

export default connect(mapStateToProps, {logout, refreshUserData})(SidebarMy);
