import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useShopify } from "../hooks"
import { Container, Row, Col } from 'react-bootstrap';
const Info = ({
    product,
    changeImg
}) => {

    const {
		//product,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
	} = useShopify()
    

    const id = product.id

	const defaultSize = product.variants && product.variants[0].id.toString()
	const [size, setSize] = useState("")
    const [price, setPrice] = useState(product.variants[0].price) 
	const [quantity, setQuantity] = useState(1)

    
    function changeSize(sizeId, productId,src,price) {
		//openCart()
		if (sizeId === "") {
			//sizeId = defaultSize
            setSize(defaultSize)
			// const lineItemsToAdd = [
			// 	{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			// ]
			// const checkoutId = checkoutState.id
			// addVariant(checkoutId, lineItemsToAdd)
		} else {
            setSize(sizeId)
			// const lineItemsToAdd = [
			// 	{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			// ]
			// const checkoutId = checkoutState.id
			// addVariant(checkoutId, lineItemsToAdd)
		}
        changeImg(productId,src)
        setPrice(price)
	}

    function addToCart(sizeId, quantity) {
		openCart()
		if (sizeId === "") {
			sizeId = defaultSize
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		} else {
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		}
	}


    const shoeName = (
        <div className="shoeName">
            <div>
                <h1 className="big">{product.title}</h1>
                {/* <span className="new">new</span> */}
            </div>
            {/* <h3 className="small">Men's running shoes</h3> */}
        </div>
    );

    const description = (
        <div className="description">
            <h3 className="title">Product Info</h3>
            <p className="text">
            {product.description.substr(0, 100)}...
            </p>
        </div>
    );

    const ColorContainer = (
        <div className="color-container">
            <h3 className="title">Color</h3>
            <div className="colors">
            {product.variants &&
								product.variants.map((item, i) => {
									return (
                                        <Col sm>
										<option className="color" primary="#f84848" color={item.title}
											value={item.id.toString()}
											key={item.title + i}
                                            active
										>{`${item.title}`}</option>
                                        </Col>
									)
			})}
                {/* <span className="color active" primary="#2175f5" color="blue"></span>
                <span className="color" primary="#f84848" color="red"></span>
                <span className="color" primary="#29b864" color="green"></span>
                <span className="color" primary="#ff5521" color="orange"></span>
                <span className="color" primary="#444" color="black"></span> */}
            </div>
        </div>
    );

    const SizeContainer = (
        <div className="size-container">
            <h3 className="title">Variants</h3>
            <div className="sizes">
            <Row>
            {product.variants &&
								product.variants.map((item, i) => {
									return (
                                        <Col sm>
										<option
                                            style={{backgroundColor: item.id.toString() == size ? "#2752ff":"#eee",color:item.id.toString() == size ? "white":"black" }}
                                            className="size"
											value={item.id.toString()}
											key={item.title + i}
                                            // active
                                           onClick={(e) => changeSize(item.id.toString(), product.id.toString(),product.images[i].src,product.variants[i].price)}
                                           //onClick={(e) => changeImg(product.id.toString(),product.images[i].src)} 
										>{`${item.title}`}</option>
                                        </Col>
									)
			})}
                </Row >
            </div>
        </div>
    );

    const BuySection = (
        <div className="buy-price">
            <a className="buy" style={{cursor:'pointer'}} onClick={(e) => addToCart(size, quantity)}>
                <i className="fas fa-shopping-cart"></i>Add to card
            </a>
            <div className="price">
                <i className="fas fa-dollar-sign"></i>
                <h1>{price}</h1>
            </div>
        </div>
    );

    return (
        <div className="info">
            {shoeName}
            {description}
            {/* {ColorContainer} */}
            {SizeContainer}
            {BuySection}
        </div>
    );
};

export default Info;
