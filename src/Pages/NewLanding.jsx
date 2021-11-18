import React from 'react';
import classes from '../StylesForPages/NewLanding.module.css'
import NewHeader from "../Components/NewHeader/NewHeader";
import Footer from "../Components/Footer/Footer";
import {Link} from "react-router-dom";
import Hero1Svg from "../Images/SVG/Hero1.svg"
import Hero2Svg from "../Images/SVG/Hero2.svg"
import Info1Svg from "../Images/SVG/Info1.svg"
import Info2Svg from "../Images/SVG/Info2.svg"
import Info3Svg from "../Images/SVG/Info3.svg"
import Client1Svg from "../Images/SVG/Client1.svg"
import Client4Svg from "../Images/SVG/Clinet4.svg"
import Client5Svg from "../Images/SVG/Clinet5.svg"
import Client6Svg from "../Images/SVG/Client6.svg"
import About1Jpg from "../Images/Other/About1.png"
import ContactUs1Svg from "../Images/SVG/ContactUs1.svg"
import ContactUs2Svg from "../Images/SVG/ContactUs2.svg"
import ContactUs3Svg from "../Images/SVG/ContactUs3.svg"
import ContactUs4Svg from "../Images/SVG/ContactUs4.svg"
import ContactUs5Svg from "../Images/SVG/ContactUs5.svg"
import ContactUs6Svg from "../Images/SVG/ContactUs6.svg"
import clsx from "clsx";
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import Zoom from 'react-reveal/Zoom';
import HeadShake from 'react-reveal/HeadShake';
import {ScrollTop} from "primereact/scrolltop";

