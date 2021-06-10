import React from "react";
import {
    Typography,
    Grid,
} from "@material-ui/core";
import ProductView from "../components/ProductView.js";
import { Eth } from "../App.js";

export default function Splice(props) {
    
    const ethVals = React.useContext(Eth);
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            {ethVals.allMilks[0] != null ? (
                <>
                    <Grid item>
                        <ProductView product={ethVals.allMilks[0]} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h1">+</Typography>
                    </Grid>
                    <Grid item>
                        <ProductView product={ethVals.allMilks[0]} />
                    </Grid>

                    <Grid item>
                        <ProductView product={ethVals.allMilks[0]} />
                    </Grid>
                </>
            ) : (
                <div></div>
            )}
        </Grid>
    );
}
