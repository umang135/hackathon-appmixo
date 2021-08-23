import React, { Fragment } from "react";

import blue from "../components/assets/img/blue.png";
import black from "../components/assets/img/black.png";
import green from "../components/assets/img/green.png";
import red from "../components/assets/img/red.png";
import orange from "../components/assets/img/orange.png";

const ProductImages = ({product,variantImage}) => {
    console.log(variantImage);
    return (
        <Fragment>
            <img  src={variantImage} alt="Image" className="shoe show" color="" />
        </Fragment>
    );
};

export default ProductImages;
