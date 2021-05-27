import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Landing() {
    const [products, setProducts] = useState(null);
    let history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:3001/milk/`).then((d) =>
            d.json().then((fin) => {
                setProducts(fin);
            })
        );
    }, []);
    function redirect(name) {
        history.push(`/product/${name}`);
    }
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
                                <div
                                    key={i}
                                    style={{
                                        borderColor: "black",
                                        borderRadius: "1em",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        padding: 10,
                                        width: 300,
                                        margin: 10,
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        redirect(product.name);
                                    }}
                                >
                                    <Typography variant="h4">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h6">
                                        ${product.price}
                                    </Typography>
                                    <Typography variant="h6">
                                        {product.sellerAddress}
                                    </Typography>
                                </div>
                            );
                        })
                    ) : (
                        <div>
                            <Typography variant="h4" href="/productform">
                                Add products
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                href="/productform"
                            >
                                To Product Form
                            </Button>
                        </div>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Landing;
