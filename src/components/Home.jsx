import { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/carrusel.css";
import services from "../services/services";

class Home extends Component {
	state = {
		charlas: [],
		rondas: [],
		charlasRonda: [],
		estadoCharla: []
	};

	getCharlas = () => {
		services.getCharlasCurso().then((response) => {
			console.log(response);
			this.setState({
				charlas: response
			});
		});
	};

	// getRondas = () => {
	// 	services.getRondas().then((response) => {
	// 		console.log(response);
	// 		this.setState({
	// 			rondas: response
	// 		});
	// 	});
	// };

	// getEstadosCharla = () => {
	// 	services.getEstadoCharla().then((response) => {
	// 		console.log(response);
	// 		this.setState({
	// 			estadoCharla: response
	// 		});
	// 	});
	// };

	componentDidMount = () => {
		this.getCharlas();
		// this.getRondas();
		// this.getEstadosCharla();
	};

	render() {
		// Configuración del carrusel con react-slick
		const settings = {
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: true,
			arrows: true,
			prevArrow: (
				<button type="button" className="slick-prev">
					<i className="fa-solid fa-circle-arrow-left"></i>
				</button>
			),
			nextArrow: (
				<button type="button" className="slick-next">
					<i className="fa-solid fa-circle-arrow-right"></i>
				</button>
			),
			responsive: [
				{
					breakpoint: 1000,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		};

		return (
			<div className="home">
				<div className="carousel">
					<Slider {...settings}>
						{this.state.charlas.map((charla, index) => (
							<div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
								<div className="card">
									<img
										src={charla.imagenCharla}
										alt={charla.titulo}
										className="imgcharla card-img-top"
										
									/>
									<div className="card-body">
										<h5 className="card-title">{charla.titulo}</h5>
										<p className="card-text">{charla.descripcion}</p>
									</div>
								</div>
							</div>
						))}
					</Slider>
				</div>
			</div>
		);
	}
}

export default Home;

