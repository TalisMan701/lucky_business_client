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
import Pack1Svg from "../Images/SVG/pack1.svg"
import Pack2Svg from "../Images/SVG/pack2.svg"
import Pack3Svg from "../Images/SVG/pack3.svg"
import Pack4Svg from "../Images/SVG/pack4.svg"
import Pack5Svg from "../Images/SVG/pack5.svg"
import Pack6Svg from "../Images/SVG/pack6.svg"
import Check1Svg from "../Images/SVG/check1.svg"
import Check2Svg from "../Images/SVG/check2.svg"
import Check3Svg from "../Images/SVG/check3.svg"
import Check4Svg from "../Images/SVG/check4.svg"
import Check5Svg from "../Images/SVG/check5.svg"
import Check6Svg from "../Images/SVG/check6.svg"
import BlackImg from "../Images/Other/black.png"
import Two1Img from "../Images/Other/two1.png"
import Two2Img from "../Images/Other/two2.png"
import Two3Img from "../Images/Other/two3.png"
import Two4Img from "../Images/Other/two4.png"
import Two5Img from "../Images/Other/two5.png"
import Two6Img from "../Images/Other/two6.png"
import Two7Img from "../Images/Other/two7.png"
import Two8Img from "../Images/Other/two8.png"
import GoldImg from "../Images/Other/gold.png"
import BonusImg from "../Images/Other/bonus.png"
import PlatimumImg from "../Images/Other/platinum.png"
import FooterImg from "../Images/Other/footer-min.png"
import FooterImg2 from "../Images/Other/footer2.png"
import DownloadIconSvg from "../Images/SVG/download.svg"
import MoneyControllerImg from "../Images/SVG/moneyController.svg"
import Client1Svg from "../Images/SVG/Client1.svg"
import Client4Svg from "../Images/SVG/Clinet4.svg"
import Client5Svg from "../Images/SVG/Clinet5.svg"
import Client6Svg from "../Images/SVG/Client6.svg"
import About1Jpg from "../Images/Other/About1.png"
import TestSvg from "../Images/SVG/TestSVG.svg"
import PackCont2Svg from "../Images/SVG/packCont2.svg"
import PackCont3Svg from "../Images/SVG/packCont3.svg"
import PackCont4Svg from "../Images/SVG/packCont4.svg"
import PackCont5Svg from "../Images/SVG/packCont5.svg"
import PackCont6Svg from "../Images/SVG/packCont6.svg"
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
		<>
			<div className={classes.body}>
				<NewHeader isMobile={props.isMobile} isAuth={props.isAuth}/>
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
									<Link to={'/cabinet'} className={classes.btnStart}>
										Начать
									</Link>
								</Pulse>
								<div className={classes.heroInfoDesc}>
									Первая обучающая платформа, на которой мы делимся, а ты приумножаешь.
								</div>
								{props.isMobile ?
									<div className={classes.heroRow}>
										<Fade bottom cascade>
											<img src={Hero2Svg} alt="" className={classes.heroInfoCardImg}/>
											<img src={Hero1Svg} alt="" className={classes.heroInfoCardImg}/>
										</Fade>
									</div>:
									<Fade bottom cascade>
										<img src={Hero2Svg} alt="" className={classes.heroInfoCardImg}/>
										<img src={Hero1Svg} alt="" className={classes.heroInfoCardImg}/>
									</Fade>
								}
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
								{!props.isMobile &&
									<div className={classes.lineA}/>
								}
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
										<div className={clsx(classes.clientsCardText, classes.clientsCardText6)}>MLM <br/> предприниматель</div>
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
								{!props.isMobile &&
									<div className={classes.aboutContentRow2}>
										<div className={classes.aboutContentStatus}>Ceo  Lucky Business</div>
										<div className={classes.aboutContentName}>Дмитрий Вахрушев</div>
										<div className={classes.line}/>
									</div>
								}
							</div>
							<Zoom>
								<img src={About1Jpg} alt="" className={classes.aboutImg}/>
							</Zoom>
							{props.isMobile &&
							<div className={classes.aboutContentRow2}>
								<div className={classes.aboutContentStatus}>Ceo  Lucky Business</div>
								<div className={classes.aboutContentName}>Дмитрий Вахрушев</div>
							</div>
							}
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
										<div className={classes.ContactUsCardText} style={{width: 262}}>Базу знаний от экспертов в сфере интернет-маркетинга, MLM маркетинга и организации бизнес-процессов</div>
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
									to={'/signup'}
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
					{!props.isMobile &&
						<div className={classes.line}/>
					}
					<div className={classes.container}>
						{props.isMobile ?
							<section className={classes.end}>
								<Bounce right>
									<div className={classes.endText}>
										Ты сможешь вернуть стоимость самого дорогого информационного пакета уже в первую неделю своего обучения
									</div>
								</Bounce>
								<Pulse>
									<Link to={'/signup'} className={classes.btnEndSignUp}>
										Зарегистрироваться
									</Link>
								</Pulse>
							</section>:
							<section className={classes.end}>
								<div className={classes.endCol1}>
									<Pulse>
										<Link to={'/signup'} className={classes.btnEndSignUp}>
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
						}
					</div>
					{/*<div className={classes.line}/>*/}
				</main>
				<ScrollTop />
			</div>
			<div className={classes.body2}>
				<div className={classes.container}>
					<section className={classes.oneHeader}>
						<Bounce left>
							<div className={classes.oneHeader1}>
								<span className={classes.oneHeaderText}>Продукты </span>
								<span className={classes.oneHeaderTextOut}>Продукты </span>
							</div>
						</Bounce>
						<Bounce right>
							<div className={classes.oneHeader2}>
								<span className={classes.oneHeaderTextOut}>компании</span>
								<span className={classes.oneHeaderText}>компании</span>
							</div>
						</Bounce>
					</section>
				</div>
				{!props.isMobile &&
					<div className={classes.line}/>
				}
				<div className={classes.container}>
					<section id={"tarifs"} className={classes.one}>
						<div className={classes.oneCard}>
							<div className={classes.oneCardContent}>
								<Fade top cascade>
									<div className={classes.oneCardTitleInner}>
										<div className={classes.oneCardTitle}>МЛМ</div>
										<img src={Check1Svg} alt="" className={classes.oneCardTitleImg}/>
									</div>
									<img src={TestSvg} alt=""/>
								</Fade>
							</div>
							<Fade right>
								<img src={Pack1Svg} alt="" className={classes.oneCardImg}/>
							</Fade>
						</div>
						<div className={classes.oneCard}>
							<div className={classes.oneCardContent}>
								<Fade top cascade>
									<div className={classes.oneCardTitleInner}>
										<div className={classes.oneCardTitle} style={{fontSize: 30}}>Финансовая
											грамотность</div>
										<img src={Check2Svg} alt="" className={classes.oneCardTitleImg}/>
									</div>
									<img src={PackCont2Svg} alt=""/>
								</Fade>
							</div>
							<Fade right>
								<img src={Pack2Svg} alt="" className={classes.oneCardImg}/>
							</Fade>
						</div>
						<div className={classes.oneCard}>
							<div className={classes.oneCardContent}>
								<Fade top cascade>
									<div className={classes.oneCardTitleInner} style={{marginBottom: 20}}>
										<div className={classes.oneCardTitle} style={{fontSize: 30}}>Личностный
											рост</div>
										<img src={Check3Svg} alt="" className={classes.oneCardTitleImg}/>
									</div>
									<img src={PackCont3Svg} alt=""/>
								</Fade>
							</div>
							<Fade right>
								<img src={Pack3Svg} alt="" className={classes.oneCardImg}/>
							</Fade>
						</div>
						<div className={classes.oneCard}>
							<div className={classes.oneCardContent}>
								<Fade top cascade>
									<div className={classes.oneCardTitleInner} style={{marginBottom: 12}}>
										<div className={classes.oneCardTitle} style={{fontSize: 30}}>Инстаграм</div>
										<img src={Check4Svg} alt="" className={classes.oneCardTitleImg}/>
									</div>
									<img src={PackCont4Svg} alt=""/>
								</Fade>
							</div>
							<Fade right>
								<img src={Pack4Svg} alt="" className={classes.oneCardImg}/>
							</Fade>
						</div>
						<div className={classes.oneCard}>
							<div className={classes.oneCardContent}>
								<Fade top cascade>
									<div className={classes.oneCardTitleInner} style={{marginBottom: 12}}>
										<div className={classes.oneCardTitle} style={{fontSize: 30}}>Продажи</div>
										<img src={Check5Svg} alt="" className={classes.oneCardTitleImg}/>
									</div>
									<img src={PackCont5Svg} alt=""/>
								</Fade>
							</div>
							<Fade right>
								<img src={Pack5Svg} alt="" className={classes.oneCardImg}/>
							</Fade>
						</div>
						<div className={classes.oneCard}>
							<div className={classes.oneCardContent}>
								<Fade top cascade>
									<div className={classes.oneCardTitleInner} style={{marginBottom: 4}}>
										<div className={classes.oneCardTitle} style={{fontSize: 30}}>Криптовалюта</div>
										<img src={Check6Svg} alt="" className={classes.oneCardTitleImg}/>
									</div>
									<img src={PackCont6Svg} alt=""/>
								</Fade>
							</div>
							<Fade right>
								<img src={Pack6Svg} alt="" className={classes.oneCardImg}/>
							</Fade>
						</div>
						<div className={classes.locks}>
							<div className={classes.lockRow}>
								<Fade left>
									<img src={BlackImg} alt="" style={{marginRight: 32}}/>
								</Fade>
								<Fade right>
									<img src={GoldImg} alt=""/>
								</Fade>
							</div>
							<Fade bottom>
								<img src={PlatimumImg} alt="" className={classes.locksPlatinum}/>
							</Fade>
						</div>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container} style={{maxWidth: 1000}}>
					<section className={classes.clientsHeader} style={{paddingTop: 72, paddingBottom: 76}}>
						<Bounce left>
							<div className={classes.clientsHeaderTitle} style={{fontSize: 64, lineHeight: "62px"}}>
								Как будет <br/> проходить <br/> обучение:
							</div>
						</Bounce>
						<div className={classes.clientsHeaderLogo}>
							01/04
						</div>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container} style={{maxWidth: 1000}}>
					<section className={classes.two}>
						<Fade top>
							<div className={classes.twoCard} style={{backgroundColor: "#F003D1"}}>
								<div className={classes.twoCardNumber}>01</div>
								<img src={Two1Img} alt="" className={classes.twoCardImg} style={{top: 79}}/>
								<div style={{height: 121}}>
									<div className={classes.twoCardLine}/>
									<div className={classes.twoCardText}>Видеоуроки <br/> в телефоне</div>
								</div>
							</div>
						</Fade>
						<Fade bottom>
							<div className={classes.twoCard} style={{backgroundColor: "#FFA800"}}>
								<div className={classes.twoCardNumber}>01</div>
								<img src={Two2Img} alt="" className={classes.twoCardImg} style={{top: 79}}/>
								<div style={{height: 121}}>
									<div className={classes.twoCardLine}/>
									<div className={classes.twoCardText}>Полезные <br/> материалы</div>
								</div>
							</div>
						</Fade>
						<Fade top>
							<div className={classes.twoCard} style={{backgroundColor: "#21C8CA"}}>
								<div className={classes.twoCardNumber}>01</div>
								<img src={Two3Img} alt="" className={classes.twoCardImg} style={{top: 67}}/>
								<div style={{height: 121}}>
									<div className={classes.twoCardLine}/>
									<div className={classes.twoCardText}>Онлайн- <br/> конференции <br/> от экспертов</div>
								</div>
							</div>
						</Fade>
						<Fade bottom>
							<div className={classes.twoCard} style={{backgroundColor: "#DA7036"}}>
								<div className={classes.twoCardNumber}>01</div>
								<img src={Two4Img} alt="" className={classes.twoCardImg} style={{top: 64}}/>
								<div style={{height: 121}}>
									<div className={classes.twoCardLine}/>
									<div className={classes.twoCardText}>Получение <br/> сертификата</div>
								</div>
							</div>
						</Fade>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container} style={{maxWidth: 1000}}>
					<section className={classes.clientsHeader} style={{paddingTop: 72, paddingBottom: 76}}>
						<Bounce left>
							<div className={classes.clientsHeaderTitle} style={{fontSize: 64, lineHeight: "62px", width: 750}}>
								Уже в первую <br/> неделю ты <br/> сможешь:
							</div>
						</Bounce>
						<div className={classes.clientsHeaderLogo}>
							01/04
						</div>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container} style={{maxWidth: 1000}}>
					<section className={classes.two} style={{paddingTop: 39, paddingBottom: 142}}>
						<Fade bottom>
							<div className={classes.twoCard} style={{backgroundColor: "#FB7519"}}>
								<div className={classes.twoCardNumber}>01</div>
								<img src={Two5Img} alt="" className={classes.twoCardImg} style={{top: 83}}/>
								<div style={{height: 121}}>
									<div className={classes.twoCardLine}/>
									<div className={classes.twoCardText2}>Применить ценные практические знания по выбранной теме.</div>
								</div>
							</div>
						</Fade>
						<Fade top>
							<div className={classes.twoCard} style={{backgroundColor: "#FF006B"}}>
								<div className={classes.twoCardNumber}>01</div>
								<img src={Two6Img} alt="" className={classes.twoCardImg} style={{top: 83}}/>
								<div style={{height: 121}}>
									<div className={classes.twoCardLine}/>
									<div className={classes.twoCardText2}>Собрать команду единомышленников.</div>
								</div>
							</div>
						</Fade>
						<Fade bottom>
							<div className={classes.twoCard} style={{backgroundColor: "#2F2BFF"}}>
								<div className={classes.twoCardNumber}>01</div>
								<img src={Two7Img} alt="" className={classes.twoCardImg} style={{top: 47}}/>
								<div style={{height: 121}}>
									<div className={classes.twoCardLine}/>
									<div className={classes.twoCardText2}>Получить первый доход от заказов.</div>
								</div>
							</div>
						</Fade>
						<Fade top>
							<div className={classes.twoCard} style={{backgroundColor: "#9600FF"}}>
								<div className={classes.twoCardNumber}>01</div>
								<img src={Two8Img} alt="" className={classes.twoCardImg} style={{top: 103}}/>
								<div style={{height: 121}}>
									<div className={classes.twoCardLine}/>
									<div className={classes.twoCardText2}>Заниматься тем, что тебе действительно по душе.</div>
								</div>
							</div>
						</Fade>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container} style={{maxWidth: 1000}}>
					<section className={classes.make}>
						<Bounce right>
							<div className={classes.makeTitle}>Создай свой</div>
						</Bounce>
						<Bounce left>
							<div className={classes.makeTitle} style={{alignSelf: "flex-end"}}>Lucky Business</div>
						</Bounce>
						<Fade bottom>
							<div className={classes.makeText}>по партнерской <br/> программе:</div>
						</Fade>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container} style={{maxWidth: 1000}}>
					<Bounce right cascade>
						<section className={classes.bonus}>
							<div className={classes.bonusItem}>
								<div className={classes.bonusItemNumber}>
									01
								</div>
								<div className={classes.bonusItemText}>
									Бонус с продаж
								</div>
								<img src={BonusImg} alt="" className={classes.bonusItemImg}/>
							</div>
							<div className={classes.bonusItem} style={{width: 658, marginLeft: 92}}>
								<div className={classes.bonusItemNumber}>
									02
								</div>
								<div className={classes.bonusItemText}>
									Бонус личного товарооборота
								</div>
								<img src={BonusImg} alt="" className={classes.bonusItemImg}/>
							</div>
							<div className={classes.bonusItem} style={{width: 759, alignSelf: "flex-end"}}>
									<div className={classes.bonusItemNumber}>
										03
									</div>
									<div className={classes.bonusItemText}>
										Накопительный бонус с продаж структуры
									</div>
									<img src={BonusImg} alt="" className={classes.bonusItemImg}/>
								</div>
						</section>
					</Bounce>
				</div>
				<div className={classes.line}/>
				<div className={classes.container} style={{maxWidth: 1000}}>
					<section className={classes.download}>
						<div className={classes.downloadText}>
							Более подробно ты можешь ознакомиться с <br/> маркетинг-планом в нашей PDF-презентации.
						</div>
					</section>
				</div>
				<div className={classes.line}/>
				<div className={classes.container} style={{maxWidth: 1000}}>
					<section className={classes.download}>
						<Pulse>
							<a href={'https://lucky-business.s3.us-east-2.amazonaws.com/materials/presentation.pdf'} target={"_blank"} className={classes.downloadBtn}>
								<span className={classes.downloadBtnText}>Скачать презентацию</span>
								<img src={DownloadIconSvg} alt="" className={classes.downloadBtnIcon}/>
							</a>
						</Pulse>
					</section>
				</div>
				<div className={classes.container}>
					<section className={classes.money}>
						<Fade top>
							<div className={classes.moneyTitle}>Распределение <br/> оборотных <br/> средств</div>
						</Fade>
						<Pulse>
							<img src={MoneyControllerImg} alt="" className={classes.moneyImg}/>
						</Pulse>
					</section>
				</div>
				<div className={classes.line}/>
				<section className={classes.end2}>
					<div className={classes.container} style={{maxWidth: 1000, position: "relative"}}>
						<Fade left>
							<div className={classes.end2Title}>
								Узнай какими <br/> талантами ты <br/> обладаешь
							</div>
						</Fade>
						<img src={FooterImg} alt="" className={classes.end2BGImg}/>
					</div>
					{props.isMobile ?
						<div className={classes.endCol1}>
							<Pulse>
								<Link to={'/'} className={clsx(classes.btnEndSignUp, classes.btnEndSignUp2)}>
									Пройти тест сейчас
								</Link>
							</Pulse>
						</div>:
						<>
							<div className={classes.line} style={{position: "relative", zIndex: 3}}/>
							<div className={clsx(classes.end, classes.end2footer)}>
								<div className={classes.endCol1}>
									<Pulse>
										<Link to={'/'} className={clsx(classes.btnEndSignUp, classes.btnEndSignUp2)}>
											Пройти тест сейчас
										</Link>
									</Pulse>
								</div>
								<div className={classes.endCol2}>
									<Bounce right>
										<div className={classes.endText}>
											Здесь какая-то инфа о квизе, запросить у Владимира
										</div>
									</Bounce>
									<div className={classes.endLogo}>Lucky Business</div>
								</div>
							</div>
						</>
					}
				</section>
			</div>
			<footer className={classes.footer}>
				<div className={clsx(classes.container, classes.footerInner)}>
					<div className={classes.footerCol1}>
						<div className={classes.footerRow1}>
							<div className={classes.footerTextInner}>
								<div className={classes.footerTitle}>Получатель</div>
								<div className={classes.footerText}>ООО "ЛАКИ БИЗНЕС"</div>
							</div>
							<div className={classes.footerTextInner}>
								<div className={classes.footerTitle}>ИНН</div>
								<div className={classes.footerText}>7325175510</div>
							</div>
							<div className={classes.footerTextInner}>
								<div className={classes.footerTitle}>Расчётный счёт (₽)</div>
								<div className={classes.footerText}>40702810002500114671</div>
							</div>
							<div className={classes.footerTextInner}>
								<div className={classes.footerTitle}>КПП</div>
								<div className={classes.footerText}>732501001</div>
							</div>
						</div>
						<div className={classes.footerRow2}>
							<div className={classes.footerTextInner}>
								<div className={classes.footerTitle}>Название банка</div>
								<div className={classes.footerText}>ТОЧКА ПАО БАНКА "ФК ОТКРЫТИЕ"</div>
							</div>
							<div className={classes.footerTextInner}>
								<div className={classes.footerTitle}>Город</div>
								<div className={classes.footerText}>г. Москва</div>
							</div>
							<div className={classes.footerTextInner}>
								<div className={classes.footerTitle}>Корр. счёт</div>
								<div className={classes.footerText}>30101810845250000999</div>
							</div>
							<div className={classes.footerTextInner}>
								<div className={classes.footerTitle}>БИК</div>
								<div className={classes.footerText}>044525999</div>
							</div>
						</div>
					</div>
					<div className={classes.footerCol2}>
						<Link to={'/pdf'} target={'_blank'} className={classes.footerLink}>
							Договор оферта
						</Link>
					</div>

				</div>
			</footer>
		</>
	);
};


export default NewLanding;
