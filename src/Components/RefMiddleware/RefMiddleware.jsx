import React, {useEffect, useState} from 'react';
import classes from './RefMiddleware.module.css'
import {Redirect, withRouter} from "react-router-dom";
import Loading from "../../Pages/Loading";
const RefMiddleware = (props) => {
	const [redirect, setRedirect] = useState(false)
	/*console.log(new URLSearchParams(props.location.search).get("uuid"))*/
	useEffect(()=>{
		localStorage.setItem("refCode", new URLSearchParams(props.location.search).get("uuid"))
		setRedirect(true)
	},[])
	if(redirect){
		return <Redirect to={'/'}/>
	}
	return (
		<Loading/>
	);
};

export default withRouter(RefMiddleware);
