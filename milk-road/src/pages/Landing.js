import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ProductView from "../components/ProductView";
import Milk from "../components/Milk";

function colorizer() {
    var letters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}
function Landing() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/milk/`).then((d) =>
            d.json().then((fin) => {
                setProducts(fin);
            })
        );
    }, []);

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <Typography variant="h2">The Milk Road</Typography>
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    {products != null ? (
                        products.map((product, i) => {
                            return (
                                <>
                                    <ProductView
                                        key={i}
                                        name={product.name}
                                        description={product.description}
                                        price={product.price}
                                        sellerAddress={product.sellerAddress}
                                        color={colorizer()}
                                    />
                                </>
                            );
                        })
                    ) : (
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item style={{ margin: "2em" }}>
                                <Typography variant="h4" href="/productform">
                                    Add products
                                </Typography>
                            </Grid>
                            <Grid item style={{ margin: "0.2em" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href="/productform"
                                >
                                    To Product Form
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Landing;
