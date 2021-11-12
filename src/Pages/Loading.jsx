import React from 'react';
import classes from '../StylesForPages/Loading.module.css'
import Particles from "react-particles-js";
const Loading = () => {
	return (
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
			<i className={`pi pi-spin pi-spinner ${classes.fetch}`}/>
		</div>
	);
};

export default Loading;
