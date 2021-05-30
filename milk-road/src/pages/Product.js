import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import Milk from "../components/Milk.js";
function Product(props) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/milk/${props.match.params.name}`).then(
            (d) =>
                d.json().then((fin) => {
                    setProduct(fin);
                })
        );
    }, []);
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            {product ? (
                <Grid item>
                    <Typography variant="h2">{product.name}</Typography>
                    <Milk color="#aaaaaa" />

                    <Typography variant="h5">{product.description}</Typography>
                    <Typography variant="h6">${product.price}</Typography>
                    <Typography variant="h6">
                        {product.sellerAddress}
                    </Typography>
                </Grid>
            ) : (
                <Grid item>
                    <h1>No item exists</h1>
                </Grid>
            )}
        </Grid>
    );
}

export default Product;
