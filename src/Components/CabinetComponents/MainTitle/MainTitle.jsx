import React from 'react';
import classes from './MainTitle.module.css'
const MainTitle = ({children}) => {
	return (
		<div className={classes.title}>
			{children}
		</div>
	);
};

export default MainTitle;
