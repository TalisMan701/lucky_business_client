import 'primeicons/primeicons.css';
import 'primereact/resources/themes/md-dark-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import classes from "./App.module.css";
import Landing from "./Pages/Landing";
import {Route, Switch} from "react-router-dom";
import Auth from "./Pages/Auth";
import Registration from "./Pages/Registration";
import {connect} from "react-redux";
import {getAuthUserData} from "./Store/auth-reducer";
import React, {useEffect, useRef, useState} from "react";
import Cabinet from "./Pages/Cabinet";
import RefMiddleware from "./Components/RefMiddleware/RefMiddleware";
import Loading from "./Pages/Loading";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import {Toast} from "primereact/toast";

function App(props) {
	const toast = useRef(null)
	const [isMobile, setIsMobile] = useState(false)
	const [isTablet, setIsTablet] = useState(false)

	const resetHeight = () =>{
		setIsMobile(window.innerWidth <= 450)
		setIsTablet(window.innerWidth <= 768)
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

    useEffect(()=>{
        props.getAuthUserData()
		window.addEventListener("resize", resetHeight);
		resetHeight();
		return () => {
			window.removeEventListener("resize", resetHeight)
		}
    }, [])

	if(props.fetchGetAuthUserData){
		return (
			<Loading/>
		)
	}

	return (
		<>
			<Route exact path={'/'} render= {() => <Landing isMobile={isMobile} isTablet={isTablet} isAuth={props.isAuth}/>}/>
			<Route path={'/auth'}  render= {() => <Auth isMobile={isMobile} isTablet={isTablet}/>}/>
			<Route path={'/reset_password'}  render= {() => <ResetPassword isMobile={isMobile} isTablet={isTablet} toast={toast}/>}/>
			<Route path={'/signup'}  render= {() => <Registration isMobile={isMobile} isTablet={isTablet}/>}/>
			<Route path={'/cabinet'}  render= {() => <Cabinet isMobile={isMobile} isTablet={isTablet} toast={toast}/>}/>
			<Route path={'/ref'}  render= {() => <RefMiddleware/> }/>
			<Toast ref={toast} position="bottom-right"/>
		</>
	);
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
	fetchGetAuthUserData: state.auth.fetchGetAuthUserData,
	goLogin: state.auth.goLogin
})

export default connect(mapStateToProps, {getAuthUserData})(App);
