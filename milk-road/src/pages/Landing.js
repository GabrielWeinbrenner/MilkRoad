import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ProductView from "../components/ProductView";
import Milk from "../components/Milk";
import Web3 from "web3";

function colorizer() {
    var letters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}

function Landing() {
    const [products, setProducts] = useState(null);
    useEffect(async () => {
        fetch(`http://localhost:3001/milk/`).then((d) =>
            d.json().then((fin) => {
                setProducts(fin);
            })
        );
    }, []);

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <Typography variant="h2" gutterBottom>
                    The Milk Road
                </Typography>
            </Grid>
            <Grid item>
                <Grid container spacing={3}>
                    {products != null ? (
                        products.map((product, i) => {
                            return (
                                <Grid item xs={12} md={6}>
                                    <ProductView key={i} product={product} />
                                </Grid>
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
                                    Add Products
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
