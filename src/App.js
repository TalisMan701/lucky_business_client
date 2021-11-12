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
import React, {useEffect} from "react";
import Cabinet from "./Pages/Cabinet";
import RefMiddleware from "./Components/RefMiddleware/RefMiddleware";
import Loading from "./Pages/Loading";

function App(props) {
    useEffect(()=>{
        props.getAuthUserData()
    }, [])
	if(props.fetchGetAuthUserData){
		return (
			<Loading/>
		)
	}

	return (
		<>
			<Route exact path={'/'} render= {() => <Landing isAuth={props.isAuth}/>}/>
			<Route path={'/auth'}  render= {() => <Auth/>}/>
			<Route path={'/signup'}  render= {() => <Registration/>}/>
			<Route path={'/cabinet'}  render= {() => <Cabinet/>}/>
			<Route path={'/ref'}  render= {() => <RefMiddleware/> }/>
		</>
	);
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
	fetchGetAuthUserData: state.auth.fetchGetAuthUserData,
	goLogin: state.auth.goLogin
})

export default connect(mapStateToProps, {getAuthUserData})(App);