const NewLanding = (props) => {
	return (
		<div className={classes.body}>
			<NewHeader />
			<main>
				<div className={classes.container}>
					<section className={classes.hero}>
						<div className={classes.heroTitleInner}>
							<Bounce left>
								<span className={classes.heroTitle}>Заработок</span>
							</Bounce>
							<Bounce right>
								<span className={classes.heroTitle}>в режиме</span>
							</Bounce>
							<Bounce left>
								<span className={classes.heroTitle}>автопилота</span>
							</Bounce>
						</div>
						<div className={classes.heroInfo}>
							<Pulse>
								<Link to={'/'} className={classes.btnStart}>
									Начать
								</Link>
							</Pulse>
							<div className={classes.heroInfoDesc}>
								Первая обучающая платформа, на которой мы делимся, а ты приумножаешь.
							</div>
							<Fade bottom cascade>
								<img src={Hero2Svg} alt="" className={classes.heroInfoCardImg}/>
								<img src={Hero1Svg} alt="" className={classes.heroInfoCardImg}/>
							</Fade>
						</div>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container}>
					<section className={classes.info}>
						<div className={classes.infoTitle}>Ты хочешь открыть своё дело, но:</div>
						<div className={classes.infoCards}>
							<Bounce left>
								<div className={classes.infoCard}>
									<img src={Info1Svg} alt="" className={classes.infoCardImg}/>
									<div className={classes.infoCardText} style={{width: 196}}>У тебя мало финансов для старта.</div>
									<div className={classes.lineAB}/>
									<div className={classes.lineABS}/>
								</div>
							</Bounce>
							<Bounce>
								<div className={classes.infoCard}>
									<img src={Info2Svg} alt="" className={classes.infoCardImg}/>
									<div className={classes.infoCardText} style={{width: 188}}>Ты не понимаешь, как заработать первые деньги.</div>
									<div className={classes.lineAB}/>
									<div className={classes.lineABS}/>
								</div>
							</Bounce>
							<Bounce right>
								<div className={classes.infoCard}>
									<img src={Info3Svg} alt="" className={classes.infoCardImg}/>
									<div className={classes.infoCardText} style={{width: 297}}>При поисковых запросах в интернете, слишком много противоречащей друг другу информации.</div>
									<div className={classes.lineAB}/>
									<div className={classes.lineABS}/>
								</div>
							</Bounce>
							<div className={classes.lineA}/>
						</div>
						<div className={classes.InfoDesc}>
							Наш проект - это именно то, что ты давно искал!
						</div>
						<div className={classes.InfoDescMini}>
							скорее проходи регистрацию и присоединяйся к нам
						</div>
					</section>
				</div>
				<div className={classes.container}>
					<section className={classes.clientsHeader}>
						<Bounce left>
							<div className={classes.clientsHeaderTitle}>
								Тебе точно это нужно, если ты:
							</div>
						</Bounce>
						<div className={classes.clientsHeaderLogo}>
							Lucky Business
						</div>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container}>
					<section className={classes.clients}>
						<Zoom cascade>
							<div className={classes.clientsCards}>
								<div className={clsx(classes.clientsCard, classes.clientsCard1)}>
									<span className={clsx(classes.clientsCardNumber, classes.clientsCardNumber1)}>01</span>
									<img src={Client1Svg} alt="" className={classes.clientsCardImg1}/>
									<div className={clsx(classes.clientsCardText, classes.clientsCardText1)}>Интернет-предприниматель</div>
								</div>
								<div className={clsx(classes.clientsCard, classes.clientsCard2)}>
									<span className={classes.clientsCardNumber}>02</span>
									<div className={clsx(classes.clientsCardText, classes.clientsCardText2)}>Студент</div>
								</div>
								<div className={clsx(classes.clientsCard, classes.clientsCard3)}>
									<span className={classes.clientsCardNumber}>03</span>
									<div className={clsx(classes.clientsCardText, classes.clientsCardText3)}>Будущий франчайзи</div>
								</div>
								<div className={clsx(classes.clientsCard, classes.clientsCard4)}>
									<span className={classes.clientsCardNumber}>04</span>
									<img src={Client4Svg} alt="" className={classes.clientsCardImg4}/>
									<div className={clsx(classes.clientsCardText, classes.clientsCardText4)}>Стартапер</div>
								</div>
								<div className={clsx(classes.clientsCard, classes.clientsCard5)}>
									<span className={classes.clientsCardNumber}>05</span>
									<img src={Client5Svg} alt="" className={classes.clientsCardImg5}/>
									<div className={clsx(classes.clientsCardText, classes.clientsCardText5)}>Готов узнавать новое и зарабатывать уже сейчас</div>
								</div>
								<div className={clsx(classes.clientsCard, classes.clientsCard6)}>
									<span className={classes.clientsCardNumber}>06</span>
									<img src={Client6Svg} alt="" className={classes.clientsCardImg6}/>
									<div className={clsx(classes.clientsCardText, classes.clientsCardText6)}>MLM предприниматель</div>
								</div>
							</div>
						</Zoom>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container}>
					<section className={classes.about}>
						<div className={classes.aboutContent}>
							<div className={classes.aboutContentRow1}>
								<Bounce left>
									<div className={classes.aboutContentTitle}>Lucky Business - это</div>
								</Bounce>
								<div className={classes.line}/>
								<div className={classes.aboutContentDesc}>
									Единственная обучающая платформа, цель которой: дать тебе все необходимые знания для ведения собственного бизнеса, и позволить приумножить свой капитал прямо здесь и сейчас.
								</div>
							</div>
							<div className={classes.aboutContentRow2}>
								<div className={classes.aboutContentStatus}>Ceo  Lucky Business</div>
								<div className={classes.aboutContentName}>Дмитрий Вахрушев</div>
								<div className={classes.line}/>
							</div>
						</div>
						<Zoom>
							<img src={About1Jpg} alt="" className={classes.aboutImg}/>
						</Zoom>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container}>
					<section className={classes.ContactUs}>
						<HeadShake>
							<div className={classes.ContactUsTitle}>В Lucky Business ты получишь:</div>
						</HeadShake>
						<div className={classes.ContactUsCards}>
							<Fade left>
								<div className={clsx(classes.ContactUsCard, classes.ContactUsCard1)}>
									<div className={classes.ContactUsCardText} style={{width: 228}}>Все необходимые курсы для погружения в мир бизнеса</div>
									<img src={ContactUs1Svg} alt="" className={classes.ContactUsCardImg}/>
								</div>
							</Fade>
							<Fade right>
								<div className={clsx(classes.ContactUsCard, classes.ContactUsCard1)}>
									<div className={classes.ContactUsCardText} style={{width: 243}}>Ты будешь в команде единомышленников, которые помогут в развитии твоего бизнеса</div>
									<img src={ContactUs2Svg} alt="" className={classes.ContactUsCardImg}/>
								</div>
							</Fade>
							<Fade left>
								<div className={clsx(classes.ContactUsCard, classes.ContactUsCard2)}>
									<div className={classes.ContactUsCardText}>Начнешь свой бизнес со стартовым капиталом - 990₽</div>
									<img src={ContactUs3Svg} alt="" className={classes.ContactUsCardImg}/>
								</div>
							</Fade>
							<Fade right>
								<div className={clsx(classes.ContactUsCard, classes.ContactUsCard2)}>
									<div className={classes.ContactUsCardText } style={{width: 250}}>У тебя будет возможность повысить свой уровень знаний из любой точки мира и начать зарабатывать на этом прямо сейчас! </div>
									<img src={ContactUs4Svg} alt="" className={classes.ContactUsCardImg}/>
								</div>
							</Fade>
							<Fade left>
								<div className={clsx(classes.ContactUsCard, classes.ContactUsCard3)}>
									<div className={classes.ContactUsCardText} style={{width: 262, fontSize: 17}}>Базу знаний от экспертов в сфере интернет-маркетинга, MLM маркетинга и организации бизнес-процессов</div>
									<img src={ContactUs5Svg} alt="" className={classes.ContactUsCardImg}/>
								</div>
							</Fade>
							<Fade right>
								<div className={clsx(classes.ContactUsCard, classes.ContactUsCard3)}>
									<div className={classes.ContactUsCardText} style={{width: 180}}>Четкую систему для выхода на доход от 50.000₽ уже в первый месяц</div>
									<img src={ContactUs6Svg} alt="" className={classes.ContactUsCardImg}/>
								</div>
							</Fade>
						</div>
						<Pulse>
							<Link
								to={'/'}
								className={classes.btnContactUs}
							>Зарегистрироваться</Link>
						</Pulse>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container}>
					<section className={classes.endHeader}>
						<Bounce left>
							<div className={classes.endHeaderText}>Думаешь</div>
						</Bounce>
						<Bounce right>
							<div className={classes.endHeaderText}>это всё?</div>
						</Bounce>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container}>
					<section className={classes.end}>
						<div className={classes.endCol1}>
							<Pulse>
								<Link to={'/'} className={classes.btnEndSignUp}>
									Зарегистрироваться
								</Link>
							</Pulse>
						</div>
						<div className={classes.endCol2}>
							<Bounce right>
								<div className={classes.endText}>
									Ты сможешь вернуть стоимость самого дорогого информационного пакета уже в первую неделю своего обучения
								</div>
							</Bounce>
							<div className={classes.endLogo}>Lucky Business</div>
						</div>
					</section>
				</div>
				<div className={classes.line}/>
			</main>
			<Footer/>
			<ScrollTop />
		</div>
	);
};

export default NewLanding;
