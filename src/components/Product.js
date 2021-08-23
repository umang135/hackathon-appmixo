import React, { useEffect, useState } from "react"
import { useShopify } from "../hooks"
import Gradients from "./Gradients";
import ProductImages from "./ProductImages";
import Info from "./Info";
import { Container, Row, Col } from 'react-bootstrap';

import logo from "../components/assets/img/logo.png";


export default (props) => {
	const { products, fetchProduct } = useShopify()

	function handleClick(e, product_id) {
		e.preventDefault()
		const id = product_id
		fetchProduct(id).then((res) => {
			props.history.push(`/Product/${res.id}`)
		})
	}

	//new code

	var sizes, colors, shoes, gradients, shoeBackground, shoeHeight;
	var prevColor = "blue";
	var animateOrNot = true;

	const [variantImgCurrentId, setvariantImgCurrentId] = useState("")
	const [variantImg, setvariantImg] = useState("")

	function changeColor() {
		if (!animateOrNot) {
			console.log("waittttt");
			return;
		}
		var primary = this.getAttribute("primary");
		var color = this.getAttribute("color");
		var shoe = document.querySelector(`.shoe[color="${color}"]`);
		var gradient = document.querySelector(`.gradient[color="${color}"]`);
		var prevGradient = document.querySelector(
			`.gradient[color="${prevColor}"]`
		);

		// showing correct color
		colors.forEach(color => color.classList.remove("active"));
		this.classList.add("active");

		// changing primary css variable
		document.documentElement.style.setProperty("--primary", primary);

		// showing correct img
		shoes.forEach(s => s.classList.remove("show"));
		shoe.classList.add("show");

		// dealing with gradient
		gradients.forEach(g => g.classList.remove("display", "behind"));
		prevGradient.classList.add("behind");
		gradient.classList.add("display");

		// logic
		prevColor = color;
		animateOrNot = false;

		// hack
		setTimeout(() => {
			animateOrNot = true;
		}, 800);
	}

	function changeSize() {
		sizes.forEach(size => size.classList.remove("active"));
		this.classList.add("active");
	}

	// for responsive behaviour
	// const changeHeight = () => {
	// 	var x = window.matchMedia("(max-width:1000px)");

	// 	!shoes ? (shoeHeight = 0) : (shoeHeight = shoes[0].offsetHeight);

	// 	if (x.matches) {
	// 		if (shoeHeight === 0) {
	// 			try {
	// 				setTimeout(changeHeight, 50);
	// 			} catch (error) {
	// 				alert("Something is Wrong!!");
	// 			}
	// 		}
	// 		shoeBackground.style.height = `${shoeHeight * 0.9}px`;
	// 	} else if (!!shoeBackground) {
	// 		// go back to default
	// 		shoeBackground.style.height = "475px";
	// 	}
	// };

	// useEffect(() => {
	// 	sizes = document.querySelectorAll(".size");
	// 	colors = document.querySelectorAll(".color");
	// 	shoes = document.querySelectorAll(".shoe");
	// 	gradients = document.querySelectorAll(".gradient");
	// 	shoeBackground = document.querySelector(".shoeBackground");

	// 	colors.forEach(color => color.addEventListener("click", changeColor));
	// 	sizes.forEach(size => size.addEventListener("click", changeSize));
	// 	changeHeight();
	// }, []);
	// window.addEventListener("resize", changeHeight);

	function changeImg(id,variant) {
		setvariantImg(variant);
		setvariantImgCurrentId(id);
	}


	return (
		<>
			{/* <Row> */}
			<div className="row">
				<div className="col-12-sm">
				{products &&
					products.map((product, i) => {
						const image = product.images[0]
						return (
							
							<>
								{/* <Col md={4}> */}
								<div className="col-4-sm">
									<div className="card">
										<div className="shoeBackground">
											<Gradients />
											<h1 className="nike">{product.vendor}</h1>
											<img src={logo} alt="logo" className="logo" />
											<a href="/#" className="share">
											<svg style={{width: '20px'}} class="svg-inline--fa fa-share-alt fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="share-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>
											</a>
											<ProductImages product={product} variantImage={variantImg == '' ? product.images[0].src : product.id.toString() == variantImgCurrentId ? variantImg:product.images[0].src }/>
										</div>
										<Info product={product} changeImg={changeImg}/>
									</div>
								{/* </Col> */}
								</div>

								{/* // <div className="Home">
		// 	<div className="container">
		// 		<div className="card">
		// 			<div className="shoeBackground">
		// 				<Gradients />

		// 				<h1 className="nike">nike</h1>
		// 				<img src={logo} alt="logo" className="logo" />
		// 				<a href="/#" className="share">
		// 					<i className="fas fa-share-alt"></i>
		// 				</a>

		// 				<ProductImages />
		// 			</div>
		// 			<Info />
		// 		</div>
		// 	</div>
		// </div> */}
							</>
						)
					})}
					</div>
			{/* </Row > */}
			</div>
		</ >
	)
}

