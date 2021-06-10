import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import ProductView from "../components/ProductView";
function Landing(props) {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <Typography variant="h2" gutterBottom>
                    The Milk Road
                </Typography>
            </Grid>
            <Grid item>
                <Grid container spacing={3}>
                    {true ? (
                        props.milk.map((product, i) => {
                            return (
                                <Grid item xs={12} md={6} key={i}>
                                    <ProductView id={i} product={product} />
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
