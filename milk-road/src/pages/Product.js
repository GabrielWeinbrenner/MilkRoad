import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";

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
                    <Typography variant="h1">{product.name}</Typography>
                    <img
                        src="https://bakingmischief.com/wp-content/uploads/2017/04/chocolate-milk-for-one-picture.jpg"
                        height="300"
                    ></img>
                    <Typography variant="h3">{product.description}</Typography>
                    <Typography variant="h4">${product.price}</Typography>
                    <Typography variant="h4">
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
