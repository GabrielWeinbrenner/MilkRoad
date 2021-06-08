import React, { useState, useEffect } from "react";
import {
    Typography,
    Grid,
    CardContent,
    Card,
    CardActions,
    Button,
} from "@material-ui/core";

import ProductView from "../components/ProductView.js";
import Milk from "../components/Milk.js";
export default function Splice(props) {
    const [allMilk, setAllMilk] = useState(null);
    const [milkOne, setMilkOne] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3001/milk/${props.match.params.name}`).then(
            (d) => {
                d.json().then((milk) => {
                    setMilkOne(milk);
                });
            }
        );
        fetch(`http://localhost:3001/milk`).then((d) =>
            d.json().then((milk) => {
                console.log(milk);
                setAllMilk(milk.filter((m) => m != milkOne));
            })
        );
        console.log(milkOne);
    }, []);
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {milkOne != null ? (
                <>
                    <Grid item>
                        <ProductView product={milkOne} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h1">+</Typography>
                    </Grid>
                    <Grid item>
                        <ProductView product={milkOne} />
                    </Grid>

                    <Grid item>
                        <ProductView product={milkOne} />
                    </Grid>
                </>
            ) : (
                <div></div>
            )}
        </Grid>
    );
}
