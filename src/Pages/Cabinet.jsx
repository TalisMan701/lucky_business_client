import React from 'react';
import classes from "../StylesForPages/Cabinet.module.css";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {logout} from "../Store/auth-reducer";
import Sidebar from "../Components/Sidebar/Sidebar";
import Particles from "react-particles-js";
import Main from "../Components/CabinetPages/Main/Main";
import Products from "../Components/CabinetPages/Products/Products";
import MyProducts from "../Components/CabinetPages/MyProducts/MyProducts";
import PartnerProgram from "../Components/CabinetPages/PartnerProgram/PartnerProgram";
import Leaders from "../Components/CabinetPages/Leaders/Leaders";
import Wallet from "../Components/CabinetPages/Wallet/Wallet";
import Notification from "../Components/CabinetPages/Notification/Notification";
import Materials from "../Components/CabinetPages/Materials/Materials";
import Settings from "../Components/CabinetPages/Settings/Settings";
import Chat from "../Components/CabinetPages/Chat/Chat";
import AdminPanel from "./AdminPanel/AdminPanel";

const Cabinet = (props) => {

	if(!props.isAuth){
		return <Redirect to={"/"}/>
	}
	return (
		<div>
			<Sidebar/>
			<div className={classes.content}>
				<Particles
					params={{
						particles: {
							line_linked: {
								/*shadow: {
									enable: true,
									color: "#9FA8DA",
									blur: 5
								},*/
								color: {
									value: "rgba(150,150,150,0.46)"
								}
							},
							"move": {
								"enable": true,
								"speed": 1.5,
								"direction": "none",
								"random": false,
								"straight": false,
								"out_mode": "out",
								"bounce": false,
								"attract": {
									"enable": false,
									"rotateX": 600,
									"rotateY": 1200
								}
							},
							collisions: {
								mode: "bounce"
							},
							polygon: {
								enable: true,
								type: 'outside',
								move: {
									radius: 10
								}
							},
							number: {
								value: 100,
							},
							color: {
								value: "rgba(255,255,255,0.56)"
							},
							"size": {
								"value": 8,
								"random": true,
							},
						},
						"interactivity": {
							"detect_on": "window",
							"events": {
								"onhover": {
									"enable": true,
									"mode": "bubble"
								},
								"resize": true
							},
							"modes": {
								"grab": {
									"distance": 150,
									"line_linked": {
										shadow: {
											enable: true,
											color: "#3CA9D1",
											blur: 5
										},
										color: "#ea3030",
									}
								},
								"bubble": {
									"distance": 200,
									"size": 6,
									"duration": 2,
									"opacity": 8,
									"speed": 3,
									color: "#9FA8DA",
								}
							}
						}
					}}
					className={classes.particles}
				/>
				<div className={classes.main}>
					<Switch>
						<Route exact path='/cabinet' render={()=><Main/>}/>
						<Route path='/cabinet/products' render={()=><Products toast={props.toast}/>}/>
						<Route path='/cabinet/my_products' render={()=><MyProducts/>}/>
						<Route path='/cabinet/partner_program' render={()=><PartnerProgram/>}/>
						<Route path='/cabinet/leaders' render={()=><Leaders/>}/>
						<Route path='/cabinet/wallet' render={()=><Wallet/>}/>
						<Route path='/cabinet/notification' render={()=><Notification/>}/>
						<Route path='/cabinet/materials' render={()=><Materials/>}/>
						<Route path='/cabinet/settings' render={()=><Settings/>}/>
						<Route path='/cabinet/chat' render={()=><Chat/>}/>
						{props.user.role === "admin" &&
							<Route path='/cabinet/admin' render={()=><AdminPanel toast={props.toast}/>}/>
						}
						<Redirect to={'/cabinet'}/>
					</Switch>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state =>({
	fetchLogin: state.auth.fetchLogin,
	user: state.auth.user,
	isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {})(Cabinet);
